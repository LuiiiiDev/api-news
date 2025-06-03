'use client';

import { HeroSectionProps } from '@/types';

const HeroSection = ({ 
  title = "Stay Informed with Latest News",
  subtitle = "Discover breaking news, trending stories, and in-depth analysis from around the world"
}: HeroSectionProps) => (
  <section className="mb-12">
    <div className="text-center mb-8">
      <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
        {title.includes('Latest News') ? (
          <>
            Stay Informed with{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 dark:from-blue-600 dark:to-purple-600 bg-clip-text text-transparent">
              Latest News
            </span>
          </>
        ) : (
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 dark:from-blue-600 dark:to-purple-600 bg-clip-text text-transparent">
            {title}
          </span>
        )}
      </h2>
      <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        {subtitle}
      </p>
    </div>
  </section>
);

export default HeroSection;