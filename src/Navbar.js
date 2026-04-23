import React from "react";
import { Link } from "react-router-dom";
import { useKine } from './context/KineContext';

export default function Navbar() {
  const { currentKineEmail, clearKineSession } = useKine();

  const navLinks = currentKineEmail
    ? [
        { label: 'Home', to: '/' },
        { label: 'Dashboard Kiné', to: '/kine-dashboard' },
        { label: 'Services', to: '/services' },
      ]
    : [
        { label: 'Home', to: '/' },
        { label: 'Services', to: '/services' },
        { label: 'Register', to: '/register' },
        { label: 'Login', to: '/login' },
      ];

  return (
    <nav className="bg-[#226099] text-white shadow-md sticky top-0 z-50 h-16 flex items-center relative px-6 md:px-12">

      {/* Logo à gauche */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl md:text-3xl font-bold tracking-wide">
        KinéIA
      </div>

      {/* Liens centrés */}
      <div className="flex flex-1 justify-center space-x-8 text-base md:text-lg">
        {navLinks.map((link, i) => (
          <Link
            key={i}
            to={link.to}
            className="relative px-3 py-1 font-medium hover:text-yellow-300 transition-colors duration-200"
          >
            {link.label}
            {/* Petite ligne animée au hover */}
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-yellow-300 transition-all duration-300 hover:w-full"></span>
          </Link>
        ))}
      </div>

      {currentKineEmail && (
        <div className="absolute right-6 top-1/2 -translate-y-1/2">
          <button
            onClick={clearKineSession}
            className="bg-yellow-300 text-[#226099] px-3 py-1 rounded-md font-semibold hover:bg-yellow-400 transition-colors"
          >
            Déconnexion
          </button>
        </div>
      )}

      {/* Option : bouton droit (exemple) */}
      {/* <div className="absolute right-6 top-1/2 -translate-y-1/2">
        <button className="bg-yellow-300 text-[#226099] px-4 py-1 rounded-md font-semibold hover:bg-yellow-400 transition-colors">
          Contact
        </button>
      </div> */}

    </nav>
  );
}
