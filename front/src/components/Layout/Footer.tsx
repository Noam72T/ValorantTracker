export const Footer = () => {
  return (
    <footer className="bg-black/50 backdrop-blur-lg border-t border-red-500/20 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-gray-400 text-sm">
              © 2024 Valorant Tracker. Tous droits réservés.
            </p>
            <p className="text-gray-500 text-xs mt-1">
              Non affilié à Riot Games. Valorant est une marque déposée de Riot Games.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition text-sm"
            >
              GitHub
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition text-sm"
            >
              Documentation
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition text-sm"
            >
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
