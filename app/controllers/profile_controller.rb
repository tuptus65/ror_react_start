class ProfileController < InertiaController
  before_action :set_user

  def edit
    authorize @user
    render inertia: {
      user: serialize_user(@user)
    }
  end

  def update
    authorize @user
    if params[:user][:password].blank?
      params[:user].delete(:password)
      params[:user].delete(:password_confirmation)
    end
    if params[:user][:avatar].blank?
      params[:user].delete(:avatar)
    end
    if @user.update(user_params)
      redirect_to root_url
    else
      render inertia: "profile/edit", props: {
        user: serialize_user(@user),
        errors: @user.errors
      }
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_user
    @user = current_user
  end

  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation, :avatar)
  end

  def serialize_user(user)
    user.as_json(only: [
      :id, :name, :email
    ]).merge(
      roles: user.roles.to_a,
      avatar: user.avatar.blank? ? nil : url_for(user.avatar)
    )
  end
end
