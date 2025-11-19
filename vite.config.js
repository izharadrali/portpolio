import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // Assuming you are using React

// https://vitejs.dev/config/
export default defineConfig({
  // CRITICAL FIX: Set the base path to your repository name for GitHub Pages.
  // This ensures all assets (CSS, JS, images) are loaded correctly 
  // and the router understands the starting point.
  base: '/portpolio/', 
  
  plugins: [react()], 
  
  // Optional: If you were using a custom port for development
  server: {
    port: 3000, 
  },
  
  // Optional: Add a polyfill for node built-ins if needed by your dependencies
  resolve: {
    alias: {
      // Example alias for common issues (you might not need this)
      // 'process/browser': 'process/browser.js'
    }
  }
});
