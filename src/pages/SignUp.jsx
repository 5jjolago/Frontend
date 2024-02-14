import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCognito } from '../context/CognitoProvider';

function SignUp() {
  const { register, confirmcode, resendCode,signUp } = useCognito();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [gender, setGender] = useState('');
  const [location, setLocation] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [showVerification, setShowVerification] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name, email, password)
    try {
      await signUp(name, email, password);
      setShowVerification(true);
    } catch (error) {
      console.error('회원가입 오류:', error);
      setErrorMessage(error.message);
    }
  };

  const handleVerificationSubmit = async (e) => {
    e.preventDefault();
    console.log(email,verificationCode)
    try {
      await confirmcode(email, verificationCode);
      console.log('이메일 인증 성공');
      // 이메일 인증 성공 후 리다이렉트 등의 작업을 수행할 수 있습니다.
    } catch (error) {
      console.error('이메일 인증 오류:', error);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        {!showVerification ? (
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full mb-4 p-2 rounded border border-gray-300" required />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full mb-4 p-2 rounded border border-gray-300" required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full mb-4 p-2 rounded border border-gray-300" required />
            <input type="text" placeholder="Birthdate (YYYY-MM-DD)" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} className="w-full mb-4 p-2 rounded border border-gray-300" required />
            <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full mb-4 p-2 rounded border border-gray-300" required>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full mb-4 p-2 rounded border border-gray-300" required />
            <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">회원가입</button>
          </form>
        ) : (
          <form onSubmit={handleVerificationSubmit}>
            <input type="text" placeholder="Verification Code" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} className="w-full mb-4 p-2 rounded border border-gray-300" required />
            <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Verify</button>
          </form>
        )}
        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
        {!showVerification && (
          <p className="mt-3 text-center">Already have an account? <Link to="/login" className="text-blue-500 hover:text-blue-600">Login</Link></p>
        )}
      </div>
    </div>
  );
}

export default SignUp;
