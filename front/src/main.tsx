import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {
  QueryClientProvider,
  QueryClient
} from 'react-query'
import { Toaster } from 'react-hot-toast'
const queryClient = new QueryClient()


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
)
