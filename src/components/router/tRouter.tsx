import { Dialog } from '@headlessui/react';
import { lazy, Suspense, useState } from 'react';
import { Outlet, RouteObject, useRoutes, BrowserRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Home from '../Stripe';
import { SignInButton } from '../domain/auth/SignInButton';
import ProtectedComponent from '../admin/admin';


const Loading = () => <p className="p-4 w-full h-full text-9xl font-rose text-center">Loading...</p>;

const IndexScreen = lazy(() => import('~/components/screens/Index'));
const Page404Screen = lazy(() => import('~/components/screens/404'));

function Layout() {
  return (
    <div>
      <nav className="p-4 flex items-center text-[4vw] sm:text-[1.5vw]">
        <Link to="/" className=" font-rose text-yellow-700 px-4 transition hover:text-yellow-600 rounded hover:shadow-[0_10px_30px_0px_rgba(0,0,0,.3)] hover:scale-90">P. Christine</Link>
        <Link to="/" className="font-rose text-yellow-700 px-4 transition hover:text-yellow-600 rounded hover:shadow-[0_10px_30px_0px_rgba(0,0,0,.3)] hover:scale-90">About</Link>
        <Link to="/getstarted" className="font-rose text-yellow-700 px-4 transition hover:text-yellow-600 rounded hover:shadow-[0_10px_30px_0px_rgba(0,0,0,.3)] hover:scale-90">Classes</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export const Router = () => {
  return (
    <BrowserRouter>
      <InnerRouter />
    </BrowserRouter>
  );
};

const InnerRouter = () => {
  const routes: RouteObject[] = [
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <IndexScreen />,
        },
        {
          path: '*',
          element: <Page404Screen />,
        },
      ],
    },
    {
      path: '/getstarted',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: '*',
          element: <Page404Screen />,
        },
      ],
    },
    {
      path: '/admin',
      element: <Layout/>,
      children: [
        {
          index: true,
          element: <ProtectedComponent />,
        },
        {
          path: '*',
          element: <Page404Screen />,
        },
      ],
    },
  ];
  const element = useRoutes(routes);
  return (
    <div>
      <Suspense fallback={<Loading />}>{element}</Suspense>
    </div>
  );
};
