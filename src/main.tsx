import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// StrictMode é incompatível com Phaser: monta/desmonta 2x em dev e destrói o canvas
createRoot(document.getElementById('root')!).render(<App />)
