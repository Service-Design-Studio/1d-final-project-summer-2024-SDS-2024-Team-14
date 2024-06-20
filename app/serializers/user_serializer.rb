class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :name, :country, :ethnicity, :religion, :gender, :date_birth, :date_arrival, :verification_status
  def date_birth
    object.date_birth.strftime('%d-%m-%Y') if object.date_birth.present?
  end
  def date_arrival
    object.date_arrival.strftime('%d-%m-%Y') if object.date_arrival.present?
  end
end
