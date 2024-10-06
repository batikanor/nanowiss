import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation(); // Get the current location

  // Function to check if the link is active
  const isActive = (pathname) => location.pathname === pathname;

  return (
    <header className="bg-primary-dark p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">nanoWISS</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link
                to="/"
                className={`text-white hover:text-primary-light ${isActive('/') ? 'font-bold text-primary-light' : ''}`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/story"
                className={`text-white hover:text-primary-light ${isActive('/story') ? 'font-bold text-primary-light' : ''}`}
              >
                Story
              </Link>
            </li>
            <li>
              <Link
                to="/technology"
                className={`text-white hover:text-primary-light ${isActive('/technology') ? 'font-bold text-primary-light' : ''}`}
              >
                Technology
              </Link>
            </li>
            <li>
              <Link
                to="/team"
                className={`text-white hover:text-primary-light ${isActive('/team') ? 'font-bold text-primary-light' : ''}`}
              >
                Team
              </Link>
            </li>
            <li>
              <Link
                to="/nanowiss/contact"
                className={`text-white hover:text-primary-light ${isActive('/contact') ? 'font-bold text-primary-light' : ''}`}
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
