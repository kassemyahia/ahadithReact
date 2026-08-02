import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './styles/index.css'
import App from './App.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { QUERY_STALE_TIME } from './utils/constants.js'

function shouldRetry(failureCount, error) {
  const status = error?.response?.status
  if ([400, 401, 403, 404, 422].includes(status)) return false
  return failureCount < 1
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: shouldRetry,
      staleTime: QUERY_STALE_TIME,
      refetchOnWindowFocus: false,
    },
  },
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
