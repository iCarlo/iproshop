import React from 'react'
import { Product } from '../interfaces/products'
import { Card } from 'react-bootstrap'
import '../styles/ProductCard.scss';
import AppButton from './AppButton';
import QuantityInputField from './QuantityInputField';
import { useAppDispatch } from '../hooks/hooks';
import { addToCart } from '../redux/cartReducer';
import { notify } from 'reapop';


interface ProductCardProps {
  product: Product,
  updateProductHandler: (product: Product) => void
}

const ProductCard: React.FC<ProductCardProps> = ({product, updateProductHandler}) => {
  const {name, imgUrl, quantity} = product;

  const dispatch = useAppDispatch();

  const onChangeHandler = (quantity: number) =>{
    updateProductHandler({
      ...product,
      quantity: quantity
    })  
  }

  const addToCartHandler = () => {
     dispatch(addToCart(product));
     dispatch(notify(`${product.name} Successfully added to cart!`, 'success'))
   }

  return (
    <Card className='product-card'>
      <Card.Img variant="top" src={imgUrl} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <QuantityInputField onChange={onChangeHandler} value={quantity} />
        <div className='mx-auto'>
          <AppButton customClass='btn-md text-secondary-yellow' text='Add to cart' onClick={() => addToCartHandler()} />
        </div>
      </Card.Body>
    </Card>
  )
}

export default ProductCard