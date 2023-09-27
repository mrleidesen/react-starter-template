import type { ReactNode } from 'react';

import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  useRouteError,
} from 'react-router-dom';

import HomeView from '@/views/HomeView';
import LoginView from '@/views/LoginView';

const FullCenterTip = ({ children }: { children?: ReactNode }) => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      {children}
    </div>
  );
};

const ErrorBoundary = () => {
  const error: any = useRouteError();

  console.error(error);

  return (
    <FullCenterTip>
      <div>Path: {window.location.href}</div>
      <div>{String(error?.message)}</div>
    </FullCenterTip>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<HomeView />} errorElement={<ErrorBoundary />} />
      <Route path="/login" element={<LoginView />}></Route>
      <Route path="*" element={<Navigate to="/" />} />
    </>
  )
);

export const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};
