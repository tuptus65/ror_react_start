# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

require 'active_record/fixtures'

if User.count == 0
  ActiveRecord::FixtureSet.create_fixtures('test/fixtures', 'users')
  first_user = User.create!(
    name: "root",
    email: "root@domain.tld",
    password: "password"
  )

  first_user.roles = [ :root ]
  first_user.confirmed_at = Time.now
  first_user.save
end
