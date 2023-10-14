import {Col, Container, Row} from 'react-bootstrap';
import AppButton from '../components/AppButton';
import { Product } from '../interfaces/products';
import ProductCard from '../components/ProductCard';
import { updateProduct } from '../redux/productsReducer';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { Link } from 'react-router-dom';

const ProductsPage = () => {
  const dispatch = useAppDispatch();
  
 const products = useAppSelector((state) => state.shop.products)

  const updateProductHandler = (product: Product) => {
    dispatch(updateProduct(product))    
    
  }

  return (
    <Container className='d-flex flex-column justify-content-center'>
      <div className='my-5 text-center'>
        <h2 className='mb-3'>Shop Now, Gorgeous Look Later</h2>
        <p>We have a bunch of collection for you!, let’s go explore and find your dream fashion, make it happen.</p>

        <AppButton as={Link} to="/products/add-product" customClass='btn-md mt-3 text-secondary-yellow' text='Add new item' />
      </div>

      <Row>
        {products.filter(product => product.quantity > 0).map((product => (
          <Col key={product.id} className='d-flex justify-content-center mb-4'>
            <ProductCard product={product} updateProductHandler={updateProductHandler}/>
          </Col>
        )))}
      </Row>
    </Container>
  )
}

export default ProductsPage