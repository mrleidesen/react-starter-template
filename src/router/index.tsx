import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useRoutes } from 'react-router-dom';

import { getUsers } from '@/api';
import AboutView from '@/views/AboutView';
import HomeView from '@/views/HomeView';
import TestView from '@/views/TestView';

export const DynamicRoutes: { id: string; component: React.ReactNode }[] = [
  {
    id: '/views/AboutView',
    component: <AboutView />,
  },
  {
    id: '/views/TestView',
    component: <TestView />,
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
  ]);

  return routes;
};
