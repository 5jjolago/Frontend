import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCognito } from '../context/CognitoProvider';


function LogoutButton() {
    const { logout } = useCognito();
    
  return (
    <button onClick={logout}>
      로그아웃
    </button>
  )
}

export default LogoutButton
