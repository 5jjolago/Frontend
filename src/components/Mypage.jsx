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
          `http://fastapi-svc:8080/bookmarks/`,
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
        `http://fastapi-svc:8080/bookmarks/`,
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
        `http://fastapi-svc:8080/bookmarks/${neighborhood}`,
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
    <div className="container mx-auto px-64 py-8">
      <div className="bg-gray-100 rounded-lg p-6 shadow-md mb-8 relative">
        <div className="flex flex-row items-center mb-4">
          <div style={{flex:0.8, display:"flex", flexDirection:"row", alignItems:"center"}}>
          <button
          style={{marginRight:"10px", width:"20px", height:"20px"}}
            onClick={() => {
              navigation("/");
            }}
          >
            <img src="/images/backpage.png"></img>
          </button>
          <h2 className="text-2xl font-bold" style={{textAlign:"center", display:"flex", alignItems:"center"}}> 회원 정보</h2>
          </div>
          <button
            onClick={handleDeleteUser}
            style={{flex:0.2}}
            className=" text-red-500 hover:text-red-700 font-bold"
          >
            회원탈퇴
          </button>
        </div>
        {(userData.length > 0 || true) && (
          <>
            <div className="border-b-2 border-gray-300 mb-4">
              <p className="text-lg font-bold text-gray-700">이름:</p>
              <p className="text-lg ml-4 text-gray-900">
                {recoilSignUpValue.name}
              </p>
            </div>
            <div className="border-b-2 border-gray-300 mb-4">
              <p className="text-lg font-bold text-gray-700">나이:</p>
              <p className="text-lg ml-4 text-gray-900">
                {recoilSignUpValue.age}
              </p>
            </div>
            <div className="border-b-2 border-gray-300">
              <p className="text-lg font-bold text-gray-700">성별:</p>
              <p className="text-lg ml-4 text-gray-900">
                {recoilSignUpValue.gender}
              </p>
            </div>
          </>
        )}
      </div>

      {/* 즐겨찾기 페이지 */}
      <div className="bg-gray-100 rounded-lg p-6 shadow-md relative">
        <div className="flex flex-row items-center mb-4">
          <h2 className="text-2xl font-bold">즐겨찾기 페이지</h2>
        </div>
        {userData.map((dataItem, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-4 mb-4 shadow-md flex justify-between items-center"
          >
            <div>
              <p className="text-lg text-gray-900">
                {" "}
                {dataItem.neighborhood}에 대한 즐겨찾기 페이지
              </p>
            </div>
            <button
              onClick={() => handleDeleteItem(dataItem.neighborhood)}
              className="text-red-500 hover:text-red-700 font-bold"
            >
              삭제
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mypage;
