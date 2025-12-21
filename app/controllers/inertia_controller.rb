# frozen_string_literal: true

class InertiaController < ApplicationController
  inertia_share do
    user_props = {}
    if log_in?
      user_props = {
        user: {
          name: current_user.name,
          email: current_user.email,
          roles: current_user.roles.to_a,
          canViewPanel: policy(:dashboard).index?,
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

  def frontend_i18n_hash
    I18n.backend.load_translations unless I18n.backend.send(:translations).key?(I18n.locale.to_sym)

    translations = I18n.backend.send(:translations)[I18n.locale.to_sym]
    controller = params[:controller]
    frontend_data = { controller => (translations[controller.to_sym].dup) } || {} if translations
    common_data = translations[:common]
    frontend_data.merge!({ common: common_data }) if common_data
    menu_data = translations[:menu]
    frontend_data.merge!({ menu: menu_data }) if menu_data
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
