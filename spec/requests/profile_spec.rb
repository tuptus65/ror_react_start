require 'rails_helper'

RSpec.describe "Profiles", type: :request, inertia: true do
  let(:user) { User.find_by(name: "first") }
  describe "GET /edit" do
    it "returns http success" do
      sign_in(user)
      get profile_path
      expect(response).to have_http_status(:success)
      expect(inertia).to render_component("profile/edit")
    end
  end

  describe "PUT /update" do
    before { sign_in(user) }

    context "with good params" do
      let(:new_name) { "Nowe Imie Firsta" }

      it "update profile" do
        put profile_path, params: {
          user: {
            name: new_name,
            email: user.email
          }
        }

        expect(response).to have_http_status(:redirect)
        follow_redirect!

        expect(user.reload.name).to eq(new_name)
      end
    end

    context "with bad params" do
      it "not update profile" do
        put profile_path, params: {
          user: { email: "" }
        }

        expect(user.reload.email).not_to eq("")
      end
    end
  end
end
