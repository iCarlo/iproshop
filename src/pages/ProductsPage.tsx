import {Col, Container, Row} from 'react-bootstrap';
import AppButton from '../components/AppButton';
import dummyProducts from '../seeders/productsSeeder';
import { useState } from 'react';
import { Product } from '../interfaces/products';
import ProductCard from '../components/ProductCard';

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>(dummyProducts);

  const updateProductHandler = (product: Product) => {
    setProducts(prev => prev.map(item => {
      if(item.id === product.id) {
        return product
      } else {
        return item
      }
    })      
    )
  }

  return (
    <Container className='d-flex flex-column justify-content-center'>
      <div className='my-5 text-center'>
        <h2 className='mb-3'>Shop Now, Gorgeous Look Later</h2>
        <p>We have a bunch of collection for you!, let’s go explore and find your dream fashion, make it happen.</p>

        <AppButton customClass='btn-md mt-3 text-secondary-yellow' text='Add new item' />
      </div>

      <Row>
        {products.filter(product => product.quantity > 0).map((product => (
          <Col className='d-flex justify-content-center mb-4'>
            <ProductCard product={product} updateProductHandler={updateProductHandler}/>
          </Col>
        )))}
      </Row>
    </Container>
  )
}

export default ProductsPage