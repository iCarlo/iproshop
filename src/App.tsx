// import viteLogo from '/vite.svg'
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import NavBar from './components/NavBar';
import './styles/globals.scss';
import ProductsPage from './pages/ProductsPage';

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
    ]
  },

])

function App() {

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
