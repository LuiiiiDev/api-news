const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2';

interface NewsAPIResponse {
  status: string;
  totalResults: number;
  articles: NewsAPIArticle[];
}

export interface NewsAPIArticle {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

export const newsApi = {
  // Obtener noticias principales
  async getTopHeadlines(pageSize: number = 20): Promise<NewsAPIArticle[]> {
    try {
      const response = await fetch(
        `${BASE_URL}/top-headlines?country=us&pageSize=${pageSize}&apiKey=${API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data: NewsAPIResponse = await response.json();
      
      return data.articles.filter(article => 
        article.title && 
        article.title !== '[Removed]' &&
        article.description &&
        article.url
      );
    } catch (error) {
      console.error('Error fetching top headlines:', error);
      throw error;
    }
  },

  // Búsqueda por palabras clave
  async searchNews(query: string, pageSize: number = 20): Promise<NewsAPIArticle[]> {
    if (!query.trim()) return [];
    
    try {
      const response = await fetch(
        `${BASE_URL}/everything?q=${encodeURIComponent(query)}&pageSize=${pageSize}&apiKey=${API_KEY}&sortBy=relevancy&language=en`
      );
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data: NewsAPIResponse = await response.json();
      
      return data.articles.filter(article => 
        article.title && 
        article.title !== '[Removed]' &&
        article.description &&
        article.url
      );
    } catch (error) {
      console.error('Error searching news:', error);
      throw error;
    }
  },

  // Obtener noticias por categoría
  async getNewsByCategory(category: string, pageSize: number = 20): Promise<NewsAPIArticle[]> {
    try {
      const response = await fetch(
        `${BASE_URL}/top-headlines?country=us&category=${category.toLowerCase()}&pageSize=${pageSize}&apiKey=${API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data: NewsAPIResponse = await response.json();
      
      return data.articles.filter(article => 
        article.title && 
        article.title !== '[Removed]' &&
        article.description &&
        article.url
      );
    } catch (error) {
      console.error('Error fetching news by category:', error);
      throw error;
    }
  }
};