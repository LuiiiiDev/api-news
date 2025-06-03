'use client';

const Footer = () => (
  <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-center space-x-6 text-sm text-gray-600 dark:text-gray-300">
        <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          About
        </a>
        <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          Privacy
        </a>
        <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          Terms
        </a>
        <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          Contact
        </a>
      </div>
      <div className="text-center mt-4 text-sm text-gray-500 dark:text-gray-400">
        © 2025 NewsHub. Powered by News API.
      </div>
    </div>
  </footer>
);

export default Footer;