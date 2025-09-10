import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-dark-800/90 backdrop-blur-md border-b border-neon-purple/30 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <span className="text-xl font-bold text-neon-cyan neon-text font-mono">tmn.nyc</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                  isActive(item.href)
                    ? 'text-neon-pink bg-dark-700 border border-neon-pink/50 shadow-lg'
                    : 'text-gray-300 hover:text-neon-cyan hover:bg-dark-700/50 border border-transparent hover:border-neon-cyan/30'
                }`}
                style={{
                  textShadow: isActive(item.href) ? '0 0 10px #ff0080' : 'none',
                  boxShadow: isActive(item.href) ? '0 0 20px rgba(255, 0, 128, 0.3)' : 'none',
                }}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-300 hover:text-neon-cyan hover:bg-dark-700/50 border border-transparent hover:border-neon-cyan/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-neon-cyan/50 focus:ring-offset-2 focus:ring-offset-dark-900"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? 'Close main menu' : 'Open main menu'}
            >
              <span className="sr-only">{isOpen ? 'Close main menu' : 'Open main menu'}</span>
              {isOpen ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile navigation */}
        {isOpen && (
          <div className="md:hidden" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-neon-purple/30">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 rounded-lg text-base font-medium transition-all duration-300 ${
                    isActive(item.href)
                      ? 'text-neon-pink bg-dark-700 border border-neon-pink/50'
                      : 'text-gray-300 hover:text-neon-cyan hover:bg-dark-700/50 border border-transparent hover:border-neon-cyan/30'
                  }`}
                  onClick={() => setIsOpen(false)}
                  style={{
                    textShadow: isActive(item.href) ? '0 0 10px #ff0080' : 'none',
                    boxShadow: isActive(item.href) ? '0 0 20px rgba(255, 0, 128, 0.3)' : 'none',
                  }}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
