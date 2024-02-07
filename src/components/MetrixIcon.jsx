import React from 'react';

const MetrixIcon = ({ imageurl, backgroundColor, iconText }) => {
    return (
        <li className="flex h-full items-center leading-7 mt-4 ml-4 text-gray-700">
            <div className={`flex  items-center justify-center w-7 h-7 rounded-full overflow-hidden`} style={{backgroundColor:backgroundColor}}>
                <i className=" icon-index edu bg-cover bg-center" style={{ width: "16px", height: "16px", backgroundImage: `url("${imageurl}")` }}></i>
            </div>
            <p className="text-xs ml-1 font-medium text-center align-middle">{iconText}</p>
        </li>
    );
};

export default MetrixIcon;
