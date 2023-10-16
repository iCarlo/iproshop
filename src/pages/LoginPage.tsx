import { Card, Container, Form } from 'react-bootstrap'
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { useForm } from 'react-hook-form';
import { LoginUserInput } from '../interfaces/user';
import AppButton from '../components/AppButton';
import { loginUser } from '../redux/authReducer';
import TextInputField from '../components/TextInputField';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { notify } from 'reapop';

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authErrorMsg = useAppSelector(state => state.shop.authState.error);

  const {reset, register, handleSubmit, formState: {errors, isSubmitting, isSubmitted, isValid}} = useForm<LoginUserInput>({ defaultValues: {
    username: "",
    password: ""
  }});

  const onSubmit = (input:LoginUserInput) => {
    dispatch(loginUser(input));
  }

  useEffect(() => {
    if(isValid && isSubmitted) {
      if(authErrorMsg) {
        dispatch(notify(authErrorMsg, 'error'))
        reset({}, {keepValues: true, keepErrors: true})
      } else {
        reset()
        dispatch(notify('Login successful', 'success'))
        navigate("/")
      }
    } else {
      reset({}, {keepValues: true, keepErrors: true})
    }
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authErrorMsg, isValid, isSubmitted])


  useEffect(() => {


  }, [errors])

  return (
    <Container className=''>
      <div className='my-5 text-center'>
        <h2 className='mb-3'>Login User</h2>
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
            name='password'
            label='Password'
            type='password'
            placeholder='Password'
            register={register}
            registerOptions={{required: "Required", minLength : {value: 6, message: "Minimum length is 6"}}}
            error={errors.password}
          />
        </Form>

        <p>Don't have an account? <Link to="/register">Register</Link></p>

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
            text='Login'
          />
        </div>
      </Card>

      
    </Container>
  )
}

export default LoginPage