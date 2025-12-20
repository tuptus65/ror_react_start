class HomeController < ApplicationController
  def index
    skip_authorization
    render inertia: 'home/Index'
  end
end
