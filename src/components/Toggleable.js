import React, { useImperativeHandle, useState } from "react";
import PropTypes from "prop-types";

const Toggleable = React.forwardRef(({ children, buttonLabel }, refs) => {
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
        id={`${buttonLabel.toLowerCase().split(" ").join("-")}`}
      >
        {buttonLabel}
      </button>
      <div style={{ display: isVisible ? "block" : "none" }}>
        <>{children}</>
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  );
});

Toggleable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

Toggleable.displayName = "Toggleable";

export default Toggleable;
