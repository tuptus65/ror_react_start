require "test_helper"

class Admin::UsersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:first)
    @admin = users(:admin)
  end

  test "admin should get index" do
    sign_in @admin
    get admin_users_url
    assert_response :success
    assert_equal "Admin/Users/Index", JSON.parse(@response.body)["component"]
  end

  test "user should be redirected to root" do
    sign_in(@user)
    get admin_users_path
    assert_redirected_to root_path
    # Możesz też sprawdzić flash, jeśli go ustawiasz w kontrolerze
  end

  test "guest should be redirected to login" do
    get admin_users_path
    assert_redirected_to login_path
  end
end
