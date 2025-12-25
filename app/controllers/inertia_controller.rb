# frozen_string_literal: true

class InertiaController < ApplicationController
  inertia_share do
    user_props = {}
    if log_in?
      user_props = {
        current_user: {
          name: current_user.name,
          email: current_user.email,
          avatar: current_user.avatar.blank? ? nil : url_for(current_user.avatar),
          roles: current_user.roles.to_a,
          canViewPanel: policy(:dashboard).index?,
          canViewUsers: policy(User).index?
        }
      }
    end
    {
      locale: I18n.locale,
      flash: -> { flash.to_hash }
    }.merge(user_props)
  end
end
