# frozen_string_literal: true

module AuthHelpers
  def sign_in(user)
    post login_path, params: { session: { name: user.name, password: "password" } }
  end
end

RSpec.configure do |config|
  config.include AuthHelpers, type: :request
end
