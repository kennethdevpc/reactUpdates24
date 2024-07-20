import React from 'react';
import { useFormContext } from 'react-hook-form';

type Props = {
  name: string;
  children: React.ReactNode;
} & { id: string };

function Input({ name, children }: Props) {
  const { register } = useFormContext();
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {children}
      </label>
      <input {...register(`${name}`)} type="text" id={name} className="form-control" />
    </div>
  );
}

export default Input;
