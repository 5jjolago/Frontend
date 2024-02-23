import React, { useEffect, useState } from "react";
import Mid from "./Mid";
import { useNavigate } from "react-router-dom";
import LeftTap from "./LeftTap";
import SignInUp from "../components/SignInUp";
import BookmarkButton from "../components/BookmarkButton";
import { useCognito } from "../context/CognitoProvider";

const Main = () => {
  const [isLeftTapOpen, setIsLeftTapOpen] = useState(true);
  const navigation = useNavigate();
  const { getSession } = useCognito();
  const handleButtonClick = () => {
    setIsLeftTapOpen(!isLeftTapOpen);
  };
  getSession((result) => {
    console.log("결과값:"+result); // true or false
  });


  useEffect(() => {
    // Fetch 예제 - Redis에 데이터 저장하기
    fetch('http://fastapi-svc:8080/set/keyName', {
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
    fetch('http://fastapi-svc:8080/get/keyName')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
  }, []);
  

  return (
    <div className="w-screen h-screen  ">
      <div className="top-area w-full flex items-center">
        <div className="top-area__left flex items-center">
          <h1>
            <img
              src="/images/ozzorago_main.PNG"
              alt="Ozzorago Main Image"
              style={{ height: "80px" }}
            />
          </h1>
          <p className="text-2xl font-bold ml-4">거주지 추천 서비스</p>
        </div>
        <div className="top-area__right ml-48">
          <ul className="utill-btn flex flex-row">
            <SignInUp />
          </ul>
        </div>
      </div>
      {/* <iframe
        src="https://13.124.183.186:5601/app/dashboards?auth_provider_hint=anonymous1#/view/edf84fe0-e1a0-11e7-b6d5-4dc382ef7f5b?embed=true&_g=()&hide-filter-bar=true"
        height="600"
        width="800"
      ></iframe> */}
      <div
        className={`w-96 h-full transition-all duration-500 transform`}
        style={{
          position: "absolute",
          top: "75px",
          zIndex: isLeftTapOpen ? 1001 : 99,
          left: isLeftTapOpen ? 0 : -395,
          width: "394px",
          height: "auto",
          backgroundColor: "#fff",
          borderRadius: "0 0 14px 0",
          boxShadow: "4px 4px 12px 0px rgba(0, 0, 0, 0.12)",
        }}
      >
        <LeftTap/>
      </div>
      <button
        onClick={handleButtonClick}
        className="absolute top-0 right-0 m-4 p-2 bg-blue-500 text-white z-10"
      >
        {isLeftTapOpen ? "Hide" : "Show"}
      </button>
    </div>
  );
};

export default Main;
