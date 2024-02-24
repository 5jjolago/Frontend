import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCognito } from '../context/CognitoProvider';
import { signUpState, useSignUpStateLogger } from '../recoil/RecoilState.js';
import { useRecoilState, useRecoilValue } from 'recoil';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [gender, setGender] = useState('');
  const [location, setLocation] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const navigation = useNavigate(); 

  // Context, recoil
  const { register } = useCognito();
  const [signUpInfo, setSignUpInfo] = useRecoilState(signUpState);
  const recoilSignUpValue = useRecoilValue(signUpState);

  useEffect(() => {
    console.log("Sign Up State:", recoilSignUpValue);
  },[signUpInfo])

  // Email validation
  const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  // Password validation
  const validatePassword = (password) => {
    return password.length >= 8 && /\d/.test(password);
  };

  // Birthdate validation
  const validateBirthdate = (birthdate) => {
    return /^\d{4}-\d{2}-\d{2}$/.test(birthdate) && birthdate.length >= 10 && birthdate.length <= 11;
  };

  // Location validation (simplified for this example)
  const validateLocation = (location) => {
    return location.includes(" ");
  };


  function calculateKoreanAge(birthdateString) {
    const birthdate = new Date(birthdateString);
    const today = new Date();
    const thisYear = today.getFullYear();
    const birthYear = birthdate.getFullYear();
    
    // 한국 나이 계산: 현재 연도 - 출생 연도 + 1
    const koreanAge = thisYear - birthYear + 1;

    return koreanAge;
}

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validateEmail(email)) {
    setErrorMessage('이메일 형식이 올바르지 않습니다.');
    return;
  } else if (!validatePassword(password)) {
    setErrorMessage('비밀번호는 최소 8자 이상이어야 하며, 숫자를 최소 1개 포함해야 합니다.');
    return;
  } else if (!validateBirthdate(birthdate)) {
    setErrorMessage('생년월일은 YYYY-MM-DD 형식으로 입력해야 합니다.');
    return;
  } else if (!validateLocation(location)) {
    setErrorMessage('위치는 "도시 구" 형식으로 입력해야 합니다. 예: "서울 강남구"');
    return;
  } else {
    setErrorMessage(''); // 에러 메시지 초기화
    try {
      const age = calculateKoreanAge(birthdate);
      await register(name, email, age, gender, password, location);
      setSignUpInfo({ ...signUpInfo, name, email, age, gender, password, location });
      navigation("/login");
    } catch (error) {
      console.error('회원가입 오류:', error);
      setErrorMessage('회원가입 과정에서 오류가 발생했습니다. 다시 시도해주세요.');
    }
  }
};

  

  useSignUpStateLogger();

  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">회원가입</h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">이름</label>
              <input id="name" name="name" type="text" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="홍길동" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">이메일</label>
              <input id="email" name="email" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="user@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">비밀번호</label>
              <input id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="8자 이상, 숫자 포함" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div>
              <label htmlFor="birthdate" className="block text-sm font-medium text-gray-700">생년월일</label>
              <input id="birthdate" name="birthdate" type="text" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="YYYY-MM-DD 예: 1999-12-31" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} />
            </div>
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700">성별</label>
              <select id="gender" name="gender" required className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="">성별 선택</option>
                <option value="male">남성</option>
                <option value="female">여성</option>
                <option value="other">기타</option>
              </select>
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">위치</label>
              <input id="location" name="location" type="text" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="예: 서울 강남구" value={location} onChange={(e) => setLocation(e.target.value)} />
            </div>
          </div>
          {errorMessage && <div className="text-red-500 text-sm mt-2">{errorMessage}</div>}
          <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            회원가입
          </button>
        </form>
        <p className="mt-2 text-center text-sm text-gray-600">
          이미 계정이 있으신가요? <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">로그인</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
