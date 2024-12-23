import React from "react";

function Footter() {
  return (
    <footer className="bg-gray-800 text-gray-200 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} BlogApp. All Rights Reserved.
        </p>
        <p className="text-sm mt-4 sm:mt-0">Built with ❤️ </p>
      </div>
    </footer>
  );
}

export default Footter;
