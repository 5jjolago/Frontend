import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCognito } from '../context/CognitoProvider';

function Login() {
  const { login } = useCognito();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(name, password);
      console.log('로그인 성공');
      navigate("/");
    } catch (error) {
      console.error('로그인 오류:', error);
      if (error.code === "UserNotConfirmedException") {
        setErrorMessage("회원가입 시 기입한 이메일로 보낸 메일을 확인하여 계정을 인증해주세요.");
      } else {
        setErrorMessage("이름과 비밀번호를 올바르게 입력해주세요.");
      }
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">로그인</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">이름</label>
            <input type="text" id="name" placeholder="이름" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full p-2 rounded border border-gray-300" required />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">비밀번호</label>
            <input type="password" id="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 w-full p-2 rounded border border-gray-300" required />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline">로그인</button>
          {errorMessage && <p className="text-red-500 text-sm mt-4">{errorMessage}</p>}
        </form>
        <p className="mt-4 text-center text-sm">
          계정이 없으신가요? <Link to="/signup" className="text-blue-500 hover:text-blue-700">회원가입</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
