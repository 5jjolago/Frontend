import React, { useState } from 'react';
import Mid from './Mid';
import Top from './Top';

const LeftTap = () => {
  const [resetDropdown, setResetDropdown] = useState(false);

  const handleResetDropdown = () => {
    setResetDropdown(true);
    setTimeout(() => {
      setResetDropdown(false);
    }, 0);
  };

  return (
    <div className="p-5">
      <Top resetDropdown={resetDropdown} />
      <Mid onResetDropdown={handleResetDropdown} />
    </div>
  );
};

export default LeftTap;
