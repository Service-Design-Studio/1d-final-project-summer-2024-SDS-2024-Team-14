class UserSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :email, :name, :country, :ethnicity, :religion, :gender, :date_birth, :date_arrival, :verification_status, :face_verified, :photo
  def date_birth
    object.date_birth.strftime('%d-%m-%Y') if object.date_birth.present?
  end
  def date_arrival
    object.date_arrival.strftime('%d-%m-%Y') if object.date_arrival.present?
  end
  def photo
    if object.photo.attached?
      rails_blob_url(object.photo, only_path: false)
    else
      nil
    end
  end
  def default_url_options
    Rails.application.config.action_mailer.default_url_options
  end
end
