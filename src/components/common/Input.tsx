import React from "react";

import "./_input.scss";

interface IProps {
  name?: string;
  label?: string;
  value: string | number;
  placeholder: string;
  required?: boolean;
  field?: any;
  form?: any;
  type: string;
  maxLength?: number;
  onChange: any;
}

const Input = (props: IProps) => {
  return (
    <input
      type={props.type}
      placeholder={props.placeholder}
      value={props.value}
      onChange={(e) => props.onChange(e)}
    />
  );
};

export default Input;
