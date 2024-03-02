import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { signUpState } from "../recoil/RecoilState";
import { COGNITO_API } from "../config.js";
import { useCognito } from "../context/CognitoProvider";
import { Link, useNavigate } from "react-router-dom";

const Mypage = () => {
  const { deleteUser } = useCognito();
  const [userData, setUserData] = useState([]);
  const navigation = useNavigate();

  const recoilSignUpValue = useRecoilValue(signUpState);
  const headkey = `CognitoIdentityServiceProvider.${COGNITO_API.clientId}`;
  const Username = localStorage.getItem(`${headkey}.LastAuthUser`);
  const token = localStorage.getItem(`${headkey}.${Username}.accessToken`);
  const { getUserAttributes } = useCognito();

  useEffect(() => {
    getUserAttributes();
  }, []);

  useEffect(() => {
    const handleGetRequest = async () => {
      try {
        const response = await fetch(
          `https://fastapi-svc.default.svc.cluster.local:8080/bookmarks/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        console.log("GET 요청 결과:", data);
        const transformedData = data.map((item) => ({
          ...item,
          gender: item.gender === "male" ? "남성" : "여성",
        }));
        setUserData(transformedData);
      } catch (error) {
        console.error("GET 요청 에러:", error);
      }
    };
    handleGetRequest();
  }, []);

  const handleDeleteUser = async () => {
    await deleteUser();
    await handleDeleteItemAll();
    navigation("/");
  };

  const handleDeleteItemAll = async () => {
    try {
      const response = await fetch(
        `https://fastapi-svc:8080/bookmarks/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        setUserData(null);
      }
      console.log("DELETE 성공 !!");
    } catch (error) {
      console.error("DELETE 요청 에러:", error);
    }
  };
  const handleDeleteItem = async (neighborhood) => {
    try {
      const response = await fetch(
        `https://fastapi-svc:8080/bookmarks/${neighborhood}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        // 삭제에 성공하면 UI에서도 해당 아이템을 삭제
        setUserData(
          userData.filter((item) => item.neighborhood !== neighborhood)
        );
      } else {
        console.error("아이템 삭제 실패");
      }
    } catch (error) {
      console.error("DELETE 요청 에러:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <button
              onClick={() => navigation("/")}
              className="mr-2 p-2 rounded-full hover:bg-gray-200 transition duration-150 ease-in-out"
            >
              <img src="/images/backpage.png" alt="Back" className="w-6 h-6"/>
            </button>
            <h2 className="text-xl font-semibold">회원 정보</h2>
          </div>
          <button
            onClick={handleDeleteUser}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out"
          >
            회원탈퇴
          </button>
        </div>
        <div className="space-y-4">
          <p className="font-semibold text-gray-700">이름: <span className="font-normal text-gray-900">{recoilSignUpValue.name}</span></p>
          <p className="font-semibold text-gray-700">나이: <span className="font-normal text-gray-900">{recoilSignUpValue.age}</span></p>
          <p className="font-semibold text-gray-700">성별: <span className="font-normal text-gray-900">{recoilSignUpValue.gender === "male" ? "남성" : "여성"}</span></p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">즐겨찾기 페이지</h2>
        {userData.map((dataItem, index) => (
          <div
            key={index}
            className="bg-gray-100 rounded-lg p-4 mb-4 flex justify-between items-center"
          >
            <p className="text-gray-900"> {dataItem.neighborhood}에 대한 즐겨찾기 페이지</p>
            <button
              onClick={() => handleDeleteItem(dataItem.neighborhood)}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out"
            >
              삭제
            </button>
          </div>
        ))}
      </div>
    </div>
  ); 
  // 12
};

export default Mypage;
