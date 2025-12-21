class HomeController < InertiaController
  def index
    skip_authorization
    render inertia: 'home/Index'
  end
end
