import React, { useState } from "react";
import LifestyleBox from "../components/LifestyleBox";
import { ReactComponent as Tooltip } from "../assets/images/icon_tooltip.svg";
import MetrixIcon from "../components/MetrixIcon";
import MetrixBox from "../components/MetrixBox";
const Mid = ({ onResetDropdown }) => {
  const [selectedLifestyle, setSelectedLifestyle] = useState(null);
  const [Icons, setIcons] = useState([
    {
      id: 1,
      imageurl: "/images/icon_index_nature.svg",
      backgroundColor: "#25BD69",
      iconText: "자연",
    },
    {
      id: 2,
      imageurl: "/images/icon_index_safe.svg",
      backgroundColor: "#FCC913",
      iconText: "안전",
    },
    {
      id: 3,
      imageurl: "/images/icon_index_edu.svg",
      backgroundColor: "#4DB4FF",
      iconText: "교육",
    },
    {
      id: 4,
      imageurl: "/images/icon_index_life.svg",
      backgroundColor: "#FFA133",
      iconText: "생활편의교통",
    },
    {
      id: 5,
      imageurl: "/images/icon_index_weal.svg",
      backgroundColor: "#F77373",
      iconText: "복지문화",
    },
  ]);

  //초기화 함수 구현
  const handleResetDropdownAndLifestyle = () => {
    setSelectedLifestyle(null);
    onResetDropdown(); // onResetDropdown 함수 호출
  };
  const handleLifestyleClick = (lifestyle) => {
    console.log(lifestyle);
    setSelectedLifestyle(lifestyle);
  };



  return (
    <>
      <div className="flex pt-5 align-middle">
        <div className="flex text-black font-bold text-sm">
          라이프스타일 선택
        </div>
        <span className="flex ml-2">
          <Tooltip className="h-full" />
        </span>
      </div>
      <fieldset>
        <ul className="lifestyle w-88 h-48 grid grid-cols-4 gap-0 tracking-tighter mt-2 box-border">
          <LifestyleBox
            onClick={() => handleLifestyleClick("MZ세대")}
            hideText="삶의 질을 중요시하는 MZ세대"
            bottomText="MZ세대"
            imageurl="/images/icon_life_style_mzGeneration.svg"
          />
          <LifestyleBox
            onClick={() => handleLifestyleClick("자기계발형")}
            hideText="성장을 추구하는 자기계발형"
            bottomText="자기계발형"
            imageurl="/images/icon_life_style_selfImprovement.svg"
          />
          <LifestyleBox
            onClick={() => handleLifestyleClick("1인 가구")}
            hideText="문화생활이 좋은 1인 가구"
            bottomText="1인 가구"
            imageurl="/images/icon_life_style_singleHouseholds.svg"
          />
          <LifestyleBox
            onClick={() => handleLifestyleClick("신혼부부")}
            hideText="육아에 열중하는 신혼부부"
            bottomText="신혼부부"
            imageurl="/images/icon_life_style_newlyweds.svg"
          />
          <LifestyleBox
            onClick={() => handleLifestyleClick("초등 학부모")}
            hideText="어린이를 키우는 맞벌이 부모"
            bottomText="초등 학부모"
            imageurl="/images/icon_life_style_elementaryParents.svg"
          />
          <LifestyleBox
            onClick={() => handleLifestyleClick("중고등 학부모")}
            hideText="중고생을 키우는 학부모"
            bottomText="중고등 학부모"
            imageurl="/images/icon_life_style_middleAndHighParents.svg"
          />
          <LifestyleBox
            onClick={() => handleLifestyleClick("반려동물 가구")}
            hideText="반려동물과 함께하는 가구"
            bottomText="반려동물 가구"
            imageurl="/images/icon_life_style_petFurniture.svg"
          />
          <LifestyleBox
            onClick={() => handleLifestyleClick("은퇴 세대")}
            hideText="편안한 휴식이 좋은 은퇴 세대"
            bottomText="은퇴 세대"
            imageurl="/images/icon_life_style_retiredGeneration.svg"
          />
        </ul>
      </fieldset>
      <div>
        <div className="flex items-center mt-4">
          <div className="text-black font-bold text-sm pb-3">선택한 지표</div>
        </div>
        <div className="index-select">
          {selectedLifestyle === "MZ세대" && (
            <ul className="index-select__selected pb-3 flex flex-row flex-wrap border border-solid border-gray-300 rounded-lg p-0 pb-15">
              <MetrixIcon
                imageurl="/images/icon_index_nature.svg"
                backgroundColor={"#25BD69"}
                iconText={"자연"}
              />
              <MetrixIcon
                imageurl="/images/icon_index_safe.svg"
                backgroundColor={"#FCC913"}
                iconText={"안전"}
              />
              <MetrixIcon
                imageurl="/images/icon_index_edu.svg"
                backgroundColor={"#4DB4FF"}
                iconText={"교육"}
              />
              <MetrixIcon
                imageurl="/images/icon_index_life.svg"
                backgroundColor={"#FFA133"}
                iconText={"생활편의교통"}
              />
              <MetrixIcon
                imageurl="/images/icon_index_weal.svg"
                backgroundColor={"#F77373"}
                iconText={"복지문화"}
              />
            </ul>
          )}
          {selectedLifestyle === "자기계발형" && (
            <ul className="index-select__selected pb-3 flex flex-row flex-wrap border border-solid border-gray-300 rounded-lg p-0 pb-15">
              <MetrixIcon
                imageurl="/images/icon_index_nature.svg"
                backgroundColor={"#25BD69"}
                iconText={"자연"}
              />
              <MetrixIcon
                imageurl="/images/icon_index_life.svg"
                backgroundColor={"#FFA133"}
                iconText={"생활편의교통"}
              />
              <MetrixIcon
                imageurl="/images/icon_index_edu.svg"
                backgroundColor={"#4DB4FF"}
                iconText={"교육"}
              />
              <MetrixIcon
                imageurl="/images/icon_index_weal.svg"
                backgroundColor={"#F77373"}
                iconText={"복지문화"}
              />
            </ul>
          )}
          {selectedLifestyle === "1인 가구" && (
            <ul className="index-select__selected pb-3 flex flex-row flex-wrap border border-solid border-gray-300 rounded-lg p-0 pb-15">
              <MetrixIcon
                imageurl="/images/icon_index_house.svg"
                backgroundColor={"#4877F2"}
                iconText={"주택"}
              />
              <MetrixIcon
                imageurl="/images/icon_index_popul.svg"
                backgroundColor={"#B08BFF"}
                iconText={"지역인구"}
              />
              <MetrixIcon
                imageurl="/images/icon_index_safe.svg"
                backgroundColor={"#FCC913"}
                iconText={"안전"}
              />
              <MetrixIcon
                imageurl="/images/icon_index_life.svg"
                backgroundColor={"#FFA133"}
                iconText={"생활편의교통"}
              />
              <MetrixIcon
                imageurl="/images/icon_index_weal.svg"
                backgroundColor={"#F77373"}
                iconText={"복지문화"}
              />
            </ul>
          )}

          {selectedLifestyle === "신혼부부" && (
            <ul className="index-select__selected pb-3 flex flex-row flex-wrap border border-solid border-gray-300 rounded-lg p-0 pb-15">
              <MetrixIcon
                imageurl="/images/icon_index_nature.svg"
                backgroundColor={"#25BD69"}
                iconText={"자연"}
              />
              <MetrixIcon
                imageurl="/images/icon_index_house.svg"
                backgroundColor={"#4877F2"}
                iconText={"주택"}
              />
              <MetrixIcon
                imageurl="/images/icon_index_life.svg"
                backgroundColor={"#FFA133"}
                iconText={"생활편의교통"}
              />
              <MetrixIcon
                imageurl="/images/icon_index_weal.svg"
                backgroundColor={"#F77373"}
                iconText={"복지문화"}
              />
            </ul>
          )}

          {selectedLifestyle === "초등 학부모" && (
            <ul className="index-select__selected pb-3 flex flex-row flex-wrap border border-solid border-gray-300 rounded-lg p-0 pb-15">
              <MetrixIcon
                imageurl="/images/icon_index_house.svg"
                backgroundColor={"#4877F2"}
                iconText={"주택"}
              />
              <MetrixIcon
                imageurl="/images/icon_index_safe.svg"
                backgroundColor={"#FCC913"}
                iconText={"안전"}
              />
              <MetrixIcon
                imageurl="/images/icon_index_life.svg"
                backgroundColor={"#FFA133"}
                iconText={"생활편의교통"}
              />
              <MetrixIcon
                imageurl="/images/icon_index_edu.svg"
                backgroundColor={"#4DB4FF"}
                iconText={"교육"}
              />
              <MetrixIcon
                imageurl="/images/icon_index_weal.svg"
                backgroundColor={"#F77373"}
                iconText={"복지문화"}
              />
            </ul>
          )}

          {selectedLifestyle === "중고등 학부모" && (
            <ul className="index-select__selected pb-3 flex flex-row flex-wrap border border-solid border-gray-300 rounded-lg p-0 pb-15">
              <MetrixIcon
                imageurl="/images/icon_index_house.svg"
                backgroundColor={"#4877F2"}
                iconText={"주택"}
              />
              <MetrixIcon
                imageurl="/images/icon_index_safe.svg"
                backgroundColor={"#FCC913"}
                iconText={"안전"}
              />
              <MetrixIcon
                imageurl="/images/icon_index_life.svg"
                backgroundColor={"#FFA133"}
                iconText={"생활편의교통"}
              />
              <MetrixIcon
                imageurl="/images/icon_index_edu.svg"
                backgroundColor={"#4DB4FF"}
                iconText={"교육"}
              />
            </ul>
          )}

          {selectedLifestyle === "반려동물 가구" && (
            <ul className="index-select__selected pb-3 flex flex-row flex-wrap border border-solid border-gray-300 rounded-lg p-0 pb-15">
              <MetrixIcon
                imageurl="/images/icon_index_nature.svg"
                backgroundColor={"#25BD69"}
                iconText={"자연"}
              />
              <MetrixIcon
                imageurl="/images/icon_index_house.svg"
                backgroundColor={"#4877F2"}
                iconText={"주택"}
              />
              <MetrixIcon
                imageurl="/images/icon_index_safe.svg"
                backgroundColor={"#FCC913"}
                iconText={"안전"}
              />
              <MetrixIcon
                imageurl="/images/icon_index_life.svg"
                backgroundColor={"#FFA133"}
                iconText={"생활편의교통"}
              />
              <MetrixIcon
                imageurl="/images/icon_index_weal.svg"
                backgroundColor={"#F77373"}
                iconText={"복지문화"}
              />
            </ul>
          )}
          {selectedLifestyle === "은퇴 세대" && (
            <ul className="index-select__selected pb-3 flex flex-row flex-wrap border border-solid border-gray-300 rounded-lg p-0 pb-15">
              <MetrixIcon
                imageurl="/images/icon_index_nature.svg"
                backgroundColor={"#25BD69"}
                iconText={"자연"}
              />
              <MetrixIcon
                imageurl="/images/icon_index_popul.svg"
                backgroundColor={"#B08BFF"}
                iconText={"지역인구"}
              />
              <MetrixIcon
                imageurl="/images/icon_index_safe.svg"
                backgroundColor={"#FCC913"}
                iconText={"안전"}
              />
              <MetrixIcon
                imageurl="/images/icon_index_life.svg"
                backgroundColor={"#FFA133"}
                iconText={"생활편의교통"}
              />
              <MetrixIcon
                imageurl="/images/icon_index_weal.svg"
                backgroundColor={"#F77373"}
                iconText={"복지문화"}
              />
            </ul>
          )}
          <ul className="index-select__edit"></ul>
        </div>
      </div>
      {selectedLifestyle === "MZ세대" && (
        <ul className="index-select__edit index-select__edit flex flex-row flex-wrap items-center mt-4 ml-0 -ml-6">
          <MetrixBox
            backgroundColor="#25BD69"
            text1="대기 질 현황(미세먼지)"
            text2="좋음"
            text3="하"
          />
          <MetrixBox
            backgroundColor="#25BD69"
            text1="대기 질 현황(일산화탄소)"
            text2="좋음"
            text3="하"
          />
          <MetrixBox
            backgroundColor="#25BD69"
            text1="1인당 도시공원 면적"
            text2="넓음"
            text3="하"
          />
          <MetrixBox
            backgroundColor="#FCC913"
            text1="감염병 안전"
            text2="좋음"
            text3="하"
          />
          <MetrixBox
            backgroundColor="#4DB4FF"
            text1="학원 수"
            text2="많음"
            text3="중"
          />
          <MetrixBox
            backgroundColor="#FFA133"
            text1="백화점 수"
            text2="많음"
            text3="상"
          />
          <MetrixBox
            backgroundColor="#FFA133"
            text1="외식시설 수"
            text2="많음"
            text3="중"
          />
          <MetrixBox
            backgroundColor="#F77373"
            text1="문화시설 수"
            text2="많음"
            text3="상"
          />
          <MetrixBox
            backgroundColor="#F77373"
            text1="체육시설 수"
            text2="좋음"
            text3="상"
          />
        </ul>
      )}
      {selectedLifestyle === "자기계발형" && (
        <ul className="index-select__edit index-select__edit flex flex-row flex-wrap items-center mt-4 ml-0 -ml-6">
          <MetrixBox
            backgroundColor="#25BD69"
            text1="1인당 도시공원 면적"
            text2="넓음"
            text3="중"
          />
          <MetrixBox
            backgroundColor="#FFA133"
            text1="백화점 수"
            text2="많음"
            text3="중"
          />
          <MetrixBox
            backgroundColor="#FFA133"
            text1="대형 마트 수"
            text2="많음"
            text3="중"
          />
          <MetrixBox
            backgroundColor="#FFA133"
            text1="대중교통 시설 수"
            text2="많음"
            text3="하"
          />
          <MetrixBox
            backgroundColor="#4DB4FF"
            text1="학원 수"
            text2="많음"
            text3="중"
          />
          <MetrixBox
            backgroundColor="#F77373"
            text1="문화시설 수"
            text2="많음"
            text3="상"
          />
          <MetrixBox
            backgroundColor="#F77373"
            text1="체육시설 수"
            text2="많음"
            text3="상"
          />
        </ul>
      )}
      {selectedLifestyle === "1인 가구" && (
        <ul className="index-select__edit index-select__edit flex flex-row flex-wrap items-center mt-4 ml-0 -ml-6">
          <MetrixBox
            backgroundColor="#4877F2"
            text1="면적당 아파트 가격"
            text2="낮음"
            text3="하"
          />
          <MetrixBox
            backgroundColor="#B08BFF"
            text1="청장년인구 비율"
            text2="높음"
            text3="상"
          />
          <MetrixBox
            backgroundColor="#FCC913"
            text1="범죄 안전"
            text2="좋음"
            text3="중"
          />
          <MetrixBox
            backgroundColor="#FFA133"
            text1="백화점 수"
            text2="많음"
            text3="중"
          />
          <MetrixBox
            backgroundColor="#FFA133"
            text1="슈퍼마켓&편의점 수"
            text2="많음"
            text3="상"
          />
          <MetrixBox
            backgroundColor="#FFA133"
            text1="대중교통 시설 수"
            text2="많음"
            text3="중"
          />
          <MetrixBox
            backgroundColor="#F77373"
            text1="문화시설 수"
            text2="많음"
            text3="상"
          />
        </ul>
      )}
      {selectedLifestyle === "신혼부부" && (
        <ul className="index-select__edit index-select__edit flex flex-row flex-wrap items-center mt-4 ml-0 -ml-6">
          <MetrixBox
            backgroundColor="#25BD69"
            text1="1인당 도시공원 면적"
            text2="넓음"
            text3="중"
          />
          <MetrixBox
            backgroundColor="#4877F2"
            text1="아파트 비율"
            text2="높음"
            text3="상"
          />
          <MetrixBox
            backgroundColor="#4877F2"
            text1="주거 면적"
            text2="넓음"
            text3="하"
          />
          <MetrixBox
            backgroundColor="#4877F2"
            text1="면적당 아파트 가격"
            text2="낮음"
            text3="중"
          />
          <MetrixBox
            backgroundColor="#FFA133"
            text1="편의시설 수"
            text2="많음"
            text3="중"
          />
          <MetrixBox
            backgroundColor="#FFA133"
            text1="대형마트 수"
            text2="많음"
            text3="중"
          />
          <MetrixBox
            backgroundColor="#F77373"
            text1="유치원 및 보육시설 수"
            text2="많음"
            text3="상"
          />
          <MetrixBox
            backgroundColor="#F77373"
            text1="의원 수"
            text2="많음"
            text3="상"
          />
        </ul>
      )}
      {selectedLifestyle === "초등 학부모" && (
        <ul className="index-select__edit index-select__edit flex flex-row flex-wrap items-center mt-4 ml-0 -ml-6">
          <MetrixBox
            backgroundColor="#4877F2"
            text1="아파트 비율"
            text2="높음"
            text3="상"
          />
          <MetrixBox
            backgroundColor="#4877F2"
            text1="주거 면적"
            text2="넓음"
            text3="중"
          />
          <MetrixBox
            backgroundColor="#FCC913"
            text1="범죄 안전"
            text2="좋음"
            text3="하"
          />
          <MetrixBox
            backgroundColor="#FFA133"
            text1="대형마트 수"
            text2="많음"
            text3="하"
          />
          <MetrixBox
            backgroundColor="#FFA133"
            text1="슈퍼마켓&편의점 수"
            text2="많음"
            text3="하"
          />
          <MetrixBox
            backgroundColor="#FFA133"
            text1="외식시설 수"
            text2="많음"
            text3="중"
          />
          <MetrixBox
            backgroundColor="#FFA133"
            text1="대중교통 시설 수"
            text2="많음"
            text3="중"
          />
          <MetrixBox
            backgroundColor="#4DB4FF"
            text1="초등학교 수"
            text2="많음"
            text3="상"
          />
          <MetrixBox
            backgroundColor="#4DB4FF"
            text1="학원 수"
            text2="많음"
            text3="상"
          />
          <MetrixBox
            backgroundColor="#F77373"
            text1="의원 수"
            text2="많음"
            text3="중"
          />
        </ul>
      )}
      {selectedLifestyle === "중고등 학부모" && (
        <ul className="index-select__edit index-select__edit flex flex-row flex-wrap items-center mt-4 ml-0 -ml-6">
          <MetrixBox
            backgroundColor="#4877F2"
            text1="아파트 비율"
            text2="높음"
            text3="상"
          />
          <MetrixBox
            backgroundColor="#4877F2"
            text1="주거 면적"
            text2="넓음"
            text3="중"
          />
          <MetrixBox
            backgroundColor="#4877F2"
            text1="면적당 아파트 가격"
            text2="높음"
            text3="중"
          />
          <MetrixBox
            backgroundColor="#FCC913"
            text1="범죄 안전"
            text2="좋음"
            text3="하"
          />
          <MetrixBox
            backgroundColor="#FFA133"
            text1="대형마트 수"
            text2="많음"
            text3="하"
          />
          <MetrixBox
            backgroundColor="#FFA133"
            text1="슈퍼마켓&편의점 수"
            text2="많음"
            text3="하"
          />
          <MetrixBox
            backgroundColor="#FFA133"
            text1="대중교통 시설 수"
            text2="많음"
            text3="중"
          />
          <MetrixBox
            backgroundColor="#4DB4FF"
            text1="중학교 수"
            text2="많음"
            text3="상"
          />
          <MetrixBox
            backgroundColor="#4DB4FF"
            text1="고등학교 수"
            text2="많음"
            text3="상"
          />
          <MetrixBox
            backgroundColor="#4DB4FF"
            text1="학원 수"
            text2="많음"
            text3="상"
          />
        </ul>
      )}
      {selectedLifestyle === "반려동물 가구" && (
        <ul className="index-select__edit index-select__edit flex flex-row flex-wrap items-center mt-4 ml-0 -ml-6">
          <MetrixBox
            backgroundColor="#25BD69"
            text1="대기 질 현황(미세먼지)"
            text2="좋음"
            text3="중"
          />
          <MetrixBox
            backgroundColor="#25BD69"
            text1="대기 질 현황(일산화탄소)"
            text2="좋음"
            text3="중"
          />
          <MetrixBox
            backgroundColor="#25BD69"
            text1="1인당 도시공원 면적"
            text2="넓음"
            text3="상"
          />
          <MetrixBox
            backgroundColor="#4877F2"
            text1="아파트 비율"
            text2="높음"
            text3="하"
          />
          <MetrixBox
            backgroundColor="#4877F2"
            text1="자가점유 비율"
            text2="높음"
            text3="중"
          />
          <MetrixBox
            backgroundColor="#FCC913"
            text1="교통사고 안전"
            text2="좋음"
            text3="하"
          />
          <MetrixBox
            backgroundColor="#FFA133"
            text1="대형 마트 수"
            text2="많음"
            text3="하"
          />
          <MetrixBox
            backgroundColor="#FFA133"
            text1="반려동물 관련 서비스업 수"
            text2="많음"
            text3="상"
          />
          <MetrixBox
            backgroundColor="#F77373"
            text1="문화시설 수"
            text2="많음"
            text3="상"
          />
        </ul>
      )}
      {selectedLifestyle === "은퇴 세대" && (
        <ul className="index-select__edit index-select__edit flex flex-row flex-wrap items-center mt-4 ml-0 -ml-6">
          <MetrixBox
            backgroundColor="#25BD69"
            text1="녹지비율"
            text2="높음"
            text3="하"
          />
          <MetrixBox
            backgroundColor="#B08BFF"
            text1="청장년인구 비율"
            text2="높음"
            text3="상"
          />
          <MetrixBox
            backgroundColor="#FCC913"
            text1="감염병 안전"
            text2="좋음"
            text3="중"
          />
          <MetrixBox
            backgroundColor="#FFA133"
            text1="편의시설 수"
            text2="많음"
            text3="중"
          />
          <MetrixBox
            backgroundColor="#FFA133"
            text1="슈퍼마켓&편의점 수"
            text2="많음"
            text3="하"
          />
          <MetrixBox
            backgroundColor="#FFA133"
            text1="식료품점 수"
            text2="많음"
            text3="하"
          />
          <MetrixBox
            backgroundColor="#FFA133"
            text1="대중교통 시설 수"
            text2="많음"
            text3="중"
          />
          <MetrixBox
            backgroundColor="#F77373"
            text1="의원 수"
            text2="많음"
            text3="상"
          />
          <MetrixBox
            backgroundColor="#F77373"
            text1="약국 수"
            text2="많음"
            text3="상"
          />
        </ul>
      )}
      <div className="button-wrap flex w-full mt-3">
        <button
          type="button"
          className="btn redo p-3 btn mr-2 flex justify-center align-middle items-center relative border-2 border-gray-300 rounded-lg text-base leading-none bg-gray-200 text-gray-600 h-12 focus:outline-none"
          onClick={handleResetDropdownAndLifestyle}
          style={{ width: "100px" }}
        >
          <img src="/images/redo-24.png" className="w-4 h-4 mr-1" alt="icon" />
          <span style={{ color: "#606060", fontSize: "15px", fontWeight: 600 }}>
            초기화
          </span>
        </button>
        <button
          type="button"
          className="btn assay active bg-gradient-to-br from-blue-800 to-blue-500 rounded-md"
          onClick="$houseMap.function.onClickAnalysis('simple');"
          style={{ width: "247px", height: "45px" }}
        >
          <span style={{ color: "white", fontSize: "15px", fontWeight: 600 }}>
            분석
          </span>
        </button>
      </div>
    </>
  );
};

export default Mid;
