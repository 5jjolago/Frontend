import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { signUpState, useSignUpStateLogger } from "../recoil/RecoilState"; // Recoil 상태 import

import Mid from "./Mid";
import Top from "./Top";

const LeftTap = () => {
  const [resetDropdown, setResetDropdown] = useState(false);
  const [selectedLifestyleValue, setSelectedLifestyleValue] = useState(null);
  const [selectedDropdownValue1, setSelectedDropdownValue1] = useState(null);
  const [selectedDropdownValue2, setSelectedDropdownValue2] =
    useRecoilState(signUpState);

  useSignUpStateLogger();

  const handleResetDropdown = () => {
    setResetDropdown(true);
    setTimeout(() => {
      setResetDropdown(false);
    }, 0);
  };

  const selectDropdown = (v1, v2) => {
    setSelectedDropdownValue1(v1);
    setSelectedDropdownValue2({ ...selectedDropdownValue2, neighborhood: v2 }); // signUpState의 neighborhood 필드를 업데이트
  };

  const selectLifestyle = (v) => {
    setSelectedLifestyleValue(v);
  };

  return (
    <div className="p-5" style={{ height: "100%", overflow: "scroll" }}>
      <Top resetDropdown={resetDropdown} onSelect={selectDropdown} />
      <Mid onResetDropdown={handleResetDropdown} onSelect={selectLifestyle} />
    </div>
  );
};

export default LeftTap;
