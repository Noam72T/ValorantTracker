export const Footer = () => {
  return (
    <footer className="bg-gray-800 border-t border-gray-700 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-3">
          <div className="text-center md:text-left">
            <p className="text-gray-400 text-sm">
              © 2024 Valorant Tracker. Tous droits réservés.
            </p>
            <p className="text-gray-500 text-xs">
              Non affilié à Riot Games. Valorant est une marque déposée de Riot Games.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-sm">
              GitHub
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm">
              Documentation
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm">
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
