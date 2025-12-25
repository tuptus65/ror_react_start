import React from 'react';
import AppNavigation from "~/layouts/AppNavigation";
import AppFooter from "~/layouts/AppFooter";

function AppLayout({ children }) {
  return (
    <div className="bg-gray-50 md:bg-application min-h-screen flex flex-col">
      <AppNavigation />
      <main className="container mx-auto flex-1 flex flex-col">
        {children}
      </main>
      <AppFooter />
    </div>
  );
}

export default AppLayout;