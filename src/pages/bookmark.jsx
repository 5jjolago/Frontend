import React from 'react';

const MyPage = () => {
  // 회원 정보
  const userInfo = {
    name: "John Doe",
    id: "johndoe123",
  };

  // 즐겨찾기 페이지의 텍스트들
  const bookmarkTexts = ["서울특별시", "강남구", "MZ세대"];

  return (
    <div className="container mx-auto px-64 py-8">
      {/* 회원 정보 */}
      <div className="bg-gray-100 rounded-lg p-6 shadow-md mb-8 relative">
      <div className="flex flex-row items-center mb-4">
        {/* <img className="w-8 h-8 mr-2 " src="/images/user_icon.png"></img> */}
        <h2 className="text-2xl font-bold">회원 정보</h2>
        </div>
        <div className="border-b-2 border-gray-300 mb-4">
          <p className="text-lg font-bold text-gray-700">이름:</p>
          <p className="text-lg ml-4 text-gray-900">{userInfo.name}</p>
        </div>
        <div className="border-b-2 border-gray-300">
          <p className="text-lg font-bold text-gray-700">아이디:</p>
          <p className="text-lg ml-4 text-gray-900">{userInfo.id}</p>
        </div>
      </div>

      {/* 즐겨찾기 페이지 */}
      <div className="bg-gray-100 rounded-lg p-6 shadow-md relative">
        <div className="flex flex-row items-center mb-4">
        {/* <img className="w-8 h-8 mr-2"src="/images/favorites_icon.png"></img> */}
        <h2 className="text-2xl font-bold">즐겨찾기 페이지</h2>
        </div>
        {bookmarkTexts.map((text, index) => (
          <div key={index} className="bg-white rounded-lg p-4 mb-4 shadow-md">
            <p className="text-lg text-gray-900">{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPage;
