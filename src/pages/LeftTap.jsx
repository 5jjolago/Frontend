import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { selectedDropdownValue1State, selectedDropdownValue2State } from '../RecoilState'; // Recoil 상태 import

import Mid from './Mid';
import Top from './Top';

const LeftTap = ({ SelectedValue }) => {
  const [resetDropdown, setResetDropdown] = useState(false);
  const [selectedLifestyleValue, setSelectedLifestyleValue] = useState(null);
  const [selectedDropdownValue1, setSelectedDropdownValue1] = useRecoilState(selectedDropdownValue1State); // Recoil 상태 사용
  const [selectedDropdownValue2, setSelectedDropdownValue2] = useRecoilState(selectedDropdownValue2State); // Recoil 상태 사용

  const handleResetDropdown = () => {
    setResetDropdown(true);
    setTimeout(() => {
      setResetDropdown(false);
    }, 0);
  };

  const selectDropdown = (v1, v2) => {
    setSelectedDropdownValue1(v1); // Recoil 상태 업데이트
    setSelectedDropdownValue2(v2); // Recoil 상태 업데이트
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
