'use client';

import { useState, useEffect } from 'react';
import { Newspaper, Search, AlertCircle } from 'lucide-react';

// Components
import Header from '@/app/components/Header';
import HeroSection from '@/app/components/HeroSection';
import NewsSection from '@/app/components/NewsSection';
import NewsDetail from '@/app/components/NewsDetail';
import Footer from '@/app/components/Footer';

// Types and Services
import { NewsAPIArticle } from '@/app/types';
import { newsApi } from '@/services/newsApi';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const [articles, setArticles] = useState<NewsAPIArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Estados para el detalle de noticia
  const [selectedArticle, setSelectedArticle] = useState<NewsAPIArticle | null>(null);
  const [showDetail, setShowDetail] = useState(false);

  // Cargar noticias cuando cambia la categoría
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);
        
        let newsArticles: NewsAPIArticle[] = [];
        
        if (selectedCategory === 'All') {
          newsArticles = await newsApi.getTopHeadlines(20);
        } else {
          newsArticles = await newsApi.getNewsByCategory(selectedCategory, 20);
        }
        
        setArticles(newsArticles);
      } catch (err: any) {
        console.error('Error fetching news:', err);
        setError('Failed to load news. Please try again later.');
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [selectedCategory]);

  // Búsqueda cuando cambia el query
  useEffect(() => {
    const searchNews = async () => {
      if (!searchQuery.trim()) return;
      
      try {
        setLoading(true);
        setError(null);
        
        const searchResults = await newsApi.searchNews(searchQuery, 20);
        setArticles(searchResults);
        
        if (searchResults.length === 0) {
          setError(`No results found for "${searchQuery}"`);
        }
      } catch (err: any) {
        console.error('Error searching news:', err);
        setError('Failed to search news. Please try again.');
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      if (searchQuery.trim()) {
        searchNews();
      }
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  // Función para abrir detalle de noticia
  const openNewsDetail = (article: NewsAPIArticle) => {
    setSelectedArticle(article);
    setShowDetail(true);
  };

  // Función para cerrar detalle de noticia
  const closeNewsDetail = () => {
    setShowDetail(false);
    setSelectedArticle(null);
  };

  // Determinar el título de la sección
  const getSectionTitle = () => {
    if (searchQuery.trim()) {
      return `Search Results for "${searchQuery}"`;
    }
    return selectedCategory === 'All' ? 'Top Headlines' : `${selectedCategory} News`;
  };

  const getSectionIcon = () => {
    if (searchQuery.trim()) {
      return <Search className="w-6 h-6 mr-2 text-green-500" />;
    }
    return <Newspaper className="w-6 h-6 mr-2 text-blue-500" />;
  };

  // Si se está mostrando el detalle, renderizar solo el componente NewsDetail
  if (showDetail && selectedArticle) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900">
        <NewsDetail 
          article={selectedArticle} 
          onBack={closeNewsDetail}
        />
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900">
        <Header 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-300 text-lg">Loading news...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Vista principal
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900">
      <Header 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <HeroSection />
        
        {/* Mostrar error si existe */}
        {error && !loading && (
          <div className="mb-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200 px-4 py-3 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium">Notice</p>
              <p className="text-sm mt-1">{error}</p>
            </div>
          </div>
        )}

        {/* Sección de noticias */}
        <NewsSection
          title={getSectionTitle()}
          articles={articles}
          icon={getSectionIcon()}
          featured={!searchQuery && selectedCategory === 'All'}
          onArticleClick={openNewsDetail}
        />

        {/* Mensaje cuando no hay noticias */}
        {!loading && articles.length === 0 && !error && (
          <div className="text-center py-12">
            <Newspaper className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
              No news found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {searchQuery 
                ? `No results found for "${searchQuery}"`
                : `No ${selectedCategory} news available at the moment`
              }
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}