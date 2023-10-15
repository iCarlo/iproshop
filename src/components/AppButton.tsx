import React from "react";
import { Button } from "react-bootstrap";

interface AppButtonProps {
  customClass?: string;
  text: string;
  [x: string]: unknown;
}

const AppButton: React.FC<AppButtonProps> = ({
  customClass = "",
  text,
  ...props
}) => {
  return (
    <Button
      {...props}
      className={`btn-dark text-primary-yellow ${customClass}`}
    >
      {text}
    </Button>
  );
};

export default AppButton;
