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
    render inertia: {
      user: serialize_user(@user)
    }
  end

  # GET /users/1/edit
  def edit
    render inertia: {
      user: serialize_user(@user)
    }
  end

  # POST /users
  def create
    @user = User.new(user_params)

    if @user.save
      redirect_to @user, notice: "User was successfully created."
    else
      redirect_to new_user_url, inertia: { errors: @user.errors }
    end
  end

  # PATCH/PUT /users/1
  def update
    if @user.update(user_params)
      redirect_to @user, notice: "User was successfully updated."
    else
      redirect_to edit_user_url(@user), inertia: { errors: @user.errors }
    end
  end

  # DELETE /users/1
  def destroy
    @user.destroy!
    redirect_to users_url, notice: "User was successfully destroyed."
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def user_params
      params.require(:user).permit(:name, :email, :password, :password_confirmation, :avatar, roles[])
    end

    def serialize_user(user)
      user.as_json(only: [
        :id, :name, :email, :avatar
      ]).merge(
        roles: user.roles.to_a
      ).merge(
        'canView': policy(user).show?,
        'canEdit': policy(user).update?,
        'canDelete': policy(user).destroy?
      )
    end
end
