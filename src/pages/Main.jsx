import React, { useState } from "react";
import Mid from "./Mid";
import { useNavigate } from "react-router-dom";
import LeftTap from "./LeftTap";

const Main = () => {
  const [isLeftTapOpen, setIsLeftTapOpen] = useState(true);
  const [selectedValue1, setSelectedValue1] = useState(null);
  const [selectedValue2, setSelectedValue2] = useState(null);
  const [selectedValue3, setSelectedValue3] = useState(null);
  const navigation = useNavigate(); 
  const handleButtonClick = () => {

    setIsLeftTapOpen(!isLeftTapOpen);
  };

  const sendPostRequest = async (value1, value2, value3) => {
     try {
    const response = await fetch('https://your-backend-api-url', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ value1, value2, value3 }),
    });
    
    if (response.ok) {
      console.log('Data sent successfully.');
    } else {
      console.error('Failed to send data to the server.');
    }
  } catch (error) {
    console.error('An error occurred while sending data:', error);
  }
    console.log("Sending POST request with values:", value1, value2, value3);
  };
  const handleLogin = () => {
    navigation("/login")
  }
  const handleSignUp = () => {
    navigation("/signup")
  }
  const handleBookMark = () => {
    alert("즐겨찾기 성공")
    if (selectedValue1 !== null && selectedValue2 !== null && selectedValue3 !== null) {
      sendPostRequest(selectedValue1, selectedValue2, selectedValue3);
    }
     
  }
  const handleSelectValue = (value1, value2, value3) => {
 
    setSelectedValue1(value1);
    setSelectedValue2(value2);
    setSelectedValue3(value3);
  };

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
        <div className="top-area__right">
          <ul className="utill-btn flex flex-row">
            {/* <li>
              <button
                type="button"
                className="btn bookmark flex items-center justify-center"
                onClick={handleBookMark}
                style={{
                  position: "relative",
                  padding: "0 11px 0 31px",
                }}
              >
                <span
                  style={{
                    content: "''",
                    position: "absolute",
                    top: "50%",
                    left: "10px",
                    transform: "translateY(-50%)",
                    WebkitTransform: "translateY(-50%)",
                    width: "40px",
                    height: "40px",
                    backgroundImage: `url("/images/icon_utill_bookmark.svg")`,
                    backgroundPosition: "center", 
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    display: "inline-block",
                    marginRight: "5px",
                    fontSize: "10px",
                  }}
                ></span>

                <span
                  className="text-ml font-bold ml-1"
                  style={{ color: "#606060" }}
                >
                  즐겨찾기
                </span>
              </button>
            </li>
            <li>
              <button
                type="button"
                className="btn bookmark flex items-center justify-center"
                onClick={handleLogin}
                style={{
                  position: "relative",
                  padding: "0 11px 0 31px",
                }}
              >
                <span
                  style={{
                    content: "''",
                    position: "absolute",
                    top: "50%",
                    left: "10px",
                    transform: "translateY(-50%)",
                    WebkitTransform: "translateY(-50%)",
                    width: "25px", 
                    height: "25px", 
                    backgroundImage: `url("/images/loginicons.jpg")`,
                    backgroundPosition: "center", 
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover", 
                    display: "inline-block",
                    marginRight: "5px",
                    fontSize: "10px",
                  }}
                ></span>

                <span
                  className="text-ml font-bold ml-3"
                  style={{ color: "#606060" }}
                >
                  로그인
                </span>
              </button>
            </li>
            <li>
              <button
                type="button"
                className="btn bookmark flex items-center justify-center"
                onClick={handleSignUp}
                style={{
                  position: "relative",
                  padding: "0 11px 0 31px",
                }}
              >
                <span
                  style={{
                    content: "''",
                    position: "absolute",
                    top: "50%",
                    left: "10px",
                    transform: "translateY(-50%)",
                    WebkitTransform: "translateY(-50%)",
                    width: "25px", 
                    height: "25px", 
                    backgroundImage: `url("/images/loginicons.jpg")`,
                    backgroundPosition: "center", 
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover", 
                    display: "inline-block",
                    marginRight: "5px",
                    fontSize: "10px",
                  }}
                ></span>

                <span
                  className="text-ml font-bold ml-3"
                  style={{ color: "#606060" }}
                >
                  회원가입
                </span>
              </button>
            </li> */}
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
        <LeftTap SelectedValue={handleSelectValue} />
      </div>

      {/* <div className="flex-grow">
        <Map
          className="w-full h-full"
          center={{ lat: 33.5563, lng: 126.79581 }}
          level={12}
        ></Map>
      </div> */}
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
