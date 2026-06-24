import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation(); // Get the current location

  // Function to check if the link is active
  const isActive = (pathname) => location.pathname === pathname;

  return (
    <header className="bg-primary-dark p-4">
      <div className="container mx-auto flex justify-between items-center overflow-hidden">
        <h1 className="text-white text-2xl font-bold">nanoWISS</h1>
        <nav className="flex-1" aria-label="Primary navigation">
          <ul className="flex flex-wrap justify-end space-x-4 overflow-hidden">
            <li>
              <Link
                to="/"
                className={`text-white hover:text-primary-light ${isActive('/') ? 'font-bold text-primary-light' : ''}`}
                aria-current={isActive('/') ? 'page' : undefined}
              >
                Home
              </Link>
            </li>
            <li>
              <a
                href="/#technology"
                className="text-white hover:text-primary-light"
              >
                Our Technology
              </a>
            </li>
            <li>
              <Link
                to="/team"
                className={`text-white hover:text-primary-light ${isActive('/team') ? 'font-bold text-primary-light' : ''}`}
                aria-current={isActive('/team') ? 'page' : undefined}
              >
                Team
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                className={`text-white hover:text-primary-light ${isActive('/products') ? 'font-bold text-primary-light' : ''}`}
                aria-current={isActive('/products') ? 'page' : undefined}
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                to="/agrowiss"
                className={`text-white hover:text-primary-light ${isActive('/agrowiss') ? 'font-bold text-primary-light' : ''}`}
                aria-current={isActive('/agrowiss') ? 'page' : undefined}
              >
                AgroWISS
              </Link>
            </li>
            {/* <li>
              <Link
                to="/contact"
                className={`text-white hover:text-primary-light ${isActive('/contact') ? 'font-bold text-primary-light' : ''}`}
              >
                Contact
              </Link>
            </li> */}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
