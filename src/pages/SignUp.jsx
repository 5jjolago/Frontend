import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCognito } from '../context/CognitoProvider';

function SignUp() {
  const { register } = useCognito();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(name, email, password, age, gender, location);
      console.log('회원가입 성공');
      // 회원가입 성공 후 리다이렉트 등의 작업을 수행할 수 있습니다.
    } catch (error) {
      console.error('회원가입 오류:', error);
      // 회원가입 오류 처리를 수행합니다.
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full mb-4 p-2 rounded border border-gray-300" required />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full mb-4 p-2 rounded border border-gray-300" required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full mb-4 p-2 rounded border border-gray-300" required />
          <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} className="w-full mb-4 p-2 rounded border border-gray-300" required />
          <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full mb-4 p-2 rounded border border-gray-300" required>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full mb-4 p-2 rounded border border-gray-300" required />
          <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Sign Up</button>
        </form>
        <p className="mt-3 text-center">Already have an account? <Link to="/login" className="text-blue-500 hover:text-blue-600">Login</Link></p>
      </div>
    </div>
  );
}

export default SignUp;
