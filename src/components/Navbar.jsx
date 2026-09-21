import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-white text-black px-8 py-4 flex justify-center items-center shadow-md sticky top-0 z-50">
      {/* Logo / Brand */}
      <div className="font-bold text-xl">
        HelpUsFind
      </div>
    </nav>
  );
};

export default Navbar;