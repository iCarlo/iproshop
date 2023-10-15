// import viteLogo from '/vite.svg'
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import NavBar from './components/NavBar';
import './styles/globals.scss';
import ProductsPage from './pages/ProductsPage';
import AddProductPage from './pages/AddProductPage';
import NotificationsSystem, {atalhoTheme, dismissNotification} from 'reapop'
import { useAppDispatch, useAppSelector } from './hooks/hooks';
import {setUpNotifications} from 'reapop'
import { useEffect } from 'react';

const Layout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
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
