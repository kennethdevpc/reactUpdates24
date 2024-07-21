import React from 'react';

type Props = {
  options: readonly string[];
  defaultMessage: string;
  label: string;
};

function Select({ options, defaultMessage, label }: Props) {
  return (
    <div>
      <label htmlFor="form-label">{label}</label>

      <select className="form-select" aria-label="Default select example">
        <option>{defaultMessage}</option>
        {options.map((o) => {
          return (
            <option key={o} value={o}>
              {o}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default Select;
