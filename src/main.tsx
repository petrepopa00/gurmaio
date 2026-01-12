import { createRoot } from 'react-dom/client'
import { ErrorBoundary } from "react-error-boundary";
import "@github/spark/spark"

import { Router } from './Router.tsx'
import { ErrorFallback } from './ErrorFallback.tsx'
import { AuthProvider } from './contexts/AuthContext.tsx'

import "./main.css"
import "./styles/theme.css"
import "./index.css"

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <AuthProvider>
      <Router />
    </AuthProvider>
   </ErrorBoundary>
)
