ENV["RAILS_ENV"] ||= "test"
require_relative "../config/environment"
require "rails/test_help"

module ActiveSupport
  class TestCase
    include Rails.application.routes.url_helpers
    include ActionDispatch::Integration::Runner

    # Run tests in parallel with specified workers
    # parallelize(workers: :number_of_processors)

    # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
    fixtures :all

    # Add more helper methods to be used by all tests here...
    def sign_in(user)
      post login_path, params: {
        session: {
          name: user.name,
          password: "password" # Hasło z Twoich fixtures
        }
      }
    end
  end
end
