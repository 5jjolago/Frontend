import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { resetSignUpState } from '../recoil/RecoilState';
import { useCognito } from '../context/CognitoProvider';


function LogoutButton() {
    const { logout } = useCognito();
    const [signUpInfo, setSignUpInfo] = useRecoilState(signUpState);
  return (
    <button onClick={() => {
      setSignUpInfo(resetSignUpState());
      logout
    }}>
      로그아웃
    </button>
  )
}

export default LogoutButton
