'use client';

import { Clock, TrendingUp, ChevronRight } from 'lucide-react';
import NewsImage from './NewsImage';
import { NewsAPIArticle } from '@/app/types';

interface NewsCardProps {
  article: NewsAPIArticle;
  featured?: boolean;
  onClick?: (article: NewsAPIArticle) => void;
}

const NewsCard = ({ article, featured = false, onClick }: NewsCardProps) => {
  // Función para formatear la fecha
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleDateString();
  };

  // Manejar click en la tarjeta
  const handleCardClick = () => {
    if (onClick) {
      onClick(article);
    }
  };

  return (
    <article 
      onClick={handleCardClick}
      className={`group cursor-pointer transition-all duration-300 hover:scale-105 ${
        featured ? 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20' : 'bg-white dark:bg-gray-800'
      } rounded-xl shadow-lg hover:shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700`}
    >
      <div className="relative overflow-hidden">
        <NewsImage
          src={article.urlToImage || undefined}
          alt={article.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
          priority={featured}
        />
        <div className="absolute top-4 left-4">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
            {article.source.name || 'General'}
          </span>
        </div>
        {featured && (
          <div className="absolute top-4 right-4">
            <TrendingUp className="w-5 h-5 text-yellow-400 drop-shadow-lg" />
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className={`font-bold mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors ${
          featured ? 'text-xl' : 'text-lg'
        }`}>
          {article.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
          {article.description || 'No description available'}
        </p>
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-4">
            <span className="font-medium">{article.author || 'Unknown Author'}</span>
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>{formatDate(article.publishedAt)}</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </article>
  );
};

export default NewsCard;