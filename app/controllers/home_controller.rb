class HomeController < ApplicationController
  def index
    render inertia: 'home/Index'
  end
end
