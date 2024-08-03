class UserMatchedSerializer < ActiveModel::Serializer
  attributes :id, :name, :age, :gender, :ethnicity, :date_birth
  def age
    now = Time.now.utc.to_date
    age = now.year - object.date_birth.year
    age -= 1 if now < object.date_birth + age.years # Adjust if the birthday has not yet occurred this year
    age
  end
  def date_birth
    object.date_birth.strftime('%d-%m-%Y') if object.date_birth.present?
  end
end