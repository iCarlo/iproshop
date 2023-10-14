import React, { useState } from 'react'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { QuantityActionEnum } from '../constants/constants';
import { FieldError } from 'react-hook-form';

interface QuantityInputFieldProps {
  value: number,
  onChange: (quantity: number) => void;
  error?: FieldError,
}

const QuantityInputField: React.FC<QuantityInputFieldProps> = ({value, onChange, error}) => {
  const [quantity, setQuantity] = useState(value || 0)

  const incrementDecrementHandler = (actionType: QuantityActionEnum) =>{
    switch (actionType) {
      case QuantityActionEnum.INCREMENT:
        setQuantity(quantity + 1)
        onChange(quantity + 1)
        break;
      
      case QuantityActionEnum.DECREMENT:
        setQuantity(quantity > 0 ? quantity - 1: quantity)  
        onChange(quantity > 0 ? quantity - 1: quantity)  
        break;

      default:
        break;
    }
  }

  return (
    <>
      <div className='quantity-field'>
        <span>Quantity:</span>
        <AddCircleIcon className='text-primary-yellow' onClick={() => incrementDecrementHandler(QuantityActionEnum.INCREMENT)} />
        <span className='value' style={error?.message ? {border: '1px solid var(--bs-danger)'} : {}}>{quantity}</span>
        <RemoveCircleIcon className='text-primary-yellow'onClick={() => incrementDecrementHandler(QuantityActionEnum.DECREMENT)}/>
        
      </div>
      {error?.message && <p className='text-danger fs-6'>{error.message}</p>}
    </>
  )
}

export default QuantityInputField