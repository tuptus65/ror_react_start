import React from 'react';
import AdminNavigation from "~/layouts/AdminNavigation";
import AppFooter from "~/layouts/AppFooter";

function AdminLayout({ children }) {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <AdminNavigation />
      <main className="container mx-auto flex-1 flex flex-col">
        {children}
      </main>
      <AppFooter />
    </div>
  );
}

export default AdminLayout;