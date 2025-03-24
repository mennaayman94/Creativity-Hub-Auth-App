import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { App as AntApp } from 'antd';

import { BrowserRouter, Route, Routes } from 'react-router'
import SignIn from './pages/signin/index.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import WelcomePage from './pages/welcomepage/index.tsx';
const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <QueryClientProvider client={queryClient}>
    <BrowserRouter>
    <AntApp>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/register" element={<SignIn />} />
      <Route path="/profile" element={<WelcomePage />} />
    </Routes>
    </AntApp>
  </BrowserRouter>
  </QueryClientProvider>
  </StrictMode>,
)
