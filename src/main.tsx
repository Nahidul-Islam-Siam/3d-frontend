import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from "@/components/theme-provider"
import { HelmetProvider } from 'react-helmet-async'
import { ReduxProvider } from '@/redux/provider/ReduxProvider'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReduxProvider>
      <HelmetProvider>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <App />
        </ThemeProvider>
      </HelmetProvider>
    </ReduxProvider>
  </React.StrictMode>,
)
