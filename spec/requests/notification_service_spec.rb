require 'rails_helper'

RSpec.describe NotificationService do
    describe '.create_document_upload_success_notification' do
        let(:user_id) { 1 }
        let(:document) { double('Document', id: 1, name: 'Test Document') }
        let(:doc_category) { 'general' }
      
        it 'creates a success notification for document upload' do
          notification_double = double('Notification', persisted?: true, id: 123)
          expect(Notification).to receive(:create).with(
            user_id: user_id,
            category: 'Upload Success',
            content: "Your General document: Test Document has been uploaded successfully.",
            read: false
          ).and_return(notification_double)
      
          result = NotificationService.create_document_upload_success_notification(user_id, document, doc_category)
          expect(result).to be_persisted
          expect(result.id).to eq(123)
        end
      end

  describe '.create_document_upload_fail_notification' do
    let(:user_id) { 1 }
    let(:document) { double('Document', id: 1, name: 'Test Document') }
    let(:doc_category) { 'general' }

    it 'creates a fail notification for document upload' do
    notification_double = double('Notification', persisted?: true, id: 123)
      expect(Notification).to receive(:create).with(
        user_id: user_id,
        category: 'Upload Fail',
        content: "Your General document: Test Document has failed to upload. Please try again.",
        read: false
      ).and_return(notification_double)

      result = NotificationService.create_document_upload_fail_notification(user_id, document, doc_category)
      expect(result).to be_persisted
    end
  end

  describe '.welcome_notification' do
    let(:user_id) { 1 }
    let(:user_name) { 'John Doe' }

    it 'creates a welcome notification' do
        notification_double = double('Notification', persisted?: true, id: 123)
      expect(Notification).to receive(:create).with(
        user_id: user_id,
        category: 'Create Account',
        content: "Welcome to Enable ID, John Doe. Use the chatbot to learn more.",
        read: false
      ).and_return(notification_double)

      result = NotificationService.welcome_notification(user_id, user_name)
      expect(result).to be_persisted
    end
  end

  describe '.pending_user_notification' do
    let(:user_id) { 1 }

    it 'creates a pending approval notification' do
        notification_double = double('Notification', persisted?: true, id: 123)
      expect(Notification).to receive(:create).with(
        user_id: user_id,
        category: 'Approval Pending',
        content: "Your refugee status is pending approval.",
        read: false
      ).and_return(notification_double)

      result = NotificationService.pending_user_notification(user_id)
      expect(result).to be_persisted
    end
  end

  # Additional tests for the remaining methods should be written in a similar fashion
end
