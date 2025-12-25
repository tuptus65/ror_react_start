class SessionController < InertiaController
  def new
    skip_authorization
    render inertia: "sessions/New"
  end

  def create
    skip_authorization
    user = User.find_by(name: params[:session][:name])
    if user && user.authenticate(params[:session][:password])
      Current.user = user
      user.regenerate_token
      session[:token] = user.token
      redirect_to root_path
    else
      flash.now[:alert] = "Invalid login or password"
      render inertia: "sessions/New"
    end
  end

  def destroy
    authorize :session
    current_user.update(token: nil)
    Current.user = nil
    session.delete(:token)
    redirect_to root_path
  end
end
