class UserMatchedSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :name, :age, :gender, :ethnicity, :date_birth, :photo
  def age
    now = Time.now.utc.to_date
    age = now.year - object.date_birth.year
    age -= 1 if now < object.date_birth + age.years # Adjust if the birthday has not yet occurred this year
    age
  end
  def date_birth
    object.date_birth.strftime('%d-%m-%Y') if object.date_birth.present?
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