import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import DashBoard from '../pages/DashBoard';

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
