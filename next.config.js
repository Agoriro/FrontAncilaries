/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // Asegúrate de que output está configurado correctamente para Azure
    output: 'standalone',
    // Ajusta según necesites
    env: {
      // Variables de entorno públicas
    }
  }
  
  module.exports = nextConfig
