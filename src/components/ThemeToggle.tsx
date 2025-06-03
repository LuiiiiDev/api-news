'use client';

import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Función para aplicar el tema
  const applyTheme = (dark: boolean) => {
    const html = document.documentElement;
    if (dark) {
      html.classList.add('dark');
      html.style.colorScheme = 'dark';
    } else {
      html.classList.remove('dark');
      html.style.colorScheme = 'light';
    }
  };

  // Inicializar tema
  useEffect(() => {
    setMounted(true);
    
    // Comprobar tema guardado
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    let shouldBeDark = false;
    
    if (savedTheme) {
      shouldBeDark = savedTheme === 'dark';
    } else {
      shouldBeDark = prefersDark;
    }
    
    setIsDark(shouldBeDark);
    applyTheme(shouldBeDark);
    
    // Debug: verificar que se aplicó
    console.log('Theme initialized:', shouldBeDark ? 'dark' : 'light');
    console.log('HTML classes:', document.documentElement.className);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    applyTheme(newIsDark);
    
    // Guardar en localStorage
    localStorage.setItem('theme', newIsDark ? 'dark' : 'light');
    
    // Debug: verificar el cambio
    console.log('Theme changed to:', newIsDark ? 'dark' : 'light');
    console.log('HTML classes after toggle:', document.documentElement.className);
  };

  // No renderizar hasta que esté montado
  if (!mounted) {
    return (
      <div className="p-2 rounded-lg bg-gray-100 w-9 h-9 animate-pulse"></div>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={`relative p-2 rounded-lg transition-all duration-200 ${
        isDark 
          ? 'bg-gray-700 hover:bg-gray-600 text-blue-400' 
          : 'bg-gray-200 hover:bg-gray-300 text-yellow-600'
      }`}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <div className="relative w-5 h-5">
        <Sun
          className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${
            isDark ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
          }`}
        />
        <Moon
          className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${
            isDark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
          }`}
        />
      </div>
    </button>
  );
}