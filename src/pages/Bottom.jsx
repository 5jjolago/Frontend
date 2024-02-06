import React from 'react';
import MetrixIcon from '../components/MetrixIcon';

const Bottom = () => {
    return (
        <div>
            <div className="flex items-center mt-4">
                <div className="text-black font-bold text-sm">살고 싶은 지역</div>
            </div>
            <div className="index-select">
                <ul className="index-select__selected">
                <MetrixIcon
                imageurl="/images/icon_index_nature.svg" />
                <MetrixIcon
                imageurl="/images/icon_index_nature.svg" />
                <MetrixIcon
                imageurl="/images/icon_index_nature.svg" />
                <MetrixIcon
                imageurl="/images/icon_index_nature.svg" />
                <MetrixIcon
                imageurl="/images/icon_index_nature.svg" />
                </ul>
                <ul className="index-select__edit">

                </ul>
            </div>
        </div>
    );
};

export default Bottom;