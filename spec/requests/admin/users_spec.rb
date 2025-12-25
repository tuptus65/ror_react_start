# frozen_string_literal: true

require 'rails_helper'

RSpec.describe "Admin::Users", type: :request do
  # Jeśli zostajesz przy fixtures:

  let(:admin) { User.find_by(name: "admin") }
  let(:user) { User.find_by(name: "first") }

  let(:inertia_version) { InertiaRails.configuration.version }
  let(:inertia_headers) do
    {
      'X-Inertia' => 'true',
      'X-Inertia-Version' => inertia_version
    }
  end

  describe "GET /admin/users" do
    context "jako admin" do
      it "zwraca sukces i odpowiedni komponent Inertia" do
        sign_in admin
        if response.status == 422
          puts "Błąd 422! Treść odpowiedzi: #{response.body}"
        end

        expect(response).to have_http_status(:redirect)
        follow_redirect!
        admin.reload
        get admin_users_path, headers: inertia_headers
        expect(response).to have_http_status(:success)

        json_response = JSON.parse(response.body)
        expect(json_response["component"]).to eq("admin/users/index")
      end
    end

    context "jako zwykły użytkownik" do
      it "dostaje 403" do
        sign_in user
        get admin_users_path, headers: inertia_headers
        expect(response).to have_http_status(:forbidden)
      end
    end
  end
end
