import React from 'react'
import { Product } from '../interfaces/products'
import { Card } from 'react-bootstrap'
import '../styles/ProductCard.scss';
import AppButton from './AppButton';
import QuantityInputField from './QuantityInputField';


interface ProductCardProps {
  product: Product,
  updateProductHandler: (product: Product) => void
}

const ProductCard: React.FC<ProductCardProps> = ({product, updateProductHandler}) => {
  const {name, imgUrl, quantity} = product;

  const onChangeHandler = (quantity: number) =>{
    updateProductHandler({
      ...product,
      quantity: quantity
    })  
  }

  return (
    <Card className='product-card'>
      <Card.Img variant="top" src={imgUrl} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <QuantityInputField onChange={onChangeHandler} value={quantity} />
        <div className='mx-auto'>
          <AppButton customClass='btn-md text-secondary-yellow' text='Add to cart' />
        </div>
      </Card.Body>
    </Card>
  )
}

export default ProductCard