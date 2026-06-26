import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: './',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      workbox: {
        navigateFallback: 'index.html',
        globPatterns: ['**/*.{js,css,html,svg,png,webmanifest}'],
        runtimeCaching: [
          {
            // Tiles del mapa (CARTO/OSM): se cachean al verlos online → disponibles offline después
            urlPattern: ({ url }) => url.host.endsWith('basemaps.cartocdn.com') || url.host.endsWith('tile.openstreetmap.org'),
            handler: 'CacheFirst',
            options: {
              cacheName: 'map-tiles',
              expiration: { maxEntries: 3000, maxAgeSeconds: 60 * 60 * 24 * 60 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            // Tasas de cambio (open.er-api): red primero, cache de respaldo offline
            urlPattern: ({ url }) => url.host === 'open.er-api.com',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'fx',
              networkTimeoutSeconds: 4,
              expiration: { maxEntries: 4, maxAgeSeconds: 60 * 60 * 24 * 3 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            // Clima en vivo (Open-Meteo): red primero, cache de respaldo
            urlPattern: ({ url }) => url.host === 'api.open-meteo.com',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'weather',
              networkTimeoutSeconds: 4,
              expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 * 6 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
      manifest: {
        name: 'Viaje Asia 2026 · Familia Roque',
        short_name: 'Asia 2026',
        description: 'Itinerario del Gran Viaje Asia 2026 — Familia Roque',
        theme_color: '#1a1a2a',
        background_color: '#f4f2ee',
        display: 'standalone',
        orientation: 'portrait',
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
    }),
  ],
})
