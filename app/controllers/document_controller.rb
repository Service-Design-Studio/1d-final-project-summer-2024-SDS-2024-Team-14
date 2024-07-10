
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
                # Change to upload onto cloud storage
                # @user.documents.attach(file_json)
                document = @user.documents.create(name: file_json.original_filename, category: category, status: "Pending")
                document.file.attach(file_json)
            end
            render json: {message: "Your file has been uploaded successfully"}
        else
            render json: {message: "File transfer has failed. Please contact the administrator"}
        end
    end

    def retrieve
        user = params[:id]
        category = params[:category]
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
                  file_url: document.file.attached? ? url_for(document.file) : nil
                }
            end
            render json: {documents: documents_with_files}, status: :ok
        else
            render json: {message: "No documents found for this user"}, status: :unprocessable_entity
        end
    end
end