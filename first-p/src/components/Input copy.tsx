import React from 'react';
import { FieldErrors, useFormContext } from 'react-hook-form';
import { contact } from '../schemas/contact';

type Props = {
  name: string;
  children: React.ReactNode;
  errors: FieldErrors<contact>;
};

function Input({ name, children, errors }: Props) {
  const { register } = useFormContext();
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {children}
      </label>
      <input {...register(`${name}`)} type="text" id={name} className="form-control" />
      {errors?.name?.message ?? <p>{errors?.name?.message}</p>}
    </div>
  );
}

export default Input;
