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
           <div className="text-center mb-4">
           <div className="flex justify-center space-x-4">
             <Link to="/login" className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white py-1 px-2 rounded">
               <div className="flex items-center">
                 <div>로그인</div>
               </div>
             </Link>
             <Link to="/signup" className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white py-1 px-2 rounded">
               <div className="flex items-center">
                 <div>회원가입</div>
               </div>
             </Link>
           </div>
         </div>
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
