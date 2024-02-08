import React from 'react';



const Button = ({ imageSrc, userName }) => {
    const circleColor = imageSrc ? 'bg-green-400' : 'bg-red-400';

    return (
        <button className={`w-10 h-10 rounded-full ${circleColor}`}>
            {imageSrc && <img src={imageSrc} alt="Image" />}
        </button>
    );
};

export default Button;