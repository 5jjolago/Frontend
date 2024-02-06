import React from 'react';

const MetrixIcon = ({ imageurl, backgroundColor, iconText }) => {
    return (
        <li className="flex w-full h-full items-center mt-15 ml-15 text-black">
            <div className={`flex items-center justify-center w-7 h-7 rounded-full overflow-hidden`} style={{backgroundColor:backgroundColor}}>
                <i className=" icon-index edu bg-cover bg-center" style={{ width: "16px", height: "16px", backgroundImage: `url("${imageurl}")` }}></i>
            </div>
            <p className="text-xs ml-1 font-medium">{iconText}</p>
        </li>
    );
};

export default MetrixIcon;
