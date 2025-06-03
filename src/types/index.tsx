// types/index.ts

// Usa directamente la estructura de NewsAPI
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

export interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export interface NewsCardProps {
  article: NewsAPIArticle;
  featured?: boolean;
}

export interface NewsImageProps {
  src?: string | null;
  alt: string;
  className?: string;
  priority?: boolean;
}

export interface HeroSectionProps {
  title?: string;
  subtitle?: string;
}

export interface NewsSectionProps {
  title: string;
  articles: NewsAPIArticle[];
  icon?: React.ReactNode;
  featured?: boolean;
}

export const categories = [
  "All", 
  "Technology", 
  "Business", 
  "Health", 
  "Science", 
  "Sports", 
  "Entertainment"
] as const;

export type Category = typeof categories[number];