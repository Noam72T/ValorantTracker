import { useEffect, useState } from 'react';

interface EcoMetrics {
  dataTransferred: number;
  imagesLoaded: number;
  cacheHitRate: number;
  pageLoadTime: number;
  co2Estimate: number;
}

export const useEcoMetrics = () => {
  const [metrics, setMetrics] = useState<EcoMetrics>({
    dataTransferred: 0,
    imagesLoaded: 0,
    cacheHitRate: 0,
    pageLoadTime: 0,
    co2Estimate: 0
  });

  useEffect(() => {
    if ('performance' in window) {
      const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const resourceData = performance.getEntriesByType('resource');

      const dataTransferred = resourceData.reduce((acc, resource: any) => {
        return acc + (resource.transferSize || 0);
      }, 0);

      const imagesLoaded = resourceData.filter((r: any) => r.initiatorType === 'img').length;

      const cachedResources = resourceData.filter((r: any) => r.transferSize === 0).length;
      const cacheHitRate = resourceData.length > 0 ? (cachedResources / resourceData.length) * 100 : 0;

      const pageLoadTime = perfData ? perfData.loadEventEnd - perfData.fetchStart : 0;

      const co2Estimate = calculateCO2(dataTransferred);

      setMetrics({
        dataTransferred: Math.round(dataTransferred / 1024),
        imagesLoaded,
        cacheHitRate: Math.round(cacheHitRate),
        pageLoadTime: Math.round(pageLoadTime),
        co2Estimate
      });
    }
  }, []);

  return metrics;
};

const calculateCO2 = (bytes: number): number => {
  const kWh = (bytes / 1024 / 1024 / 1024) * 0.81;
  const co2grams = kWh * 475;
  return Math.round(co2grams * 100) / 100;
};

export const getEcoScore = (metrics: EcoMetrics): { score: number; rating: string; color: string } => {
  let score = 100;

  if (metrics.dataTransferred > 5000) score -= 30;
  else if (metrics.dataTransferred > 2000) score -= 15;

  if (metrics.pageLoadTime > 3000) score -= 20;
  else if (metrics.pageLoadTime > 1500) score -= 10;

  if (metrics.cacheHitRate < 30) score -= 20;
  else if (metrics.cacheHitRate < 60) score -= 10;

  if (metrics.imagesLoaded > 50) score -= 15;
  else if (metrics.imagesLoaded > 30) score -= 8;

  let rating = 'Excellent';
  let color = 'green';

  if (score < 90) {
    rating = 'Bon';
    color = 'lime';
  }
  if (score < 75) {
    rating = 'Moyen';
    color = 'yellow';
  }
  if (score < 60) {
    rating = 'Faible';
    color = 'orange';
  }
  if (score < 40) {
    rating = 'Mauvais';
    color = 'red';
  }

  return { score: Math.max(0, score), rating, color };
};
