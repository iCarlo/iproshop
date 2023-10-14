import React from 'react'
import { Form } from 'react-bootstrap'
import {UseFormRegister, RegisterOptions, FieldError} from 'react-hook-form'

interface TextInputFieldProps {
  name: string,
  label: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>,
  registerOptions?: RegisterOptions,
  error?: FieldError,
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
  [x:string]: unknown,
}

const TextInputField: React.FC<TextInputFieldProps> = ({
  name,
  label,
  register,
  registerOptions,
  error,
  onChange,
  ...props
}) => {
  return (
    <Form.Group className='mb-3' controlId={name + "-input"}> 
      <Form.Label>{label}</Form.Label>
      <Form.Control 
        {...props}
        {...register(name, registerOptions)}
        isInvalid={!!error}
        onChange={onChange}
      />

      <Form.Control.Feedback type='invalid'>
        {error?.message}
      </Form.Control.Feedback>
    </Form.Group>
  )
}

export default TextInputField