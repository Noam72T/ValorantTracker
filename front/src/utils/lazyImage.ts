export const lazyLoadImage = (img: HTMLImageElement) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const image = entry.target as HTMLImageElement;
        const src = image.getAttribute('data-src');
        if (src) {
          image.src = src;
          image.removeAttribute('data-src');
          observer.unobserve(image);
        }
      }
    });
  });

  observer.observe(img);
};

export const optimizeImageUrl = (url: string, width?: number, quality: number = 75): string => {
  if (!url) return url;
  
  const urlObj = new URL(url);
  
  if (width) {
    urlObj.searchParams.set('w', width.toString());
  }
  urlObj.searchParams.set('q', quality.toString());
  urlObj.searchParams.set('auto', 'format');
  
  return urlObj.toString();
};

export const getResponsiveImageSizes = (baseWidth: number) => {
  return {
    mobile: Math.round(baseWidth * 0.5),
    tablet: Math.round(baseWidth * 0.75),
    desktop: baseWidth
  };
};

export const preloadCriticalImages = (urls: string[]) => {
  urls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = url;
    document.head.appendChild(link);
  });
};
