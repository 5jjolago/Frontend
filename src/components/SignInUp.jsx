import React from 'react'
import { useCognito } from '../context/CognitoProvider'
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';

function SignInUp(cognitoInfo) {
    const { isLoggedIn } = useCognito();
    console.log(isLoggedIn)
    console.log(cognitoInfo.cognitoInfo);
  return (
    <div>
        {!isLoggedIn ? (
              <p>
                Please <Link to="/login">Login</Link> or{" "}
                <Link to="/signup">Sign Up</Link>
              </p>
            ) : (
              <div>
                <p>
                  {cognitoInfo.cognitoInfo.name}님 <Link to="/bookmark">마이페이지</Link> 
                </p>
                <LogoutButton />
              </div>
            )}
    </div>
  )
}

export default SignInUp
