import React, { useState } from "react";
import Mid from "./Mid";
import LeftTap from "./LeftTap";

const Main = () => {
  const [isLeftTapOpen, setIsLeftTapOpen] = useState(true);

  const handleButtonClick = () => {
    setIsLeftTapOpen(!isLeftTapOpen);
  };

  return (
    <div className="w-screen h-screen relative flex ">
  <div className={`w-96 h-full transition-all duration-500 transform`} style={{
    position: "absolute",
    zIndex: isLeftTapOpen ? 1001 : 99,
    left: isLeftTapOpen ? 0 : -395,
    width: "394px",
    height: "auto",
    backgroundColor: "#fff",
    borderRadius: "0 0 14px 0",
    boxShadow: "4px 4px 12px 0px rgba(0, 0, 0, 0.12)"
}}>
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
