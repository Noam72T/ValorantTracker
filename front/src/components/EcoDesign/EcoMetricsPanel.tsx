import { useState } from 'react';
import { useEcoMetrics, getEcoScore } from '../../hooks/useEcoMetrics';

export const EcoMetricsPanel = () => {
  const [open, setOpen] = useState(false);
  const metrics = useEcoMetrics();
  const { score, rating } = getEcoScore(metrics);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-4 right-4 bg-green-600 hover:bg-green-700 text-white rounded-full p-3 shadow-lg z-40"
        title="Métriques éco"
      >
        🌱
      </button>

      {open && (
        <div className="fixed bottom-20 right-4 bg-gray-800 rounded-lg shadow-xl p-6 z-40 w-80 border border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-white font-bold">🌱 Éco-conception</h3>
            <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-white">
              ✕
            </button>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-300 text-sm">Score</span>
                <span className="text-green-500 font-bold">{score}/100</span>
              </div>
              <div className="w-full bg-gray-600 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: `${score}%` }}></div>
              </div>
              <p className="text-xs text-gray-400 mt-2">{rating}</p>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Données</span>
                <span className="text-white">{metrics.dataTransferred} KB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Images</span>
                <span className="text-white">{metrics.imagesLoaded}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Cache</span>
                <span className="text-white">{metrics.cacheHitRate}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Chargement</span>
                <span className="text-white">{metrics.pageLoadTime}ms</span>
              </div>
              <div className="flex justify-between border-t border-gray-600 pt-2">
                <span className="text-gray-400">CO₂</span>
                <span className="text-green-400">{metrics.co2Estimate}g</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
