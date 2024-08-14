import React from 'react';
import { useNavigate } from 'react-router-dom';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  color?: string;
  to?: string; 
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export const Button: React.FC<ButtonProps> = ({ children, color, to, onClick}) => {
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (to) {
      navigate(to);
    }
    if (onClick) {
      onClick(event); 
    }
  };

  return (
    <button
      className="button"
      style={{ backgroundColor: color }}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};
