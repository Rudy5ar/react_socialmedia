type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
    color?: string;
  };

export const Button: React.FC<ButtonProps> = ({ children, color}) => (
    <button className="button" style={{ color: color }}>
      {children}
    </button>
  );