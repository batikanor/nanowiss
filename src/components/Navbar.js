import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import nanoWissLogo from '../assets/nanowiss_logo_on_white.png';

const Navbar = () => {
  const location = useLocation(); // Get the current location
  const [isOpen, setIsOpen] = useState(false);

  // Function to check if the link is active
  const isActive = (pathname) => location.pathname === pathname;

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname, location.hash]);

  const navItems = [
    { label: 'Home', to: '/' },
    { label: 'Our Technology', href: '/#technology' },
    { label: 'Team', to: '/team' },
    { label: 'Products', to: '/products' },
    { label: 'AgroWISS', to: '/agrowiss' },
  ];

  const linkClass = (path) =>
    `rounded-full px-3 py-2 text-sm font-semibold transition hover:bg-[#f4edff] hover:text-primary-dark ${
      path && isActive(path) ? 'bg-[#efe4ff] text-primary-dark' : 'text-secondary-light'
    }`;

  const mobileLinkClass = (path) =>
    `block rounded-md px-4 py-3 text-base font-semibold transition ${
      path && isActive(path)
        ? 'bg-primary-dark text-white shadow-sm'
        : 'bg-[#f8f5ff] text-primary-dark hover:bg-[#efe4ff]'
    }`;

  return (
    <header
      className="relative z-40 border-b border-primary-dark/10 bg-white text-primary-dark shadow-sm [color-scheme:light]"
    >
      <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-3">
        <Link to="/" className="shrink-0" aria-label="nanoWISS home">
          <img
            src={nanoWissLogo}
            alt="nanoWISS"
            className="h-11 w-auto max-w-[10.5rem] object-contain sm:h-14 sm:max-w-[11rem]"
          />
        </Link>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-primary-dark/20 bg-white text-primary-dark transition hover:border-primary-light hover:bg-[#f8f5ff] hover:text-primary-dark focus:outline-none focus:ring-4 focus:ring-primary-light/30 md:hidden"
          aria-label={isOpen ? 'Close primary navigation' : 'Open primary navigation'}
          aria-controls="primary-navigation"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <nav className="hidden flex-1 md:block" aria-label="Primary navigation">
          <ul className="flex items-center justify-end gap-1">
            {navItems.map((item) => (
              <li key={item.label}>
                {item.to ? (
                  <Link
                    to={item.to}
                    className={linkClass(item.to)}
                    aria-current={isActive(item.to) ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a href={item.href} className={linkClass()}>
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <nav
        id="primary-navigation"
        className={`border-t border-primary-dark/10 bg-white px-4 py-3 shadow-lg md:hidden ${
          isOpen ? 'block' : 'hidden'
        }`}
        aria-label="Primary navigation"
      >
        <ul className="grid grid-cols-1 gap-2">
          {navItems.map((item) => (
            <li key={item.label}>
              {item.to ? (
                <Link
                  to={item.to}
                  className={mobileLinkClass(item.to)}
                  aria-current={isActive(item.to) ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  href={item.href}
                  className={mobileLinkClass()}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
