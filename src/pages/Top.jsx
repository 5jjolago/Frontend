import React, { useEffect, useState } from 'react';
import { ReactComponent as Tooltip } from "../assets/images/icon_tooltip.svg";

const Top = ({resetDropdown }) => {
  const areasFirst = ['서울특별시'];
  const areaSecond = [
    '강남구', '강동구', '강북구', '강서구', '관악구', '광진구', '구로구', '금천구', '노원구', '도봉구', '동대문구',
    '동작구', '마포구', '서대문구', '서초구', '성동구', '성북구', '송파구', '양천구', '영등포구', '용산구', '은평구',
    '종로구', '중구', '중랑구'
  ];

  const [isDropdownOpen1, setIsDropdownOpen1] = useState(false);
  const [selectedArea1, setSelectedArea1] = useState('전국');
  const [highlightedItem1, setHighlightedItem1] = useState(null);

  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);
  const [selectedArea2, setSelectedArea2] = useState('전체');
  const [highlightedItem2, setHighlightedItem2] = useState(null);
  const [dropdownToggle, setDropdownToggle] = useState(false);

  useEffect(() => {
    if (resetDropdown) {
      setSelectedArea1('전국');
      setSelectedArea2('전체');
      setIsDropdownOpen1(false);
      setIsDropdownOpen2(false);
    }
  }, [resetDropdown]);

  const toggleDropdown1 = () => {
    setIsDropdownOpen1(!isDropdownOpen1);
    setIsDropdownOpen2(false); // 첫 번째 드롭다운 열릴 때 두 번째 드롭다운 닫기
    setDropdownToggle(true);
  };

  const handleSelectArea1 = (area) => {
    setSelectedArea1(area);
    setIsDropdownOpen1(false);
    setIsDropdownOpen2(true); // 첫 번째 드롭다운이 선택될 때 두 번째 드롭다운 열기
  };

  const toggleDropdown2 = () => {
    setIsDropdownOpen2(!isDropdownOpen2);
  };

  const handleSelectArea2 = (area) => {
    setSelectedArea2(area);
    setIsDropdownOpen2(false);
  };

  const handleMouseEnter1 = (index) => {
    setHighlightedItem1(index);
  };

  const handleMouseLeave1 = () => {
    setHighlightedItem1(null);
  };

  const handleMouseEnter2 = (index) => {
    setHighlightedItem2(index);
  };

  const handleMouseLeave2 = () => {
    setHighlightedItem2(null);
  };

  return (
    <div>
      <p className="bg-[#F4F8FF] text-xs px-3 py-2.5 leading-6 tracking-tighter rounded-lg">
        원하는 지역과 라이프스타일을 선택하여 분석할 수 있습니다.
      </p>
      <div className="flex items-center mt-4">
        <div className="text-black font-bold text-sm">살고 싶은 지역</div>
        <span className="flex items-center ml-2">
          <Tooltip className="h-full" />
        </span>
      </div>
      <div className='flex pt-2 items-center'>
        {/* 첫 번째 드롭다운 */}
        <div className="area-select-wrap mt-2 relative z-10">
        <div className="relative mr-3 inline-block text-left w-124">
            <span
              className="text-xs cursor-pointer border border-gray-300 rounded px-4 py-2 inline-flex items-center"
              onClick={toggleDropdown1}
              style={{width:"145px", fontSize:"12px"}}
            >
               <p className='selectArea2' style={{width:"140px"}}>{selectedArea1}</p>
              <svg
                className={`w-4 h-4 transition-transform transform ${isDropdownOpen1 ? 'rotate-180' : ''
                  }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 0 0-1.414 1.414l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 1 0-1.414-1.414L10 9.586 5.293 5.293a1 1 0 0 0-1.414 1.414z"
                />
              </svg>
            </span>
            {isDropdownOpen1 && (
              <ul className="absolute mt-2 bg-white border border-gray-300 rounded shadow-lg max-h-36 overflow-y-auto z-20">
                {areasFirst.map((area, index) => (
                  <li
                    key={area}
                    className={`pl-4 text-xs text-left cursor-pointer pr-16 py-2 ${highlightedItem2 === index ? 'bg-blue-100' : ''
                  }`}
                    onClick={() => handleSelectArea1(area)}
                    onMouseEnter={() => handleMouseEnter1(index)}
                    onMouseLeave={handleMouseLeave1}
                  >
                    {area}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        {/* 두 번째 드롭다운 */}
        <div className="area-select-wrap mt-2 relative z-10">
          <div className="relative inline-block text-left">
            <span
              className={`text-xs cursor-pointer border border-gray-300 rounded px-4 py-2 inline-flex items-center ${isDropdownOpen1 ? 'active' : ''}`}
              onClick={toggleDropdown2}
              style={{width:"145px", fontSize:"12px"}}
            >
              <p className='selectArea2' style={{width:"140px"}}>{selectedArea2}</p>
              <svg
                className={`w-4 h-4 transition-transform transform ${isDropdownOpen2 ? 'rotate-180' : ''
                  }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 0 0-1.414 1.414l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 1 0-1.414-1.414L10 9.586 5.293 5.293a1 1 0 0 0-1.414 1.414z"
                />
              </svg>
            </span>
            {dropdownToggle && isDropdownOpen2 && (
              <ul className="absolute mt-2 bg-white border border-gray-300 rounded shadow-lg max-h-36 overflow-y-auto z-20">
                {areaSecond.map((area, index) => (
                  <li
                    key={area}
                    className={`text-xs text-left pl-4 cursor-pointer pr-16 py-2 ${highlightedItem2 === index ? 'bg-blue-100' : ''
                      }`}
                    onClick={() => handleSelectArea2(area)}
                    onMouseEnter={() => handleMouseEnter2(index)}
                    onMouseLeave={handleMouseLeave2}
                  >
                    {area}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <a className="map-pin w-40 h-40 rounded-lg cursor-pointer ml-2" title="현재 위치 선택" style={{ backgroundImage: "url('/images/icon_map_pin.svg')", display: 'inline-block', width: '35px', height: '35px', backgroundRepeat:"no-repeat", backgroundPosition:"center", backgroundColor:"#E3EDFF"}}></a>

      </div>
    </div>
  );
};

export default Top;
