import React, { useEffect, useState } from 'react'

const Mypage = () => {
    const [message, setMessage] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("CognitoIdentityServiceProvider.6b7a11hdccs5nnh2aqbu55j8ar.churi.accessToken")
      const response = await fetch("http://localhost:8080/bookmarks/churi",{
        headers: {
          Authorization: `Bearer ${token}` // JWT 토큰을 헤더에 추가합니다
        }
      });
      const json = await response.json();
      setMessage(json.message+"message");
    };
    fetchData();
  }, []);
  return (
    <div>
      
    </div>
  )
}

export default Mypage
