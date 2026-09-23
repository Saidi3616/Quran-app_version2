import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Only the Arabic part of the font: the UI itself uses the system font.
import '@fontsource/amiri-quran/arabic-400.css'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
