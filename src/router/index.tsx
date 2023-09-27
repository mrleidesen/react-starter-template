import type { ReactNode } from 'react';

import { useQuery } from '@tanstack/react-query';
import React, { Suspense, lazy } from 'react';
import { useRoutes } from 'react-router-dom';

import { getUsers } from '@/api';
import HomeView from '@/views/HomeView';

const AboutView = lazy(() => import('@/views/AboutView'));
const TestView = lazy(() => import('@/views/TestView'));

const LazyContainer: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Suspense
      fallback={
        <div className="w-full h-screen flex justify-center items-center">
          Loading...
        </div>
      }
    >
      {children}
    </Suspense>
  );
};

const DynamicRoutes: { id: string; component: React.ReactNode }[] = [
  {
    id: '/views/AboutView',
    component: (
      <LazyContainer>
        <AboutView />
      </LazyContainer>
    ),
  },
  {
    id: '/views/TestView',
    component: (
      <LazyContainer>
        <TestView />
      </LazyContainer>
    ),
  },
];

export const idAndPath: Record<number, string> = {
  1: '/views/AboutView',
  2: '/views/TestView',
};

export const AppRouter = () => {
  const { data: users } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const result = await getUsers();

      return result
        .map((user) => {
          const path = idAndPath?.[user.id];

          return {
            ...user,
            path,
          };
        })
        .filter((user) => user?.path);
    },
    initialData: [],
  });

  const routes = useRoutes([
    {
      path: '/',
      element: <HomeView />,
    },
    ...users.map((user) => {
      return {
        path: user.path,
        element: DynamicRoutes.find((item) => item.id === user.path)
          ?.component ?? <div>404</div>,
      };
    }),
    {
      path: '*',
      element: (
        <div className="w-full h-screen flex justify-center items-center">
          Not Found 404
        </div>
      ),
    },
  ]);

  return routes;
};
