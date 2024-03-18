import React, { useEffect, useState } from "react";
import Mid from "./Mid";
import { useNavigate } from "react-router-dom";
import LeftTap from "./LeftTap";
import SignInUp from "../components/SignInUp";
import BookmarkButton from "../components/BookmarkButton";
import { useCognito } from "../context/CognitoProvider";
import Dashboard from "./Dashboard";

const Main = () => {
  const [isLeftTapOpen, setIsLeftTapOpen] = useState(true);
  const navigation = useNavigate();
  const { getSession } = useCognito();

  const handleButtonClick = () => {
    setIsLeftTapOpen(!isLeftTapOpen);
  };

  getSession((result) => {
    console.log("결과값:" + result); // true or false
  });

  return (
    <div className="w-screen h-screen  ">
      <div
        className="top-area w-full flex items-center"
        style={{ boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}
      >
        <div
          className="top-area__left flex items-center"
          style={{ flex: 1, padding: "10px 0px 10px 10px" }}
        >
          <h1>
            <img
              src="/images/seoulhanglogo.png"
              alt="Ozzorago Main Image"
              style={{ height: "40px" }}
            />
          </h1>
          <p className="text-2xl font-bold ml-4"></p>
        </div>
        <div
          className="top-area__right flex flex-row items-center justify-center mr-16"
          style={{ marginLeft: "2rem" }}
        >
          <ul className="utill-btn flex flex-row items-center justify-center">
            <SignInUp />
          </ul>
        </div>
      </div>
      <div
        className="flex flex-row mt-1 h-90vh overflow-scroll"
        style={{
          height: "90vh",
        }}
      >
        <div
          className={`w-96 h-90vh transition-all duration-500 transform`}
          style={{
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
          <LeftTap />
        </div>
        <Dashboard />
      </div>
    </div>
  );
};

export default Main;
