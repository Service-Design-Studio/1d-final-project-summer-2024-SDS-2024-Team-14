include Dialogagent

class ChatbotController < ApplicationController
  # return response from llm agent (POST) - /chatbot
  def create
    @text = params[:text]
    @session_id = params[:userID]
    resp = get_resp(@text, @session_id)
    if resp.nil? 
      render json: {message: "There was an issue sending your message to our bot. Please try again later."}, status: :unprocessable_entity
    else
      render json: {message: resp}, status: :ok
    end
  end
end
