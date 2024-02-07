import React, { useState } from "react";

const LifestyleBox = ({ hideText, bottomText, imageurl, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleLifeStyleClick = () => {
    
  }
  return (
    <li className="mr-0 w-20 h-20 p-2">
      <label>
        <button
          className=" bg-white  text-white left-0 w-full h-full border border-gray-300 rounded-lg p-0 pb-15 cursor-pointer text-xs leading-4 flex items-center justify-center text-center bg-no-repeat bg-center relative rounded"
          style={{ backgroundImage: `url("${imageurl}")` }}
          type="radio"
          name="lifeStyle"
          value="newlyweds"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={onClick}
        >
          <span className={`absolute left-0 w-full h-full cursor-pointer text-xs leading-4 bg-[rgba(13,21,42,.7)] text-white flex items-center justify-center text-center transition-opacity duration-300 ${isHovered ? "opacity-1" : "opacity-0"}`}>
            {hideText}
          </span>
        </button>
      </label>
      <p className={`block text-center mt-1 cursor-pointer text-xs leading-5 text-center text-sm ${isHovered ? "text-blue-500" : "text-gray-600"}`}>{bottomText}</p>
    </li>
  );
};

export default LifestyleBox;
