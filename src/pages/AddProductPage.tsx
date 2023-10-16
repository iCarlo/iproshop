import { Card, Col, Container, Form, Row } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form'
import '../styles/AddProductPage.scss'
import defaultImage from '/default-image2.svg';
import AppButton from '../components/AppButton'
import { ProductInput } from '../interfaces/products';
import TextInputField from '../components/TextInputField';
import QuantityInputField from '../components/QuantityInputField';
import { addProduct } from '../redux/productsReducer';
import { useAppDispatch } from '../hooks/hooks';
import { useState } from 'react';
import { notify } from 'reapop';
import { VALID_URL } from '../constants/constants';

const AddProductPage = () => {
  const dispatch = useAppDispatch();

  const {control, reset, register, handleSubmit, formState: {errors, isSubmitting}} = useForm<ProductInput>({ mode: "onChange", defaultValues: {
    name: "",
    imgUrl: "",
    quantity: 1,
  }});

  const [imageURL, setImageURL] = useState(defaultImage)

  const onSubmit = (input:ProductInput) => {

    dispatch(addProduct(input));
    resetForm()
    dispatch(notify('New Product Successfully added!', 'success'))
  }

  const resetForm = () => {
    setImageURL(defaultImage);
    reset();
  }

  return (
    <Container >
      <div className='my-5 text-center'>
        <h2 className='mb-3'>Add New Product</h2>
      </div>

      <Card className='mx-auto add-product-card p-2'>
        <Row>
          <Col md={4} >
            <div className='add-product-img-container'>
              <Card.Img  src={imageURL} onError={(e) => e.currentTarget.src = defaultImage} />
            </div>
          </Col>
          <Col md={8}>
            <Form id='addProductForm' onSubmit={handleSubmit(onSubmit)}>
              <TextInputField 
                name='name'
                label='Name'
                type='text'
                placeholder='Name'
                register={register}
                registerOptions={{required: "Required"}}
                error={errors.name}
              />

              <TextInputField 
                name='imgUrl'
                label='Image URL'
                type='text'
                placeholder='Image URL'
                register={register}
                registerOptions={{
                  required: "Required", 
                  pattern: {value: new RegExp(VALID_URL), message: "Invalid Image URL"
                }}}
                error={errors.imgUrl}
                onChange={(e:React.ChangeEvent<HTMLInputElement>) => setImageURL(e.target.value)}
              />

              <Controller
                control={control}
                name="quantity"
                rules={{
                  min: {
                    value: 1,
                    message: 'Min Quantity must be 1'
                  },
                }}
                render={({ field: { onChange, value} }) => (
                  <QuantityInputField
                      onChange={onChange}
                      value={value}
                      error={errors.quantity}
                  />
                )}
              />
            </Form>
          </Col>
        </Row>
        
        <div className='d-flex justify-content-end gap-2 form-btns'>
          <AppButton
            disabled={isSubmitting} 
            customClass='btn-sm' 
            text='Reset'
            onClick={() => resetForm()}
          />
          <AppButton  
            type='submit'
            form='addProductForm'
            disabled={isSubmitting} 
            customClass='btn-sm text-light' 
            text='Submit'
          />
        </div>
        
      </Card>
    </Container>
  )
}

export default AddProductPage