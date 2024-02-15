import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCognito } from '../context/CognitoProvider';

function Login() {
  const { login , signIn} = useCognito();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        await login(email, password);
        console.log('로그인 성공');
        navigation("/");
        // 로그인 성공 후 리다이렉트 등의 작업을 수행할 수 있습니다.
      } catch (error) {
        console.error('로그인 오류:', error);
        // 로그인 오류 처리를 수행합니다.
      }
    console.log('Login with:', email, password);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="name" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full mb-4 p-2 rounded border border-gray-300" required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full mb-4 p-2 rounded border border-gray-300" required />
          <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Login</button>
        </form>
        <p className="mt-3 text-center">Don't have an account? <Link to="/signup" className="text-blue-500 hover:text-blue-600">Sign Up</Link></p>
      </div>
    </div>
  );
}

export default Login;
