import React from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export const TestUI: React.FC<{
  title: string;
}> = ({ title }) => {
  return <div className="text-[22px] text-red-500">{title}</div>;
};

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TestUI title="Testing!" />
    </QueryClientProvider>
  );
};

export default App;
