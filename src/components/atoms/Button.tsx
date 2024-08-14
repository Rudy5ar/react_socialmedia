import React from 'react';
import { useNavigate } from 'react-router-dom';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  color?: string;
  to?: string; 
};

export const Button: React.FC<ButtonProps> = ({ children, color, to}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
    }
  };

  return (
    <button
      className="button"
      style={{ backgroundColor: color}}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};
