import React, { useEffect, useState } from 'react';
import Mid from './Mid';
import Top from './Top';

const LeftTap = ({ SelectedValue }) => {
  const [resetDropdown, setResetDropdown] = useState(false);
  const [selectedDropdownValue1, setSelectedDropdownValue1] = useState(null);
  const [selectedDropdownValue2, setSelectedDropdownValue2] = useState(null);
  const [selectedLifestyleValue, setSelectedLifestyleValue] = useState(null);

  const handleResetDropdown = () => {
    setResetDropdown(true);
    setTimeout(() => {
      setResetDropdown(false);
    }, 0);
  };

  const selectDropdown = (v1, v2) => {
    setSelectedDropdownValue1(v1);
    setSelectedDropdownValue2(v2);
  };

  const selectLifestyle = (v) => {
    setSelectedLifestyleValue(v);
  };

  useEffect(() => {
    SelectedValue(selectedDropdownValue1, selectedDropdownValue2, selectedLifestyleValue);
  }, [selectedDropdownValue1, selectedDropdownValue2, selectedLifestyleValue, SelectedValue]);

  return (
    <div className="p-5">
      <Top resetDropdown={resetDropdown} onSelect={selectDropdown} />
      <Mid onResetDropdown={handleResetDropdown} onSelect={selectLifestyle} />
    </div>
  );
};

export default LeftTap;
