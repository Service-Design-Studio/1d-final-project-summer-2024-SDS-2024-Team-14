class MissingPersonSerializer < ActiveModel::Serializer
  attributes :id, :name, :age, :gender, :ethnicity, :matched, :date_birth, :matched_user_id
  def date_birth
    object.date_birth.strftime('%d-%m-%Y') if object.date_birth.present?
  end
end
