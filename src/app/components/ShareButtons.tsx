// app/components/ShareButtons.tsx
'use client';

import { useState } from 'react';
import { Facebook, Twitter, Linkedin, Copy, Check, ExternalLink } from 'lucide-react';

interface ShareButtonsProps {
  title: string;
  originalUrl: string; // URL de la noticia real
  description?: string;
}

export default function ShareButtons({ title, originalUrl, description }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const shareToFacebook = () => {
    const shareUrl = encodeURIComponent(originalUrl);
    const quote = description ? encodeURIComponent(description) : '';
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&quote=${quote}`, '_blank');
  };

  const shareToTwitter = () => {
    const shareUrl = encodeURIComponent(originalUrl);
    const text = encodeURIComponent(`${title} - `);
    window.open(`https://twitter.com/intent/tweet?url=${shareUrl}&text=${text}`, '_blank');
  };

  const shareToLinkedIn = () => {
    const shareUrl = encodeURIComponent(originalUrl);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`, '_blank');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(originalUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Error copying to clipboard:', error);
    }
  };

  const openOriginalArticle = () => {
    window.open(originalUrl, '_blank');
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600 dark:text-gray-300 mr-2">Share:</span>
      
      {/* Botón para abrir artículo original */}
      <button
        onClick={openOriginalArticle}
        className="p-2 rounded-full bg-green-600 hover:bg-green-700 text-white transition-colors"
        title="Open original article"
      >
        <ExternalLink className="w-4 h-4" />
      </button>
      
      {/* Botones de redes sociales */}
      <button
        onClick={shareToFacebook}
        className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-colors"
        title="Share on Facebook"
      >
        <Facebook className="w-4 h-4" />
      </button>
      <button
        onClick={shareToTwitter}
        className="p-2 rounded-full bg-sky-500 hover:bg-sky-600 text-white transition-colors"
        title="Share on Twitter"
      >
        <Twitter className="w-4 h-4" />
      </button>
      <button
        onClick={shareToLinkedIn}
        className="p-2 rounded-full bg-blue-700 hover:bg-blue-800 text-white transition-colors"
        title="Share on LinkedIn"
      >
        <Linkedin className="w-4 h-4" />
      </button>
      <button
        onClick={copyToClipboard}
        className="p-2 rounded-full bg-gray-600 hover:bg-gray-700 text-white transition-colors"
        title="Copy original link"
      >
        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      </button>
    </div>
  );
}