import { useEffect, useState } from 'react';
import '@/app/globals.css'


export const EmbloyP = ({className, children, variant="default", ...props}) => {
    if (variant === "mini") {
      return (
        <p className={`text-xs dark:text-amarone text-etna ${className}`} {...props}>
              {children}
          </p>
      )

    } else {
      return (
          <p className={`page-text ${className}`} {...props}>
              {children}
          </p>
    )}
}

export const EmbloyPEditable = ({ initialText, className }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(initialText);
  
    const handleClick = () => {
      setIsEditing(true);
    };
  
    const handleBlur = () => {
      setIsEditing(false);
    };
  
    const handleChange = (e) => {
      setText(e.target.value);
    };
  
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        setIsEditing(false);
      }
    };
  
    return (
      <>
        {isEditing ? (
          <input
            type="text"
            value={text}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            autoFocus
            className={`page-header border-none focus:outline-none bg-transparent ${className}`}
          />
        ) : (
          <EmbloyP onClick={handleClick} className={`hover:cursor-pointer ${className}`}>
            {text}
          </EmbloyP>
        )}
      </>
    );
  };
  

export const EmbloyH1 = ({className, children, ...props}) => {
    return (
        <h1 className={`page-header ${className}`} {...props}>
            {children}
        </h1>
    )
}
export const EmbloyH1Editable = ({ initialText,placeholder="", className, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(initialText);

  const handleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    onUpdate(text);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setIsEditing(false);
    }
  };
  useEffect(() => {
    if (initialText === null) {
      setIsEditing(true);
    }
    setText(initialText);
  }, [initialText]);


  return (
    <>
      {isEditing || text === null || (text.trim() === "") ? (
        <input
          type="text"
          value={text}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoFocus
          className={`page-header border-none focus:outline-none bg-transparent ${className}`}
        />
      ) : (
        <EmbloyH1 onClick={handleClick} className={`hover:cursor-pointer  ${className}`}>
          {text}
        </EmbloyH1>
      )}
    </>
  );
};

