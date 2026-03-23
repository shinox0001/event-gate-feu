import React from 'react';

const Input = ( { label, type, placeholder, name } ) => {
  return (
   <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-2">
  <legend className="fieldset-legend">{label}</legend>
  <input 
  name={name} 
  type={type} 
  className="Input" 
  placeholder={placeholder} 
  />
</fieldset>
  );
};

export default Input;