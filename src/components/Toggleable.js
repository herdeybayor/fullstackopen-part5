import React, { useImperativeHandle, useState } from "react";

function Toggleable({ children, buttonLabel }, refs) {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible((prevValue) => !prevValue);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      <button
        style={{ display: isVisible ? "none" : "block" }}
        onClick={toggleVisibility}
      >
        {buttonLabel}
      </button>
      <div style={{ display: isVisible ? "block" : "none" }}>
        <>{children}</>
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  );
}

export default React.forwardRef(Toggleable);
