import React from 'react'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import AppButton from './AppButton'
import '../styles/Cart.scss'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { removeItem, resetCart } from '../redux/cartReducer';
import { Modal } from 'react-bootstrap';

interface CartProps {
  onDismiss: () => void,
}

const Cart: React.FC<CartProps> = ({onDismiss}) => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(state => state.shop.cartState.cart);

  return (
    <Modal show fullscreen='sm-down' onHide={onDismiss} className='cart-modal'>
      <Modal.Header closeButton>
        <Modal.Title>Your Cart</Modal.Title>
      </Modal.Header>

      <Modal.Body>

        {cartItems.length === 0 
        ?  <p className='empty-text'>Cart is empty.</p>
       : cartItems.map((item) => (
          <div key={item.id} className="item">
            <img src={item.imgUrl} alt="" />
            <div className="details">
              <h1>{item.name}</h1>
              <div className="qty"><span>Quantity:</span>{item.quantity}</div>
            </div>
            <DeleteOutlinedIcon className='delete' onClick={()=> dispatch(removeItem({id: item.id}))} />
          </div>
        ))
        }
      </Modal.Body>

      <Modal.Footer>
        <AppButton text='Reset' onClick={()=> dispatch(resetCart())} />
        <AppButton text='Checkout' />
      </Modal.Footer>
    </Modal>
  )
}

export default Cart