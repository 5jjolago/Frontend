import React, { useState } from "react";
import LifestyleBox from "../components/LifestyleBox";
import { ReactComponent as Tooltip } from "../assets/images/icon_tooltip.svg";
import MetrixIcon from "../components/MetrixIcon";
import MetrixBox from "../components/MetrixBox";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedLifestyle } from "../app/lifeStyleSlices";
import Elastic from "./Elastic";

const lifestyleOptions = [
  {
    key: "MZ세대",
    text: "MZ세대",
    detail: "삶의 질을 중요시하는 MZ세대",
    imageKey: "mzGeneration",
  },
  {
    key: "자기계발형",
    text: "자기계발형",
    detail: "성장을 추구하는 자기계발형",
    imageKey: "selfImprovement",
  },
  {
    key: "1인 가구",
    text: "1인 가구",
    detail: "문화생활이 좋은 1인 가구",
    imageKey: "singleHouseholds",
  },
  {
    key: "신혼부부",
    text: "신혼부부",
    detail: "육아에 열중하는 신혼부부",
    imageKey: "newlyweds",
  },
  {
    key: "초등 학부모",
    text: "초등 학부모",
    detail: "어린이를 키우는 맞벌이 부모",
    imageKey: "elementaryParents",
  },
  {
    key: "중고등 학부모",
    text: "중고등 학부모",
    detail: "중고생을 키우는 학부모",
    imageKey: "middleAndHighParents",
  },
  {
    key: "반려동물 가구",
    text: "반려동물 가구",
    detail: "반려동물과 함께하는 가구",
    imageKey: "petFurniture",
  },
  {
    key: "은퇴 세대",
    text: "은퇴 세대",
    detail: "편안한 휴식이 좋은 은퇴 세대",
    imageKey: "retiredGeneration",
  },
];

