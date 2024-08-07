class DocumentController < ApplicationController
  include Ocr
  include Llmapi
  # Upload files (POST) - document/upload
  def create
    user_id = params[:id]
    category = params[:category].downcase
    if params[:language]
      language = params[:language].downcase
    end
    begin
      @user = User.find(user_id)
    rescue ActiveRecord::RecordNotFound
      render json: { message: "User does not exist" }, status: :unprocessable_entity and return
    end

    uploaded_files = params[:files]
    if uploaded_files
      uploaded_files.each do |file_json|
        document = @user.documents.create(name: file_json.original_filename, category: category, status: "Pending")
        document.file.attach(file_json)
        local_path = download_active_storage_file(document.file)
        if language
          ocr_text = ocr(local_path, language)
        else
          ocr_text = ocr(local_path, "english")
        end
        llm_json = llm_process(ocr_text, category)
        if llm_json.nil?
          render json: { message: "The document you uploaded was too blurry or it was in an invalid format. Please try again." }, status: :unprocessable_entity and return
        else
          document.important = llm_json.to_s
          document.save
          File.delete(local_path) if File.exist?(local_path)
        end
        NotificationService.create_document_upload_success_notification(user_id, document, category)
      end
      render json: { message: "Your file has been uploaded successfully" }, status: :ok
    else
      NotificationService.create_document_upload_fail_notification(user_id, document, category)
      render json: { message: "File transfer has failed. Please contact the administrator" }, status: :unprocessable_entity
    end
  end

  # Retrieve files given user id (POST) - /document/retrieve
  def retrieve
    user = params[:id]
    category = params[:category]&.downcase
    begin
        @user = User.find(user)
    rescue ActiveRecord::RecordNotFound
        render json: { message: "User does not exist" }, status: :unprocessable_entity
    end
    if category
      @documents = @user.documents.where(category: category)
    else
      @documents = @user.documents
    end
      if @documents
          documents_with_files = @documents.map do |document|
              {
                id: document.id,
                name: document.name,
                status: document.status,
                file_url: document.file.attached? ? url_for(document.file) : nil,
                important: document.important,
                category: document.category,
                lastModifiedDate: document.created_at.strftime('%d %B %Y')
              }
          end
          render json: {documents: documents_with_files}, status: :ok
      else
          render json: {message: "No documents found for this user"}, status: :unprocessable_entity
      end
  end

  # Approve/reject status of documents(POST) - /document/status
  def status
    newStatus = params[:status].downcase
    begin
      @document = Document.find(params[:id])        
    rescue ActiveRecord::RecordNotFound
      render json: {message: "Document does not exist"}, status: :unprocessable_entity and return
    end
    if (@document.status != newStatus)
      @document.update(status: newStatus)
      if (newStatus == "approved")
        NotificationService.document_approved_notification(@document.user_id,@document.name, params[:message])
      elsif (newStatus == "rejected")
        NotificationService.document_rejected_notification(@document.user_id,@document.name, params[:message])
      end
      # Rails.logger.info "user id in status: #{@document.name}"
      render json: {document: @document, message: params[:message]}, status: :ok
    else
      # Rails.logger.info "user id in status: #{@document.category}"
      render json: {message: "Document status is already #{@document.status}. No change applied.", document: @document, optional: params[:message]}, status: :ok
    end
  end
end