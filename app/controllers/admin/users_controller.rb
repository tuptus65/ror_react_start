class Admin::UsersController < InertiaController
  before_action :set_user, only: %i[ show edit update destroy ]

  # GET /users
  def index
    authorize User
    @pagy, @users = pagy(policy_scope(User).order(:name))
    render inertia: {
      users: @users.map do |user|
        serialize_user(user)
      end,
      pagination: @pagy.data_hash
    }
  end

  # GET /users/1
  def show
    render inertia: {
      user: serialize_user(@user)
    }
  end

  # GET /users/new
  def new
    @user = User.new
    @user.roles = [ :user ]
    authorize @user

    render inertia: {
      user: serialize_user(@user),
      roles: all_roles
    }
  end

  # GET /users/1/edit
  def edit
    authorize @user

    render inertia: {
      user: serialize_user(@user),
      roles: all_roles
    }
  end

  # POST /users
  def create
    @user = User.new(user_params)
    authorize @user

    if @user.save
      redirect_to @user, notice: "User was successfully created."
    else
      redirect_to new_admin_user_url, inertia: { errors: @user.errors }
    end
  end

  # PATCH/PUT /users/1
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
      redirect_to admin_users_url, notice: "User was successfully updated."
    else
      redirect_to admin_edit_user_url(@user), inertia: { errors: @user.errors }
    end
  end

  # DELETE /users/1
  def destroy
    authorize @user
    @user.destroy!
    redirect_to admin_users_url, notice: "User was successfully destroyed."
  end

  private

  def all_roles
    User.valid_roles.map do |role|
      {
        value: role.to_s,
        label: role.to_s
      }
    end
  end

    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def user_params
      params.require(:user).permit(:name, :email, :password, :password_confirmation, :avatar, roles: [])
    end

    def serialize_user(user)
      user.as_json(only: [
        :id, :name, :email
      ]).merge(
        roles: user.roles.to_a,
        avatar: user.avatar.blank? ? nil : url_for(user.avatar)
      ).merge(
        'canView': policy(user).show?,
        'canEdit': policy(user).update?,
        'canDelete': policy(user).destroy?
      )
    end
end
