// import viteLogo from '/vite.svg'
import { Outlet, RouterProvider, createBrowserRouter, useLocation, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import './styles/globals.scss';
import ProductsPage from './pages/ProductsPage';
import AddProductPage from './pages/AddProductPage';
import NotificationsSystem, {atalhoTheme, dismissNotification, dismissNotifications} from 'reapop'
import { useAppDispatch, useAppSelector } from './hooks/hooks';
import {setUpNotifications} from 'reapop'
import { useEffect } from 'react';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import { clearAuthError } from './redux/authReducer';

const Layout = () => {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  const currentUser = useAppSelector(state => state.shop.authState.currentUser);

  useEffect(()=> {
    if(currentUser && (pathname === "/register" || pathname === "/login")) {
      navigate('/')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, pathname])

  return (
    <>
      <NavBar />
      <Outlet />    
    </>
  );
}

const ProtectedPages = () => {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  const currentUser = useAppSelector(state => state.shop.authState.currentUser);
  
  
  useEffect(()=> {

    if(!currentUser && pathname !== '/register') {
      navigate('/login')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, pathname])

  return (<Outlet />)
}


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    children: [
      {
        path: '/',      
        element: <ProtectedPages />,
        children: [
          {
            path: '/',
            element: <ProductsPage />
          },
          {
            path: '/products',
            element: <ProductsPage />
          },
          {
            path: '/products/add-product',
            element: <AddProductPage />
          },
        ]
      },
      {
        path: '/register',
        element: <RegisterPage />
      },
      {
        path: '/login',
        element: <LoginPage />
      },
    ]
  },
])

function App() {

  const dispatch = useAppDispatch();
  const notifications = useAppSelector(state => state.shop.notifications);

  useEffect(() => {
    setUpNotifications({
      defaultProps: {
          position: 'top-right',
          dismissible: true,
          dismissAfter: 4000,
      } 
    })

    dispatch(clearAuthError())
    dispatch(dismissNotifications())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return (
    <div>
      <RouterProvider router={router} />
      <NotificationsSystem
        notifications={notifications}
        dismissNotification={(id) => dispatch(dismissNotification(id))}
        theme={atalhoTheme}
      />
    </div>
  )
}

export default App
