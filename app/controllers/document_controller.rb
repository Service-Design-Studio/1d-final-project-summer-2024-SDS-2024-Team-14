require 'ocr'
require 'llmapi'


class DocumentController < ApplicationController
    def create
        # Get user
        user = params[:id]
        category = params[:category]
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
                llm_json = llm_process(ocr_text, [
                    "name", "date of birth", "student ID", "degree", "highest education", "date obtained",
                    "overall GPA", "institution name", "graduation date"
                  ])
                document.important = llm_json.to_s
                document.save
                File.delete(local_path) if File.exist?(local_path)
            end
            render json: {message: "File transfer has failed. Please contact the administrator"}
        else
            render json: {message: "File transfer has failed. Please contact the administrator"}
        end
    end

    def retrieve
        user = params[:id]
        category = params[:category].capitalize
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