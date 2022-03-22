import React, { FC, ChangeEvent } from 'react';
import cn from 'classnames';
import classes from './styles.module.scss';

interface IProps {
  label: string;
  isChecked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export const Checkbox: FC<IProps> = ({ label, isChecked, onChange, className }) => {
  return (
    <label className={cn(classes.wrap, className)}>
      <span className={classes.label}>{label}</span>
      <input type="checkbox" checked={isChecked} onChange={onChange} className={classes.input} />
    </label>
  );
};
