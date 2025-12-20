import React from 'react';
import AppNavigation from "~/layouts/AppNavigation";
import AppFooter from "~/layouts/AppFooter";

function AdminLayout({ children }) {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <AppNavigation />
      <main className="container mx-auto flex-1">
        {children}
      </main>
      <AppFooter />
    </div>
  );
}

export default AdminLayout;