import React from 'react';

function AppFooter(props) {
  return (
      <footer className="w-full border-t border-gray-500 flex justify-end items-center p-4">
        &copy; {new Date().getFullYear()} Turox. All rights reserved.
      </footer>
  );
}

export default AppFooter;