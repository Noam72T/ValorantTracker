import { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  lazy?: boolean;
}

export const OptimizedImage = ({
  src,
  alt,
  className = '',
  width,
  height,
  lazy = true
}: OptimizedImageProps) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={lazy ? 'lazy' : 'eager'}
      className={`${className} ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity`}
      onLoad={() => setLoaded(true)}
    />
  );
};
