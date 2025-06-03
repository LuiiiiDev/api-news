'use client';

import { Search } from 'lucide-react';
import NewsCard from './NewsCard';
import { NewsAPIArticle } from '@/types';

interface NewsSectionProps {
  title: string;
  articles: NewsAPIArticle[];
  icon?: React.ReactNode;
  featured?: boolean;
  onArticleClick?: (article: NewsAPIArticle) => void;
}

const NewsSection = ({ 
  title, 
  articles, 
  icon, 
  featured = false,
  onArticleClick
}: NewsSectionProps) => {
  if (!articles.length) {
    return (
      <section className="mb-12">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
          {icon}
          {title}
        </h3>
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No news found</h4>
          <p className="text-gray-600 dark:text-gray-300">Try adjusting your search or category filter</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-12">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
        {icon}
        {title}
      </h3>
      <div className={`grid gap-8 ${
        featured 
          ? 'grid-cols-1 lg:grid-cols-2' 
          : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
      }`}>
        {articles.map((article, index) => (
          <NewsCard 
            key={article.url || index}
            article={article} 
            featured={featured}
            onClick={onArticleClick}
          />
        ))}
      </div>
    </section>
  );
};

export default NewsSection;