class DocumentController < ApplicationController
    include Ocr
    include Llmapi
#     LLM_DICT = {
#   "education": [
#     "name", "date of birth", "student ID", "degree", "highest education", "date obtained",
#     "overall GPA", "institution name", "graduation date"
#   ],
#   "health": [
#     "name", "date of birth", "medical record number", "insurance number", "primary physician",
#     "medical history", "current medications", "allergies", "vaccination records"
#   ],
#   "career": [
#     "name", "date of birth", "job title", "company name", "employment start date", 
#     "employment end date", "job responsibilities", "reference contact", "salary"
#   ],
#   "family": [
#     "name", "date of birth", "relationship", "dependent status", "spouse name", 
#     "number of children", "children's names", "children's dates of birth", "emergency contact"
#   ],
#   "finance": [
#     "name", "date of birth", "bank account number", "bank name", "account type", 
#     "balance", "income source", "monthly income", "debts"
#   ],
#   "property": [
#     "name", "date of birth", "property address", "property type", "ownership status", 
#     "purchase date", "property value", "mortgage details", "insurance details"
#   ]
# }
    def create 
        # Get user
        user = params[:id]
        category = params[:category].downcase
        begin
            @user = User.find(user)
        rescue ActiveRecord::RecordNotFound
            render json: { message: "User does not exist" }, status: :unprocessable_entity
        end
        # get files
        uploaded_files = params[:files]
        if uploaded_files
            for file_json in uploaded_files
                document = @user.documents.create(name: file_json.original_filename, category: category, status: "Pending")
                document.file.attach(file_json)
                local_path = download_active_storage_file(document.file)
                # extract text
                ocr_text = ocr(local_path)
                # LLM
                llm_json = llm_process(ocr_text, category)
                if llm_json.nil?
                    render json: {message: "The document you uploaded was too blurry or it was in an invalid format. Please try again."}, status: :unprocessable_entity
                else
                    document.important = llm_json.to_s
                    document.save
                    File.delete(local_path) if File.exist?(local_path)
                end
            end
            NotificationService.create_document_upload_success_notification(@user,document)
            render json: {message: "Your file has been uploaded successfully"}, status: :ok
        else
            NotificationService.create_document_upload_fail_notification(@user,document)
            render json: {message: "File transfer has failed. Please contact the administrator"}, status: :unprocessable_entity
        end
    end

    def retrieve
        user = params[:id]
        category = params[:category].downcase
        begin
            @user = User.find(user)
        rescue ActiveRecord::RecordNotFound
            render json: { message: "User does not exist" }, status: :unprocessable_entity
        end
        @documents = @user.documents.where(category: category)
        if @documents
            documents_with_files = @documents.map do |document|
                {
                  id: document.id,
                  name: document.name,
                  status: document.status,
                  file_url: document.file.attached? ? url_for(document.file) : nil,
                  important: document.important
                }
            end
            render json: {documents: documents_with_files}, status: :ok
        else
            render json: {message: "No documents found for this user"}, status: :unprocessable_entity
        end
    end
end