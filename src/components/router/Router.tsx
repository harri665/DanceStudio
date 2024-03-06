import { Dialog } from '@headlessui/react';
import { lazy, Suspense, useState, useEffect, ReactElement } from 'react';
import { Outlet, RouteObject, useRoutes, BrowserRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { SignInButton } from '../domain/auth/SignInButton';
import ProtectedComponent from '../admin/admin';
import { auth } from '../root/Main';
import { User } from 'firebase/auth';
import Index from '~/components/screens/Index';
import { LoggedInError, AdminModal } from '../admin/AdminModal';
import { useNavigate } from 'react-router-dom';
import { SignOutButton } from '../domain/auth/SignOutButton';
import Modal from '../shared/Modal';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../Stripe/CheckoutForm';


const stripePromise = loadStripe('your_stripe_public_key_here');


const Loading = (): ReactElement => <p className="p-4 w-full h-full text-9xl font-rose text-center">Loading...</p>;

const IndexScreen = lazy(() => import('~/components/screens/Index'));
const Page404Screen = lazy(() => import('~/components/screens/404'));

function Layout() {
  return (
    <>
      <div>
        <nav className="p-4 flex items-center text-[4vw] sm:text-[1.5vw]">
          <Link
            to="/"
            className=" font-rose text-yellow-700 px-4 transition hover:text-yellow-600 rounded hover:shadow-[0_10px_30px_0px_rgba(0,0,0,.3)] hover:scale-90"
          >
            P. Christine
          </Link>
          <Link
            to="/about"
            className="font-rose text-yellow-700 px-4 transition hover:text-yellow-600 rounded hover:shadow-[0_10px_30px_0px_rgba(0,0,0,.3)] hover:scale-90"
          >
            About
          </Link>
          <Link
            to="/getstarted"
            className="font-rose text-yellow-700 px-4 transition hover:text-yellow-600 rounded hover:shadow-[0_10px_30px_0px_rgba(0,0,0,.3)] hover:scale-90"
          >
            Classes
          </Link>
        </nav>
        <Outlet />
      </div>
      <footer className="bg-white mt-12 pt-4 pb-4 shadow-inner">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap justify-between items-center">
            <div className="text-center md:text-left flex-1">
              <p className="text-gray-700">&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
            </div>
            <nav className="mt-4 md:mt-0 flex-1">
              <ul className="flex flex-wrap justify-center md:justify-end items-center gap-6">
                <li>
                  <a href="/" className="text-blue-600 hover:text-yellow-500 transition-colors duration-300">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/about" className="text-blue-600 hover:text-yellow-500 transition-colors duration-300">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-600 hover:text-yellow-500 transition-colors duration-300">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-600 hover:text-yellow-500 transition-colors duration-300">
                    Contact
                  </a>
                </li>
              </ul>
            </nav>
            <div className="mt-4 md:mt-0 flex-1">
              <div className="flex justify-center md:justify-end">
                <a href="#" className="mx-2 text-gray-700 hover:text-yellow-500 transition-colors duration-300">
                  <FaFacebook />
                </a>
                <a href="#" className="mx-2 text-gray-700 hover:text-yellow-500 transition-colors duration-300">
                  <FaInstagram />
                </a>
                <a href="#" className="mx-2 text-gray-700 hover:text-yellow-500 transition-colors duration-300">
                  <FaTwitter />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export const Router = (): ReactElement => {
  return (
    <BrowserRouter>
      <InnerRouter />
    </BrowserRouter>
  );
};

const InnerRouter = (): ReactElement => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoggedIn, SetIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // Check if the logged-in user's UID matches the specific UID you're looking for
        SetIsLoggedIn(true);
        const isAdminUser = user.uid === 'rjjKM9mOsyO0byNgmlZgd5lZV8W2'; // Replace "specific-user-uid" with the actual UID
        setIsAdmin(isAdminUser);
      } else {
        setIsAdmin(false);
      }
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const routes: RouteObject[] = [
    // Define your routes as before
    {
      path: '/admin',
      element: <Layout />,
      children: [
        {
          index: true,
          element: isAdmin ? (
            <>
              <ProtectedComponent />
            </>
          ) : isLoggedIn ? (
            <>
              <p>
                you are not logged in with a admin account if you think this is a mistake please contact Harrison if not
                please signout
              </p>
              <SignOutButton />
            </>
          ) : (
            <>
              <p>
                if your here by mistake do not login and continue back to the main site if your a admin please login
                with your admin gmail account to gain access to the dashboard
              </p>
              <SignInButton />
            </>
          ),
        },
        {
          path: '*',
          element: <Page404Screen />,
        },
      ],
    },
    {
      path: '/',
      element: isAdmin ? (
        <>
          {' '}
          <div className="flex items-center w-full bg-red-500">
            {' '}
            <p className="text-xl m-2 ml-5 bg-white px-5 py-2 rounded">Admin: </p> <ManageButton /> <SignOutButton />{' '}
          </div>
          <Layout />
        </>
      ) : (
        <Layout />
      ),
      children: [
        {
          index: true,
          element: isAdmin ? (
            <>
              <IndexScreen /> <AdminModal />{' '}
            </>
          ) : isLoggedIn ? (
            <>
              <LoggedInError />
              <IndexScreen />
            </>
          ) : (
            <IndexScreen />
          ),
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
          element: <></>,
        },
        {
          path: '*',
          element: <Page404Screen />,
        },
      ],
    },
    {
      path: '/about',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <></>,
        },
        {
          path: '*',
          element: <Page404Screen />,
        },
      ],
    },
    {
      path: '/checkout',
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <Elements stripe={stripePromise}>
              <CheckoutForm/>
            </Elements>
          ),
        },
        {
          path: '*',
          element: <Page404Screen />,
        },
      ],
    },
    // Other routes
  ];

  const element = useRoutes(routes);
  return (
    <div>
      <Suspense fallback={<Loading />}>{element}</Suspense>
    </div>
  );
};

// NAVIGATE TO ADMIN
const ManageButton: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/admin');
  };

  return (
    <button onClick={handleNavigate} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
      MANAGE
    </button>
  );
};

export default ManageButton;
