import React, { useState } from 'react';



const Button = () => {
    const [authStatus, setAuthStatus] = useState(false);

    const toggle = () => {
        setAuthStatus(!authStatus);
    }
    if (authStatus) {
        return (
            <button className="w-10 h-10 rounded-full bg-amber-300 " onClick={toggle}/>
        );
    } else {
        return (
            <button className="px-4 h-10 rounded-full font-normal border-[1px] border-gray-700 text-gray-400" onClick={toggle}>Sign In</button>
        );
    }

};

export default Button;