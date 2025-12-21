class Admin::DashboardController < InertiaController
  def index
    authorize :dashboard
    render inertia: 'admin/dashboard/Index'
  end
end
