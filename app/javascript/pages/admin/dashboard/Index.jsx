import AdminLayout from "@/layouts/AdminLayout";
import {Head} from "@inertiajs/react";
import turoxLogo from "@/assets/turox_logo_full.png";

function Index() {
  return (
    <AdminLayout>
      <Head title="Turox" />
      <div className="flex flex-1 justify-center items-center">
        <img src={turoxLogo} alt="Turox logo" />
      </div>
    </AdminLayout>
  );
}

export default Index;