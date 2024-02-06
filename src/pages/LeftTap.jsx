import React from 'react';
import Mid from './Mid';
import Top from './Top';
import Bottom from './Bottom';

const LeftTap = () => {
    return (
        <div className="p-5">  
            <Top/>
            <Mid/>
            <Bottom/>
        </div>
    )
};

export default LeftTap;