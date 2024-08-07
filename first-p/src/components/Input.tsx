import React from 'react';
import { useFormContext } from 'react-hook-form';

type Props = {
  name: string;
  children: React.ReactNode;
};

function Input({ name, children }: Props) {
  const { register, formState, getFieldState } = useFormContext();
  const { error } = getFieldState(name, formState);

  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {children}
      </label>
      <input {...register(`${name}`)} type="text" id={name} className="form-control" />
      {error?.message && <p className="text-danger">{error.message}</p>}
    </div>
  );
}

export default Input;
