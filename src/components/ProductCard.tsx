import React from 'react'
import { Product } from '../interfaces/products'
import { Card } from 'react-bootstrap'
import '../styles/ProductCard.scss';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AppButton from './AppButton';
import { QuantityActionEnum } from '../constants/constants';

interface ProductCardProps {
  product: Product,
  updateProductHandler: (product: Product) => void
}

const ProductCard: React.FC<ProductCardProps> = ({product, updateProductHandler}) => {
  const {name, imgUrl, quantity} = product;

  const incrementDecrementHandler = (actionType: QuantityActionEnum) =>{
    switch (actionType) {
      case QuantityActionEnum.INCREMENT:
        updateProductHandler({
          ...product,
          quantity: quantity + 1
        })  
        break;
      
      case QuantityActionEnum.DECREMENT:
        updateProductHandler({
          ...product,
          quantity: quantity > 0 ? quantity - 1: quantity
        })  
        break;

      default:
        break;
    }
  }

  return (
    <Card className='product-card'>
      <Card.Img variant="top" src={imgUrl} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <div className="quantity">
          <span>Quantity:</span>
          <AddCircleIcon className='text-primary-yellow' onClick={() => incrementDecrementHandler(QuantityActionEnum.INCREMENT)} />
          <span className='value'>{quantity}</span>
          <RemoveCircleIcon className='text-primary-yellow'onClick={() => incrementDecrementHandler(QuantityActionEnum.DECREMENT)}/>
        </div>
        <div className='mx-auto'>
          <AppButton customClass='btn-md text-secondary-yellow' text='Add to cart' />
        </div>
      </Card.Body>
    </Card>
  )
}

export default ProductCard