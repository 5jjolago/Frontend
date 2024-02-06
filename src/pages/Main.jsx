import React, { useState } from "react";
import Mid from "./Mid";
import LeftTap from "./LeftTap";

const Main = () => {
  const [isLeftTapOpen, setIsLeftTapOpen] = useState(true);

  const handleButtonClick = () => {
    setIsLeftTapOpen(!isLeftTapOpen);
  };

  return (
    <div className="w-screen h-screen relative flex">
      <div className={`w-96 h-full transition-all duration-500 transform ${isLeftTapOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <LeftTap />
      </div>
      {/* <div className="flex-grow">
        <Map
          className="w-full h-full"
          center={{ lat: 33.5563, lng: 126.79581 }}
          level={12}
        ></Map>
      </div> */}
      <button onClick={handleButtonClick} className="absolute top-0 right-0 m-4 p-2 bg-blue-500 text-white z-10">
        {isLeftTapOpen ? 'Hide' : 'Show'}
      </button>
    </div>
  );
};

export default Main;
