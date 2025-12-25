import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';

import turoxLogo from '@/assets/turox_logo_full.png';

function Index () {
  return (
    <AppLayout>
      <Head title="Turox" />
      <div className="flex flex-1 justify-center items-center">
        <img src={turoxLogo} alt="Turox logo" />
      </div>
    </AppLayout>
  );
}

export default Index;