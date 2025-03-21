import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import DashBoard from '../pages/DashBoard';

export default function RoutesProvider() {
  const router = createBrowserRouter(
    [
      {
        path: '/',
        element: <DashBoard />,
        errorElement: <DashBoard />,
      },
    ],
    {
      basename: `${import.meta.env.VITE_BASE}`,
    }
  );

  return <RouterProvider router={router}></RouterProvider>;
}
