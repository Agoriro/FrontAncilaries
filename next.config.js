/** @type {import('next').NextConfig} */
const nextConfig = {
    
    poweredByHeader: false,
    // Optimizaciones adicionales
    eslint: {
      ignoreDuringBuilds: true,
    },
    typescript: {
      ignoreBuildErrors: true, // Solo si necesitas ignorar errores de TypeScript durante el build
    },
  }
  
  module.exports = nextConfig
