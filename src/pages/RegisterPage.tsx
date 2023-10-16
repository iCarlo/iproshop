import { Card, Container, Form } from 'react-bootstrap'
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { useForm } from 'react-hook-form';
import { RegisterUserInput } from '../interfaces/user';
import AppButton from '../components/AppButton';
import { registerUser } from '../redux/authReducer';
import { notify } from 'reapop';
import TextInputField from '../components/TextInputField';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { VALID_EMAIL } from '../constants/constants';

const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authErrorMsg = useAppSelector(state => state.shop.authState.error);

  const {reset, register, handleSubmit, formState: {errors, isSubmitting, isSubmitted, isValid}} = useForm<RegisterUserInput>({ mode: "onChange", defaultValues: {
    username: "",
    email: "",
    password: ""
  }});

  const onSubmit = (input:RegisterUserInput) => {

    dispatch(registerUser(input));
  }

  useEffect(() => {
    if(isValid && isSubmitted) {
      if(authErrorMsg) {
        dispatch(notify(authErrorMsg, 'error'))
        reset({}, {keepValues: true, keepErrors: true})
      } else {
        reset()
        dispatch(notify('You have successfully register!', 'success'))
        navigate("/")
      }
    }
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authErrorMsg, isValid, isSubmitted])
  

  return (
    <Container className=''>
      <div className='my-5 text-center'>
        <h2 className='mb-3'>Create New Account</h2>
      </div>

      <Card  className='p-3 mx-auto' style={{maxWidth: '40rem'}}>
        <Form id='registerUserForm' onSubmit={handleSubmit(onSubmit)}>
          <TextInputField 
            name='username'
            label='Username'
            type='text'
            placeholder='Username'
            register={register}
            registerOptions={{required: "Required"}}
            error={errors.username}
          />

          <TextInputField 
            name='email'
            label='Email'
            type='email'
            placeholder='Email'
            register={register}
            registerOptions={{
              required: "Required",
              pattern: {
                value: new RegExp(VALID_EMAIL),
                message: 'Invalid email',
              }
            }}
            error={errors.email}
          />

          <TextInputField 
            name='password'
            label='Password'
            type='password'
            placeholder='Password'
            register={register}
            registerOptions={{required: "Required", minLength : {value: 6, message: "Minimum length is 6"}}}
            error={errors.password}
          />
        </Form>

        <div className='d-flex justify-content-end gap-2 form-btns'>
          <AppButton
            disabled={isSubmitting} 
            customClass='btn-sm' 
            text='Reset'
            onClick={() => reset()}
          />
          <AppButton  
            type='submit'
            form='registerUserForm'
            disabled={isSubmitting} 
            customClass='btn-sm text-light' 
            text='Submit'
          />
        </div>
      </Card>

      
    </Container>
  )
}

export default RegisterPage