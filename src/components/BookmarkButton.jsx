import React, { useState } from "react";
import { COGNITO_API } from "../config";
import { useRecoilValue } from "recoil";
import { signUpState, useSignUpStateLogger } from "../recoil/RecoilState.js";
import { useCognito } from "../context/CognitoProvider.jsx";
import { CognitoUser } from "amazon-cognito-identity-js";

function BookmarkButton() {
  const recoilSignUpValue = useRecoilValue(signUpState);
  const headkey = `CognitoIdentityServiceProvider.${COGNITO_API.clientId}`;
  const Username = localStorage.getItem(`${headkey}.LastAuthUser`);
  const token = localStorage.getItem(`${headkey}.${Username}.accessToken`);
  const cognitoUser = CognitoUser;
  // SignUpState의 값에서 필요한 데이터 추출
  const { name, neighborhood, age, gender } = recoilSignUpValue;
  const [clickFavorite, setClickFavorite] = useState(false);
  // 회원가입 시 즐겨찾기 생성 함수
  const { getUserAttributes } = useCognito();

  function handleFavoriteButton() {
    setClickFavorite(!clickFavorite);
    console.log(clickFavorite);
  }
  const handleCreateBookmark = async () => {
    if (!cognitoUser) {
      alert("로그인을 해주세요");
      return;
    }
    if (!neighborhood || neighborhood === "전체") {
      alert("살고 싶은 지역을 선택해주세요");
      return;
    }
    handleFavoriteButton();
    const userData = {
      neighborhood: neighborhood,
      user_name: name,
      age: age,
      gender: gender,
    };

    console.log(userData,token);
    getUserAttributes();
    try {
      const response = await fetch(
        `https://fastapi-svc:8080/bookmarks/?neighborhood=${neighborhood}&user_name=${name}&age=${age}&gender=${gender}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const json = await response.json();
      console.log(json.message);
      handleFavoriteButton();
    } catch (err) {
      console.log("실패했다1" + err);
    }
  };

  return (
    <>
      <div className="text-center">
        <div className="flex justify-center space-x-4">
          <button
            title="즐겨찾기"
            onClick={handleCreateBookmark}
            className="border border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white py-1 px-2 rounded shadow"
          >
            {!clickFavorite ? (
              <button className="w-4 h-4">
                <img src="/images/noclickfavorite.png"></img>
              </button>
            ) : (
              <button className="w-4 h-4">
                <img src="/images/clickfavorite.png"></img>
              </button>
            )}
          </button>
        </div>
      </div>
    </>
  );
}

export default BookmarkButton;
