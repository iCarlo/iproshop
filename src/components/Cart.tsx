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
  const currentUserId = useAppSelector(state => state.shop.authState.currentUser?.id);
  const cartItems = useAppSelector(state => state.shop.cartState.cart);

  const currentUserCart = cartItems.find(cartItem => cartItem.userId === currentUserId);


  const removeItemHandler = (id: number) => {
    dispatch(removeItem({
      userId: currentUserId,
      itemId: id
    }))
  }


  return (
    <Modal show fullscreen='sm-down' onHide={onDismiss} className='cart-modal'>
      <Modal.Header closeButton>
        <Modal.Title>Your Cart</Modal.Title>
      </Modal.Header>

      <Modal.Body>

        {!currentUserCart || currentUserCart?.items.length === 0 
        ?  <p className='empty-text'>Cart is empty.</p>
       : currentUserCart?.items.map((item) => (
          <div key={item.id} className="item">
            <img src={item.imgUrl} alt="" />
            <div className="details">
              <h1>{item.name}</h1>
              <div className="qty"><span>Quantity:</span>{item.quantity}</div>
            </div>
            <DeleteOutlinedIcon className='delete' onClick={()=> removeItemHandler(item.id)} />
          </div>
        ))
        }
      </Modal.Body>

      <Modal.Footer>
        <AppButton text='Reset' onClick={()=> dispatch(resetCart({userId: currentUserId}))} />
        <AppButton text='Checkout' />
      </Modal.Footer>
    </Modal>
  )
}

export default Cart