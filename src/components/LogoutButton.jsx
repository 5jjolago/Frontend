import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { resetSignUpState, signUpState } from '../recoil/RecoilState';
import { useCognito } from '../context/CognitoProvider';

function LogoutButton() {
    const { logout } = useCognito();
    const [signUpInfo, setSignUpInfo] = useRecoilState(signUpState);
    const navigation = useNavigate();

    const handleLogout = async () => {
      await logout(); // 로그아웃 함수가 비동기일 경우 await를 사용하여 완료될 때까지 기다립니다.
      navigation("/"); // 로그아웃 후 홈 페이지로 이동합니다.
      window.location.reload(); // 페이지를 새로고침합니다.
  };


    return (
        <div className="text-center mb-4 ml-4">
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleLogout}
              className="border border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white py-1 px-2 rounded shadow"
            >
              로그아웃
            </button>
          </div>
        </div>
    );
}

export default LogoutButton;
