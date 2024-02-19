import React from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import { useCognito } from '../context/CognitoProvider';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { COGNITO_API } from '../config';
import BookmarkButton from './BookmarkButton';

function SignInUp() {
    const { getSession } = useCognito();
    const userPool = new CognitoUserPool({
        UserPoolId: COGNITO_API.userPoolId || "",
        ClientId: COGNITO_API.clientId || "",
    });
    const cognitoUser = userPool.getCurrentUser();
    console.log(cognitoUser);

    return (
        <div>
            {!cognitoUser ? (
                <div className="text-center mb-4">
                    <div className="flex justify-center space-x-4">
                        <Link to="/login" className="border border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white py-1 px-2 rounded shadow">
                            <div className="flex items-center">
                                <div>로그인</div>
                            </div>
                        </Link>
                        <Link to="/signup" className="border border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white py-1 px-2 rounded shadow">
                            <div className="flex items-center">
                                <div>회원가입</div>
                            </div>
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="flex justify-center space-x-4" >
        <div className="text-center mb-4 ml-4">
          <div className="flex justify-center space-x-4">
                    <button className="border border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white py-1 px-2 rounded shadow">
                    <Link to="/mypage"> {cognitoUser.username}님 마이페이지</Link>
                    </button>
                    </div>
        </div>
                    <LogoutButton />
                    <BookmarkButton />
                </div>
            )}
        </div>
    )
}

export default SignInUp;
