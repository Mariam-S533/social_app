import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "@fortawesome/fontawesome-free/css/all.min.css"
import './index.css'
import App from './App.jsx'
import PostContextProvider from './Context/PostContext'
import TokenContextProvider from './Context/TokenContext.jsx'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <PostContextProvider>
  <TokenContextProvider>
    <StrictMode>
    <App />
    </StrictMode>
    <Toaster position="top-right" reverseOrder={false}/>
  </TokenContextProvider>
  </PostContextProvider>
)
