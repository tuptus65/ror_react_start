# frozen_string_literal: true

# spec/support/system_spec.rb
RSpec.configure do |config|
  config.before(:each, type: :system) do
    # 1. Konfiguracja Chrome
    driven_by :selenium, using: :headless_chrome do |options|
      options.add_argument('--no-sandbox')
      options.add_argument('--disable-dev-shm-usage')
      options.add_argument('--disable-gpu')
    end

    # 2. Klucz do sukcesu w Dockerze:
    # Serwer Capybary musi nasłuchiwać na 0.0.0.0 (dostępny dla wszystkich interfejsów)
    Capybara.server_host = "0.0.0.0"

    # Ustawiamy stały port, żeby Chrome nie szukał po omacku
    Capybara.server_port = 3001

    # Adres, pod którym Chrome będzie widzieć aplikację (localhost jest bezpieczny dla Inertia)
    Capybara.app_host = "http://127.0.0.1:3001"
  end
end
