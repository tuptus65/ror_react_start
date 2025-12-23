# == Schema Information
#
# Table name: users
#
#  id                 :bigint           not null, primary key
#  avatar             :string
#  confirmation_token :string
#  confirmed_at       :datetime
#  email              :string           not null
#  name               :string           not null
#  password_digest    :string
#  roles_mask         :integer          default(0)
#  token              :string
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#
# Indexes
#
#  index_users_on_confirmation_token  (confirmation_token) UNIQUE
#  index_users_on_name                (name) UNIQUE
#  index_users_on_token               (token) UNIQUE
#
class User < ApplicationRecord
  has_secure_password
  has_secure_token :token
  has_one_attached :avatar

  validates :name, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true

  include RoleModel
  roles :root, :admin, :user

  before_create :set_user_role, if: :new_record?

  def set_user_role
    self.roles = :user
  end
end
