import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import App from './App.jsx'
import photo from './assets/photo.jpg'
// IMPORT BrowserRouter for routing
import { BrowserRouter } from 'react-router-dom'; 

// Create a circular favicon from the profile photo at runtime.
// This draws the image to a square canvas with a circular clip and sets the link href to a PNG data URL.
const setFaviconLink = (url, type = 'image/png') => {
  let link = document.querySelector("link[rel~='icon']");
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.getElementsByTagName('head')[0].appendChild(link);
  }
  link.href = url;
  link.type = type;
};

try {
  const makeCircularFavicon = (src) => {
    const img = new Image();
    // don't set crossOrigin for local assets served by Vite — can cause CORS/canvas taint issues
    img.src = src;
    img.onload = () => {
      try {
        const size = 128; // favicon resolution
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, size, size);
        // draw circular clip
        ctx.save();
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();

        // draw image covering the canvas (cover behavior)
        const ratio = Math.max(size / img.width, size / img.height);
        const nw = img.width * ratio;
        const nh = img.height * ratio;
        const nx = (size - nw) / 2;
        const ny = (size - nh) / 2;
        ctx.drawImage(img, nx, ny, nw, nh);
        ctx.restore();

        // optional circular border: draw a faint ring
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, size / 2 - 2, 0, Math.PI * 2);
        ctx.lineWidth = 4;
        ctx.strokeStyle = 'rgba(255,255,255,0.05)';
        ctx.stroke();

        // toDataURL can throw if the canvas is tainted; catch and fallback
        let url;
        try {
          url = canvas.toDataURL('image/png');
          setFaviconLink(url, 'image/png');
          return;
        } catch (err) {
          // fallback to raw src
          console.warn('favicon canvas export failed, falling back to raw image', err);
          setFaviconLink(src, 'image/jpeg');
        }
      } catch (err) {
        console.error('favicon creation error', err);
        setFaviconLink(src, 'image/jpeg');
      }
    };
    img.onerror = () => setFaviconLink(src, 'image/jpeg');
  };

  makeCircularFavicon(photo);
} catch (e) {
  // if anything fails, fall back to the raw image
  try { setFaviconLink(photo, 'image/jpeg'); } catch (err) {}
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* ADD BrowserRouter with basename here */}
    <BrowserRouter basename="/portfolio/">
      <App />
    </BrowserRouter>
  </StrictMode>,
)
