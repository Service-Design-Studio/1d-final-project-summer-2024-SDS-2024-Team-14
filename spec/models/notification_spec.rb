require 'rails_helper'

RSpec.describe NotificationService, type: :service do
  let(:document) { Document.create(user: user, category: category, name: 'Test Document') }
  let(:user) { User.create(
            id: 1,
            email: 'test1@gmail.com',
            password: 'test123',
            password_confirmation: 'test123',
            "name": "testUser1",
            "country": "Myanmar",
            ethnicity: 'Bantu',
            "religion": "Buddhist",
            "gender": "Female",
            "date_birth": "10-06-2001",
            "date_arrival": "10-06-2024",
            "verification_status": "Pending approval"
            ) }
  let(:doc_category) {'passport'}
  let(:category) {'passport'}
  # let(:user_id) {user.id}

  describe '.create_document_upload_success_notification' do
    it 'creates a notification with the correct attributes' do

      notification = NotificationService.create_document_upload_success_notification(user_id, document, doc_category)

      expect(notification.user_id).to eq(user.id)
      expect(notification.category).to eq('Upload Success')
      expect(notification.content).to include(document.name)
      expect(notification.read).to be(false)
    end

    it 'logs the creation of the notification' do
      notification = NotificationService.create_document_upload_success_notification(user_id, document, doc_category)
      expect(Rails.logger).to receive(:info).with("Creating success notification for Document #{document.id}")
      expect(Rails.logger).to receive(:info).with("Notification created: #{notification.id}")

      NotificationService.create_document_upload_success_notification(user_id, document, doc_category)
    end
  end

  describe '.create_document_upload_fail_notification' do
    it 'creates a notification with the correct attributes' do

      notification = NotificationService.create_document_upload_fail_notification(user_id, document, doc_category)

      expect(notification.user_id).to eq(user.id)
      expect(notification.category).to eq('Upload Fail')
      expect(notification.content).to include(document.name)
      expect(notification.read).to be(false)
    end

    it 'logs the creation of the notification' do
      notification = NotificationService.create_document_upload_fail_notification(user_id, document, doc_category)
      expect(Rails.logger).to receive(:info).with("Creating fail notification for document #{document.id}")
      expect(Rails.logger).to receive(:info).with("Notification created: #{notification.id}")

      NotificationService.create_document_upload_fail_notification(user_id, document, doc_category)
    end
  end

  describe '.welcome_notification' do
    it 'creates a notification with the correct attributes' do

      notification = NotificationService.welcome_notification(user_id, user.name)

      expect(notification.user_id).to eq(user.id)
      expect(notification.category).to eq('Create Account')
      expect(notification.content).to include(user.name)
      expect(notification.read).to be(false)
    end

    it 'logs the creation of the notification' do
      notification = NotificationService.welcome_notification(user_id, user.name)
      expect(Rails.logger).to receive(:info).with("Creating welcome notification for user #{user.id}")
      expect(Rails.logger).to receive(:info).with("Notification created: #{notification.id}")

      NotificationService.welcome_notification(user_id, user.name)
    end
  end

  describe '.pending_user_notification' do
    it 'creates a notification with the correct attributes' do
      notification = NotificationService.pending_user_notification(user_id)

      expect(notification.user_id).to eq(user.id)
      expect(notification.category).to eq('Approval Pending')
      expect(notification.content).to eq('Your refugee status is pending approval.')
      expect(notification.read).to be(false)
    end

    it 'logs the creation of the notification' do
      notification = NotificationService.pending_user_notification(user_id)
      expect(Rails.logger).to receive(:info).with("Creating pending notification for user #{user.id}")
      expect(Rails.logger).to receive(:info).with("Notification created: #{notification.id}")

      NotificationService.pending_user_notification(user_id)
    end
  end

  describe '.verified_user_notification' do
    it 'creates a notification with the correct attributes' do

      notification = NotificationService.verified_user_notification(user_id)

      expect(notification.user_id).to eq(user.id)
      expect(notification.category).to eq('Approval Success')
      expect(notification.content).to eq('Your refugee status has been approved.')
      expect(notification.read).to be(false)
    end

    it 'logs the creation of the notification' do
      notification = NotificationService.verified_user_notification(user_id)

      expect(Rails.logger).to receive(:info).with("Creating verified notification for user #{user.id}")
      expect(Rails.logger).to receive(:info).with("Notification created: #{notification.id}")

      NotificationService.verified_user_notification(user_id)
    end
  end

  describe '.document_approved_notification' do
    it 'creates a notification with the correct attributes' do
      document_name = 'passport'
      message = 'Your document has been approved.'
  
      notification = NotificationService.document_approved_notification(user_id, document_name, message)
  
      expect(notification.user_id).to eq(user.id)
      expect(notification.category).to eq('Document Approved')
      expect(notification.content).to include(document_name)
      expect(notification.read).to be(false)
      expect(notification.message).to eq(message)
    end
  
    it 'logs the creation of the notification' do
      document_name = 'passport'
      message = 'Your document has been approved.'
      notification = NotificationService.document_approved_notification(user_id, document_name, message)
  
      expect(Rails.logger).to receive(:info).with("Creating approved document notification for user #{user.id}")
      expect(Rails.logger).to receive(:info).with("Notification created: #{notification.id}")
  
      NotificationService.document_approved_notification(user_id, document_name, message)
    end
  end

  describe '.document_rejected_notification' do
    it 'creates a notification with the correct attributes' do
      document_name = 'passport'
      message = 'Your document has been rejected.'
  
      notification = NotificationService.document_rejected_notification(user_id, document_name, message)
  
      expect(notification.user_id).to eq(user.id)
      expect(notification.category).to eq('Document Rejected')
      expect(notification.content).to include(document_name)
      expect(notification.read).to be(false)
      expect(notification.message).to eq(message)
    end
  
    it 'logs the creation of the notification' do
      document_name = 'passport'
      message = 'Your document has been rejected.'
      notification = NotificationService.document_rejected_notification(user_id, document_name, message)
  
      expect(Rails.logger).to receive(:info).with("Creating rejected document notification for user #{user.id}")
      expect(Rails.logger).to receive(:info).with("Notification created: #{notification.id}")
  
      NotificationService.document_rejected_notification(user_id, document_name, message)
    end
  end
end