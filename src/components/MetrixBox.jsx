import React from "react";

const MetrixBox = ({ backgroundColor, text1, text2, text3 }) => {
  return (
    <li
      className="text1 text-xs font-bold rounded-lg bg-white text-white px-7 py-6 my-6 mx-6"
      style={{ backgroundColor: backgroundColor, height:"32px", padding:"6px", margin:"6px 0px 0px 6px" }}
    >
      {text1}
      <span className="text2 value ml-3 bg-white rounded-md px-4 py-1 text-xs leading-4" style={{padding:"1px 4px 1px 4px", marginLeft:"3px", color: "#606060"}}>
        {text2}
      </span>
      <span className="text3 value ml-3 bg-white rounded-md px-4 py-1 text-xs leading-4" style={{ padding: "1px 4px", marginLeft: "3px", color: "#606060" }}
>
        {text3}
      </span>
    </li>
  );
};

export default MetrixBox;
