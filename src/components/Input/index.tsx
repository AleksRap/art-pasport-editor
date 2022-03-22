import React, { FC, ChangeEvent } from 'react';
import cn from 'classnames';
import classes from './styles.module.scss';

interface IProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export const Input: FC<IProps> = ({ label, placeholder, value, onChange, className }) => {
  return (
    <label className={cn(classes.wrap, className)}>
      <span className={classes.label}>{label}</span>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={classes.input}
      />
    </label>
  );
};
