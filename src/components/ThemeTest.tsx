'use client';

import ThemeToggle from './ThemeToggle';

export default function ThemeTest() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="p-8">
        <div className="max-w-2xl mx-auto">
          {/* Header con toggle */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Theme Test
            </h1>
            <ThemeToggle />
          </div>

          {/* Test cards */}
          <div className="space-y-6">
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Background Test
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Este fondo debería cambiar de gris claro a gris oscuro
              </p>
            </div>

            <div className="bg-gradient-to-r from-cyan-400 to-blue-500 dark:from-blue-600 dark:to-purple-600 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-white mb-4">
                Gradient Test
              </h2>
              <p className="text-white/90">
                Modo claro: cyan-blue | Modo oscuro: blue-purple
              </p>
            </div>

            <div className="border border-gray-200 dark:border-gray-700 p-6 rounded-lg bg-white dark:bg-gray-800">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Border Test
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Los bordes deberían cambiar también
              </p>
            </div>

            {/* Debug info */}
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                Debug Info
              </h3>
              <p className="text-yellow-700 dark:text-yellow-300 text-sm">
                Abre las DevTools (F12) y revisa la consola para ver los logs del tema.
                También verifica que el elemento HTML tenga la clase 'dark' en modo oscuro.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}