const lifestyleMetrics = {
  MZ세대: [
    {
      imageurl: "/images/icon_index_nature.svg",
      backgroundColor: "#25BD69",
      iconText: "자연",
    },
    {
      imageurl: "/images/icon_index_safe.svg",
      backgroundColor: "#FCC913",
      iconText: "안전",
    },
    {
      imageurl: "/images/icon_index_edu.svg",
      backgroundColor: "#4DB4FF",
      iconText: "교육",
    },
    {
      imageurl: "/images/icon_index_life.svg",
      backgroundColor: "#FFA133",
      iconText: "생활편의교통",
    },
    {
      imageurl: "/images/icon_index_weal.svg",
      backgroundColor: "#F77373",
      iconText: "복지문화",
    },
  ],
  자기계발형: [
    {
      imageurl: "/images/icon_index_nature.svg",
      backgroundColor: "#25BD69",
      iconText: "자연",
    },
    {
      imageurl: "/images/icon_index_life.svg",
      backgroundColor: "#FFA133",
      iconText: "생활편의교통",
    },
    {
      imageurl: "/images/icon_index_edu.svg",
      backgroundColor: "#4DB4FF",
      iconText: "교육",
    },
    {
      imageurl: "/images/icon_index_weal.svg",
      backgroundColor: "#F77373",
      iconText: "복지문화",
    },
  ],
  "1인 가구": [
    {
      imageurl: "/images/icon_index_house.svg",
      backgroundColor: "#4877F2",
      iconText: "주택",
    },
    {
      imageurl: "/images/icon_index_popul.svg",
      backgroundColor: "#B08BFF",
      iconText: "지역인구",
    },
    {
      imageurl: "/images/icon_index_safe.svg",
      backgroundColor: "#FCC913",
      iconText: "안전",
    },
    {
      imageurl: "/images/icon_index_life.svg",
      backgroundColor: "#FFA133",
      iconText: "생활편의교통",
    },
    {
      imageurl: "/images/icon_index_weal.svg",
      backgroundColor: "#F77373",
      iconText: "복지문화",
    },
  ],
  신혼부부: [
    {
      imageurl: "/images/icon_index_nature.svg",
      backgroundColor: "#25BD69",
      iconText: "자연",
    },
    {
      imageurl: "/images/icon_index_house.svg",
      backgroundColor: "#4877F2",
      iconText: "주택",
    },
    {
      imageurl: "/images/icon_index_life.svg",
      backgroundColor: "#FFA133",
      iconText: "생활편의교통",
    },
    {
      imageurl: "/images/icon_index_weal.svg",
      backgroundColor: "#F77373",
      iconText: "복지문화",
    },
  ],
  "초등 학부모": [
    {
      imageurl: "/images/icon_index_house.svg",
      backgroundColor: "#4877F2",
      iconText: "주택",
    },
    {
      imageurl: "/images/icon_index_safe.svg",
      backgroundColor: "#FCC913",
      iconText: "안전",
    },
    {
      imageurl: "/images/icon_index_life.svg",
      backgroundColor: "#FFA133",
      iconText: "생활편의교통",
    },
    {
      imageurl: "/images/icon_index_edu.svg",
      backgroundColor: "#4DB4FF",
      iconText: "교육",
    },
    {
      imageurl: "/images/icon_index_weal.svg",
      backgroundColor: "#F77373",
      iconText: "복지문화",
    },
  ],
  "중고등 학부모": [
    {
      imageurl: "/images/icon_index_house.svg",
      backgroundColor: "#4877F2",
      iconText: "주택",
    },
    {
      imageurl: "/images/icon_index_safe.svg",
      backgroundColor: "#FCC913",
      iconText: "안전",
    },
    {
      imageurl: "/images/icon_index_life.svg",
      backgroundColor: "#FFA133",
      iconText: "생활편의교통",
    },
    {
      imageurl: "/images/icon_index_edu.svg",
      backgroundColor: "#4DB4FF",
      iconText: "교육",
    },
  ],
  "반려동물 가구": [
    {
      imageurl: "/images/icon_index_nature.svg",
      backgroundColor: "#25BD69",
      iconText: "자연",
    },
    {
      imageurl: "/images/icon_index_house.svg",
      backgroundColor: "#4877F2",
      iconText: "주택",
    },
    {
      imageurl: "/images/icon_index_safe.svg",
      backgroundColor: "#FCC913",
      iconText: "안전",
    },
    {
      imageurl: "/images/icon_index_life.svg",
      backgroundColor: "#FFA133",
      iconText: "생활편의교통",
    },
    {
      imageurl: "/images/icon_index_weal.svg",
      backgroundColor: "#F77373",
      iconText: "복지문화",
    },
  ],
  "은퇴 세대": [
    {
      imageurl: "/images/icon_index_nature.svg",
      backgroundColor: "#25BD69",
      iconText: "자연",
    },
    {
      imageurl: "/images/icon_index_popul.svg",
      backgroundColor: "#B08BFF",
      iconText: "지역인구",
    },
    {
      imageurl: "/images/icon_index_safe.svg",
      backgroundColor: "#FCC913",
      iconText: "안전",
    },
    {
      imageurl: "/images/icon_index_life.svg",
      backgroundColor: "#FFA133",
      iconText: "생활편의교통",
    },
    {
      imageurl: "/images/icon_index_weal.svg",
      backgroundColor: "#F77373",
      iconText: "복지문화",
    },
  ],
};

