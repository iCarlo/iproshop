import React from 'react'
import { Button } from 'react-bootstrap';

interface AppButtonProps {
  customClass?: string,
  text: string,
}

const AppButton: React.FC<AppButtonProps> = ({customClass = "", text}) => {
  return (
    <Button className={`btn-primary-blue btn-lg text-primary-yellow ${customClass}`}>{text}</Button>
  )
}

export default AppButton