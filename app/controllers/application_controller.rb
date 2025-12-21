class ApplicationController < ActionController::Base
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern
  include Pundit::Authorization
  include Pagy::Method

  before_action :set_current_user
  after_action :verify_authorized

  helper_method :current_user, :log_in?

  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

  private
  def set_current_user
    @current_user = User.unscoped.find_by(token: session[:token]) if session[:token]
  end

  def current_user
    @current_user ||= Current.user
  end

  def log_in?
    !!current_user
  end

  def require_login
    redirect_to login_path, alert: "Please log in to access this page." unless log_in?
  end

  def user_not_authorized
    render inertia: 'errors/NotAuthorized', status: 403
  end
end
