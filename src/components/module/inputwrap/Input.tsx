import React from "react";
import style from "./input.module.css";

type PropsDTO = {
  title: string;
  placeholder: string;
  onChange: (value:string)=> void;
  value: string;
  type: string;
};
export default function Input({ title, placeholder, onChange, value, type }: PropsDTO) {
  return (
    <div className={style.inputWrap}>
      <label>{title}</label>
      <input
        type={type}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        value={value}
      />
    </div>
  );
}
