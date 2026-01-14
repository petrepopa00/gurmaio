import { useEffect, useState } from 'react';
import App from './App';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { SupabaseDebugPage } from './pages/SupabaseDebugPage';

export function Router() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // If someone opens Spark auth URLs (e.g. '/.spark/login') on a normal SPA deploy
  // we redirect back to the app root to avoid a platform-level 404 deep-link.
  if (currentPath.startsWith('/.spark/')) {
    window.history.replaceState({}, '', '/');
    return <App />;
  }

  if (currentPath === '/privacy') {
    return <PrivacyPage />;
  }

  if (currentPath === '/terms') {
    return <TermsPage />;
  }

  if (currentPath === '/debug/supabase') {
    return <SupabaseDebugPage />;
  }

  return <App />;
}
