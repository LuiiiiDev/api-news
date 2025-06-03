'use client';

import { useState } from 'react';
import ShareButtons from '@/app/components/ShareButtons';
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  ExternalLink
} from 'lucide-react';
import NewsImage from './NewsImage';
import { NewsAPIArticle } from '@/app/types';

interface NewsDetailProps {
  article: NewsAPIArticle;
  onBack: () => void;
}

export default function NewsDetail({ article, onBack }: NewsDetailProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const openOriginalArticle = () => {
    if (article.url) {
      window.open(article.url, '_blank');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header con botón de regreso */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
        
        {/* Botones de compartir - usando componente */}
        <ShareButtons 
          title={article.title}
          originalUrl={article.url}
          description={article.description || undefined}
        />
      </div>

      {/* Contenido del artículo */}
      <article className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        {/* Imagen principal */}
        {article.urlToImage && (
          <div className="relative h-64 md:h-96">
            <NewsImage
              src={article.urlToImage}
              alt={article.title}
              className="w-full h-full object-cover"
              priority={true}
            />
            <div className="absolute top-4 left-4">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                {article.source.name}
              </span>
            </div>
          </div>
        )}

        <div className="p-6 md:p-8">
          {/* Título */}
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            {article.title}
          </h1>

          {/* Metadatos */}
          <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-300 text-sm mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{article.author || 'Unknown Author'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(article.publishedAt)}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">Source:</span>
              <span>{article.source.name}</span>
            </div>
          </div>

          {/* Descripción/Resumen */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Summary
            </h2>
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
              {article.description}
            </p>
          </div>

          {/* Contenido */}
          {article.content && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Content
              </h2>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {article.content}
                </p>
              </div>
            </div>
          )}

          {/* Botón para ver artículo original */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Read the full article
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Get the complete story from the original source
            </p>
            <button
              onClick={openOriginalArticle}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors font-medium"
            >
              <ExternalLink className="w-5 h-5" />
              Read on {article.source.name}
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}