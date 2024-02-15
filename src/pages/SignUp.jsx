import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCognito } from '../context/CognitoProvider';
import { COGNITO_API } from '../config';

function SignUp() {
  const { register } = useCognito();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [gender, setGender] = useState('');
  const [location, setLocation] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigation = useNavigate(); 

  // 생일을 나이로 변환하는 함수
  function calculateAge(birthdateString) {
    const birthdate = new Date(birthdateString);
    const today = new Date();
    const ageDiffMs = today - birthdate;
    const ageDate = new Date(ageDiffMs);
    const isPastBirthday = today.getMonth() > birthdate.getMonth() || (today.getMonth() === birthdate.getMonth() && today.getDate() >= birthdate.getDate());
    const age = isPastBirthday ? ageDate.getUTCFullYear() - 1970 : ageDate.getUTCFullYear() - 1971;

    return age;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name, email, password)
    try {
      await register(name, email, password);
      await createBookmark();
      navigation("/login");
    } catch (error) {
      console.error('회원가입 오류:', error);
      setErrorMessage(error.message);
    }
  };

  // 회원가입 시 즐겨찾기 생성 함수
  const createBookmark = async () => {
    const headkey = `CognitoIdentityServiceProvider.${COGNITO_API.clientId}`;
    const name = localStorage.getItem(`${headkey}.LastAuthUser`);
    const token = localStorage.getItem(`${headkey}.${name}.accessToken`);

    const userData = {
      neighborhood : location,
      user_name : name,
      age : calculateAge(birthdate),
      gender : gender,
    };

    try {
      const response = await fetch(`http://localhost:8080/bookmarks/`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(userData) 
      });

      const json = await response.json();
      console.log(json.message);
    } catch(err) {
      console.log("실패했다"+err)
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
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

        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
        
          <p className="mt-3 text-center">Already have an account? <Link to="/login" className="text-blue-500 hover:text-blue-600">Login</Link></p>
      
      </div>
    </div>
  );
}

export default SignUp;