const lifestyleSubMetrics = {
  MZ세대: [
    {
      backgroundColor: "#25BD69",
      text1: "대기 질 현황(미세먼지)",
      text2: "좋음",
      text3: "하",
    },
    {
      backgroundColor: "#25BD69",
      text1: "대기 질 현황(일산화탄소)",
      text2: "좋음",
      text3: "하",
    },
    {
      backgroundColor: "#25BD69",
      text1: "1인당 도시공원 면적",
      text2: "넓음",
      text3: "하",
    },
    {
      backgroundColor: "#FCC913",
      text1: "감염병 안전",
      text2: "좋음",
      text3: "하",
    },
    {
      backgroundColor: "#4DB4FF",
      text1: "학원 수",
      text2: "많음",
      text3: "중",
    },
    {
      backgroundColor: "#FFA133",
      text1: "백화점 수",
      text2: "많음",
      text3: "상",
    },
    {
      backgroundColor: "#FFA133",
      text1: "외식시설 수",
      text2: "많음",
      text3: "중",
    },
    {
      backgroundColor: "#F77373",
      text1: "문화시설 수",
      text2: "많음",
      text3: "상",
    },
    {
      backgroundColor: "#F77373",
      text1: "체육시설 수",
      text2: "좋음",
      text3: "상",
    },
  ],
  자기계발형: [
    {
      backgroundColor: "#25BD69",
      text1: "1인당 도시공원 면적",
      text2: "넓음",
      text3: "중",
    },
    {
      backgroundColor: "#FFA133",
      text1: "백화점 수",
      text2: "많음",
      text3: "중",
    },
    {
      backgroundColor: "#FFA133",
      text1: "대형 마트 수",
      text2: "많음",
      text3: "중",
    },
    {
      backgroundColor: "#FFA133",
      text1: "대중교통 시설 수",
      text2: "많음",
      text3: "하",
    },
    {
      backgroundColor: "#4DB4FF",
      text1: "학원 수",
      text2: "많음",
      text3: "중",
    },
    {
      backgroundColor: "#F77373",
      text1: "문화시설 수",
      text2: "많음",
      text3: "상",
    },
    {
      backgroundColor: "#F77373",
      text1: "체육시설 수",
      text2: "많음",
      text3: "상",
    },
  ],
  "1인 가구": [
    {
      backgroundColor: "#4877F2",
      text1: "면적당 아파트 가격",
      text2: "낮음",
      text3: "하",
    },
    {
      backgroundColor: "#B08BFF",
      text1: "청장년인구 비율",
      text2: "높음",
      text3: "상",
    },
    {
      backgroundColor: "#FCC913",
      text1: "범죄 안전",
      text2: "좋음",
      text3: "중",
    },
    {
      backgroundColor: "#FFA133",
      text1: "백화점 수",
      text2: "많음",
      text3: "중",
    },
    {
      backgroundColor: "#FFA133",
      text1: "슈퍼마켓&편의점 수",
      text2: "많음",
      text3: "상",
    },
    {
      backgroundColor: "#FFA133",
      text1: "대중교통 시설 수",
      text2: "많음",
      text3: "중",
    },
    {
      backgroundColor: "#F77373",
      text1: "문화시설 수",
      text2: "많음",
      text3: "상",
    },
  ],
  신혼부부: [
    {
      backgroundColor: "#25BD69",
      text1: "1인당 도시공원 면적",
      text2: "넓음",
      text3: "중",
    },
    {
      backgroundColor: "#4877F2",
      text1: "아파트 비율",
      text2: "높음",
      text3: "상",
    },
    {
      backgroundColor: "#FFA133",
      text1: "편의시설 수",
      text2: "많음",
      text3: "중",
    },
    {
      backgroundColor: "#F77373",
      text1: "유치원 및 보육시설 수",
      text2: "많음",
      text3: "상",
    },
  ],
  "초등 학부모": [
    {
      backgroundColor: "#4877F2",
      text1: "아파트 비율",
      text2: "높음",
      text3: "상",
    },
    {
      backgroundColor: "#FCC913",
      text1: "범죄 안전",
      text2: "좋음",
      text3: "하",
    },
    {
      backgroundColor: "#FFA133",
      text1: "대형마트 수",
      text2: "많음",
      text3: "하",
    },
    {
      backgroundColor: "#4DB4FF",
      text1: "초등학교 수",
      text2: "많음",
      text3: "상",
    },
    {
      backgroundColor: "#F77373",
      text1: "의원 수",
      text2: "많음",
      text3: "중",
    },
  ],
  "중고등 학부모": [
    {
      backgroundColor: "#4877F2",
      text1: "아파트 비율",
      text2: "높음",
      text3: "상",
    },
    {
      backgroundColor: "#FCC913",
      text1: "범죄 안전",
      text2: "좋음",
      text3: "하",
    },
    {
      backgroundColor: "#FFA133",
      text1: "대형마트 수",
      text2: "많음",
      text3: "하",
    },
    {
      backgroundColor: "#4DB4FF",
      text1: "중학교 수",
      text2: "많음",
      text3: "상",
    },
    {
      backgroundColor: "#4DB4FF",
      text1: "고등학교 수",
      text2: "많음",
      text3: "상",
    },
    {
      backgroundColor: "#4DB4FF",
      text1: "학원 수",
      text2: "많음",
      text3: "상",
    },
  ],
  "반려동물 가구": [
    {
      backgroundColor: "#25BD69",
      text1: "대기 질 현황(미세먼지)",
      text2: "좋음",
      text3: "중",
    },
    {
      backgroundColor: "#25BD69",
      text1: "대기 질 현황(일산화탄소)",
      text2: "좋음",
      text3: "중",
    },
    {
      backgroundColor: "#25BD69",
      text1: "1인당 도시공원 면적",
      text2: "넓음",
      text3: "상",
    },
    {
      backgroundColor: "#4877F2",
      text1: "아파트 비율",
      text2: "높음",
      text3: "하",
    },
    {
      backgroundColor: "#4877F2",
      text1: "자가점유 비율",
      text2: "높음",
      text3: "중",
    },
    {
      backgroundColor: "#FCC913",
      text1: "교통사고 안전",
      text2: "좋음",
      text3: "하",
    },
    {
      backgroundColor: "#FFA133",
      text1: "대형 마트 수",
      text2: "많음",
      text3: "하",
    },
    {
      backgroundColor: "#FFA133",
      text1: "반려동물 관련 서비스업 수",
      text2: "많음",
      text3: "상",
    },
    {
      backgroundColor: "#F77373",
      text1: "문화시설 수",
      text2: "많음",
      text3: "상",
    },
  ],
  "은퇴 세대": [
    {
      backgroundColor: "#25BD69",
      text1: "녹지비율",
      text2: "높음",
      text3: "하",
    },
    {
      backgroundColor: "#B08BFF",
      text1: "청장년인구 비율",
      text2: "높음",
      text3: "상",
    },
    {
      backgroundColor: "#FCC913",
      text1: "감염병 안전",
      text2: "좋음",
      text3: "중",
    },
    {
      backgroundColor: "#FFA133",
      text1: "편의시설 수",
      text2: "많음",
      text3: "중",
    },
    {
      backgroundColor: "#FFA133",
      text1: "슈퍼마켓&편의점 수",
      text2: "많음",
      text3: "하",
    },
    {
      backgroundColor: "#FFA133",
      text1: "식료품점 수",
      text2: "많음",
      text3: "하",
    },
    {
      backgroundColor: "#FFA133",
      text1: "대중교통 시설 수",
      text2: "많음",
      text3: "중",
    },
    {
      backgroundColor: "#F77373",
      text1: "의원 수",
      text2: "많음",
      text3: "상",
    },
    {
      backgroundColor: "#F77373",
      text1: "약국 수",
      text2: "많음",
      text3: "상",
    },
  ],
};

