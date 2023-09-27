import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

import { Helmet } from './components/Helmet';
import { AppRouter } from './router';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
    },
  },
});

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Helmet />
      <AppRouter />
    </QueryClientProvider>
  );
};

export default App;
