import React from "react";
const Error = ({ errors }) => {
  return (
    <div
      style={{
        width: "30%",
        textAlign: "center",
        border: "3px solid red",
        margin: "10px",
        borderRadius: "10px",
      }}
    >
        {
            errors.map( (error, index) => <p key={index}>{error}</p>)
        }
    </div>
  );
};

export default Error;
