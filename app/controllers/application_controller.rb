class ApplicationController < ActionController::Base
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern
  include Pundit::Authorization

  before_action :set_current_user
  after_action :verify_authorized

  helper_method :current_user, :log_in?

  inertia_share do
    user_props = {}
    if log_in?
      user_props = {
        user: {
          name: current_user.name,
          email: current_user.email,
          roles: current_user.roles.to_a,
          canViewPanel: current_user.admin? || current_user.root?,
          canViewUsers: policy(User).index?
        }
      }
    end
    {
      i18n: frontend_i18n_hash,
      flash: -> { flash.to_hash }
    }.merge(user_props)
  end

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

  def frontend_i18n_hash
    I18n.backend.load_translations unless I18n.backend.send(:translations).key?(I18n.locale.to_sym)

    translations = I18n.backend.send(:translations)[I18n.locale.to_sym]
    controller = params[:controller]
    frontend_data = { controller => (translations[controller.to_sym].dup) } || {} if translations
    common_data = translations[:common]
    frontend_data.merge!({ common: common_data }) if common_data
    (frontend_data || {}).as_json
  end

  def attribute_names(model)
    I18n.backend.load_translations unless I18n.backend.send(:translations).key?(I18n.locale.to_sym)
    translations = I18n.backend.send(:translations)

    attributes_hash = translations.dig(
      I18n.locale.to_sym,
      :activerecord,
      :attributes,
      model.to_sym
    )
    attributes_hash || {}
  end
end