const Mid = ({ onResetDropdown, changeLoading }) => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const [lifestyle, setLifestyle] = useState(null);
  const selectedLifestyle = useSelector(
    (state) => state.lifestyle.selectedLifestyle
  );

  const districts = useSelector((state) => state.districts.seoulDistricts);

  const handleResetDropdownAndLifestyle = () => {
    setLifestyle(null);
    onResetDropdown();
    setIsLoading(false);
  };

  const handleLifestyleClick = (lifestyle) => {
    setLifestyle(lifestyle);
  };

  // 분석 버튼 클릭 이벤트 핸들러
  const handleAnalyzeClick = () => {
    if (lifestyle) {
      dispatch(setSelectedLifestyle(lifestyle));

      setIsLoading(true); // 로딩 상태를 true로 설정하여 로딩 시작
      console.log("로딩상태임");
    } else {
      alert("라이프스타일을 선택해주세요.");
    }
  };

  const renderLifestyleBoxes = () =>
    lifestyleOptions.map((option) => (
      <LifestyleBox
        key={option.key}
        onClick={() => handleLifestyleClick(option.key)}
        hideText={option.detail}
        bottomText={option.text}
        imageurl={`/images/icon_life_style_${option.imageKey}.svg`}
      />
    ));

  const renderSelectedMetrics = () =>
    lifestyleMetrics[lifestyle]?.map((metric, index) => (
      <MetrixIcon
        key={index}
        imageurl={metric.imageurl}
        backgroundColor={metric.backgroundColor}
        iconText={metric.iconText}
      />
    ));

  const renderSelectedSubMetrics = () =>
    lifestyleSubMetrics[lifestyle]?.map((metric, index) => (
      <MetrixBox
        key={index}
        backgroundColor={metric.backgroundColor}
        text1={metric.text1}
        text2={metric.text2}
        text3={metric.text3}
      />
    ));

  return (
    <>
      {isLoading ? (
        <>
          <div className="py-5">
            <div className="flex text-black font-bold text-sm">
              결과 지역구 : {districts.length} 개
            </div>
          </div>
          <div className="index-select">
            <ul className="h-80 overflow-scroll index-select__selected pb-3 flex flex-row flex-wrap border border-solid border-gray-300 rounded-lg p-0 pb-15 pt-3">
              {districts.map((districtObj, index) => {
                const districtName = Object.keys(districtObj)[0]; // 객체에서 지역 이름(키) 추출
                const score = districtObj[districtName]; // 지역 이름을 사용해 점수(값) 추출

                return (
                  <div
                    key={index}
                    className="flex items-center mx-3 my-1 w-full bg-stone-100 px-3 py-1 leading-6 tracking-tighter rounded-lg"
                  >
                    <div className="flex bg-sky-500 font-bold text-white items-center justify-center w-7 h-7 rounded-full overflow-hidden">
                      {index + 1}
                    </div>
                    <li className="p-2 text-s flex items-center">
                      서울특별시 {districtName}
                      <p className="p-2 text-xs text-gray-500">
                        점수 : {score.toFixed(2)}
                      </p>
                    </li>
                  </div>
                );
              })}
            </ul>
          </div>
        </>
      ) : (
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
              {renderLifestyleBoxes()}
            </ul>
          </fieldset>
        </>
      )}

      {lifestyle && (
        <div>
          <div className="flex items-center mt-4">
            <div className="text-black font-bold text-sm pb-3">선택한 지표</div>
          </div>
          <div className="index-select">
            <ul className="index-select__selected pb-3 flex flex-row flex-wrap border border-solid border-gray-300 rounded-lg p-0 pb-15">
              {renderSelectedMetrics()}
            </ul>
            <ul className="index-select__edit flex flex-row flex-wrap items-center mt-4 ml-0 -ml-6">
              {renderSelectedSubMetrics()}
            </ul>
          </div>
        </div>
      )}
      <div className="button-wrap flex w-full mt-6">
        <button
          type="button"
          className="btn redo p-3 btn mr-2 flex justify-center align-middle items-center relative border-2 border-gray-300 rounded-lg text-base leading-none bg-gray-200 text-gray-600 h-12 focus:outline-none"
          onClick={handleResetDropdownAndLifestyle}
          style={{ width: "100px" }}
        >
          초기화
        </button>
        <button
          type="button"
          className="btn assay active bg-gradient-to-br from-blue-800 to-blue-500 rounded-md"
          onClick={handleAnalyzeClick}
          style={{ width: "247px", height: "45px", color: "white" }}
        >
          분석
        </button>
      </div>
      <Elastic selectedLifestyle={selectedLifestyle} />
    </>
  );
};

export default Mid;
