export const measurePerformance = (name: string, fn: () => void) => {
  const start = performance.now();
  fn();
  const end = performance.now();
  console.log(`[Performance] ${name}: ${(end - start).toFixed(2)}ms`);
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

export const prefetchRoute = (route: string) => {
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = route;
  document.head.appendChild(link);
};

export const getResourceTiming = () => {
  if (!('performance' in window)) return null;

  const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
  
  return {
    total: resources.length,
    images: resources.filter(r => r.initiatorType === 'img').length,
    scripts: resources.filter(r => r.initiatorType === 'script').length,
    css: resources.filter(r => r.initiatorType === 'css' || r.initiatorType === 'link').length,
    totalSize: resources.reduce((acc, r) => acc + (r.transferSize || 0), 0),
    cached: resources.filter(r => r.transferSize === 0).length,
  };
};

export const clearPerformanceMetrics = () => {
  if ('performance' in window && performance.clearResourceTimings) {
    performance.clearResourceTimings();
  }
};
