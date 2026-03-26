import React from 'react'

const Card = ({ children }) => {
  return (
    <div className="card bg-base-100 w-50 shadow-xl border-2 w-full">
      <div className="card-body">{children}</div>
    </div>
  );
};

export default Card;