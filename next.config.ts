/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Usar la configuración legacy que es más compatible
    domains: [
      'dims.apnews.com',
      'assets.apnews.com',
      'cdn.iz.ru',
      'images.unsplash.com',
      'via.placeholder.com',
      'picsum.photos'
    ],
    
    // Configuración adicional permisiva
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      }
    ],
    
    formats: ['image/webp', 'image/avif'],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
}

module.exports = nextConfig