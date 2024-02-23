import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import Main from "./pages/Main";
import BookmarkPage from "./components/Mypage.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import { CognitoProvider } from "./context/CognitoProvider.jsx";
import { COGNITO_API } from "./config";
import SignInUp from "./components/SignInUp.jsx";
import { RecoilRoot } from "recoil";
import BookmarkButton from "./components/BookmarkButton.jsx";
import Mypage from "./components/Mypage.jsx";

const App = () => {
  const [cognitoInfo, setCognitoInfo] = useState(null);

  useEffect(() => {
    // Fetch 예제 - Redis에 데이터 저장하기
    fetch('https://fastapi-svc.default.svc.cluster.local/set/keyName', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ value: 'someValue' }),
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));

    // Fetch 예제 - Redis에서 데이터 가져오기
    fetch('https://myredis-svc.default.svc.cluster.local/get/keyName')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
  }, []);
  
  useEffect(() => {
    const getCognitoInfo = async () => {
      const headkey = `CognitoIdentityServiceProvider.${COGNITO_API.clientId}`;
      const name = localStorage.getItem(`${headkey}.LastAuthUser`);
      const accessToken = localStorage.getItem(`${headkey}.${name}.accessToken`);
      console.log(name, accessToken);
      const data = {
        name: name,
        accessToken: accessToken
      };
      return data;
    };

    const updateCognitoInfo = async () => {
      const cognitoData = await getCognitoInfo();
      setCognitoInfo(cognitoData);
    };

    const checkLocalStorage = async () => {
      if (!localStorage.getItem(`CognitoIdentityServiceProvider.${COGNITO_API.clientId}.LastAuthUser`)) {
        console.log("로컬 스토리지에 값이 없습니다.");
        setCognitoInfo(null);
      } else {
        console.log("로컬 스토리지에 값이 있습니다.");
        await updateCognitoInfo();
      }
    };

    checkLocalStorage();
  }, [localStorage.getItem(`CognitoIdentityServiceProvider.${COGNITO_API.clientId}.LastAuthUser`)]);

  return (
    <Router>
      <RecoilRoot>
        <CognitoProvider>
          <div className="w-screen h-screen">
            <Routes>
              <Route exact path="/" element={<Main />} />
              <Route path="/mypage" element={<Mypage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
            </Routes>
            <div style={{ position: "absolute", top: "20px", left: "400px", display: "flex" }}></div>
          </div>
        </CognitoProvider>
      </RecoilRoot>
    </Router>
  );
};

export default App;
