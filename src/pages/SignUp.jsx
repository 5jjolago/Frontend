import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCognito } from '../context/CognitoProvider';
import { COGNITO_API } from '../config';
import { signUpState, useSignUpStateLogger } from '../recoil/RecoilState.js';
import { useRecoilState, useRecoilValue } from 'recoil';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [gender, setGender] = useState('');
  const [location, setLocation] = useState('');

  // Context, recoil
  const { register } = useCognito();
  const [signUpInfo, setSignUpInfo] = useRecoilState(signUpState);
  const recoilSignUpValue = useRecoilValue(signUpState);

  const [errorMessage, setErrorMessage] = useState('');
  const navigation = useNavigate(); 


  useEffect(() => {
    console.log("Sign Up State:", recoilSignUpValue);
  },[signUpInfo])


  function calculateAge(birthdateString) {
    const birthdate = new Date(birthdateString);
    const today = new Date();
    const ageDiffMs = today - birthdate;
    const ageDate = new Date(today - ageDiffMs);
    const isPastBirthday = today.getMonth() > birthdate.getMonth() || (today.getMonth() === birthdate.getMonth() && today.getDate() >= birthdate.getDate());
    const age = isPastBirthday ? ageDate.getUTCFullYear() - 1970 : ageDate.getUTCFullYear() - 1971;

    return age;
}



  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name, email, password)
    try {
      const age = calculateAge(birthdate)
      console.log(age)
      await register(name, email, age, gender, password);
      setSignUpInfo({ ...signUpInfo, name:name, neighborhood:"", age: age, gender:gender});
      navigation("/login");
      console.log(signUpInfo);
    } catch (error) {
      console.error('회원가입 오류:', error);
    }
  };
  useSignUpStateLogger();

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
