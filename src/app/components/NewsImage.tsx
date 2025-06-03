'use client';

import Image from "next/image";
import { useState } from 'react';
import { ImageIcon } from 'lucide-react';
import { NewsImageProps } from '@/app/types';


const NewsImage = ({ 
  src, 
  alt, 
  className, 
  priority = false 
}: NewsImageProps) => {
  const [imageError, setImageError] = useState(false);

  if (!src || imageError) {
    return (
      <div className={`bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center ${className}`}>
        <ImageIcon className="w-12 h-12 text-gray-400" />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={800}
      height={400}
      className={className}
      priority={priority}
      onError={() => setImageError(true)}
    />
  );
};

export default NewsImage;