import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const DashBoard = lazy(() => import('../pages/DashBoard'));

export default function RoutesProvider() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <DashBoard />,
      errorElement: <DashBoard />,
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}
