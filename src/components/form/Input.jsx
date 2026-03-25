import React from 'react';

const Input = ({ label, type, placeholder, name, defaultValue }) => {
  return (
    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-2">
      <legend className="fieldset-legend">{label}</legend>
      <input
        name={name}
        type={type}
        className="input input-bordered w-full"
        placeholder={placeholder}
        defaultValue={defaultValue}
      />
    </fieldset>
  );
};

export default Input;