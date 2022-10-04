import React from "react";

import "./_button.scss";

interface IButton {
  type?: "submit" | "button";
  onClick?: () => void;
  children?: React.ReactNode;
  className: any;
}
export const Button = ({ onClick, children, type, className }: IButton) => {
  return (
    <button type={type} className={`btn ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export const OutlineButton = ({ onClick, children, ...props }: IButton) => {
  return (
    <Button
      className={`btn-outline ${props.className}`}
      //   onClick={props.onClick ? () => props.onClick() : null}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default Button;
