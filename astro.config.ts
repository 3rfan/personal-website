import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'

export default defineConfig({
  site: import.meta.env.PROD ? 'https://e-hosseini.com' : 'http://localhost:4321',
  integrations: [
    react(),
    tailwind({ applyBaseStyles: false }),
  ],
})
