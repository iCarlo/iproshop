// import viteLogo from '/vite.svg'
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import NavBar from './components/NavBar';
import './styles/globals.scss';
import ProductsPage from './pages/ProductsPage';
import AddProductPage from './pages/AddProductPage';

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

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
