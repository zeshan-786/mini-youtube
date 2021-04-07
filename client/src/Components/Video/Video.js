import React from "react";
const Video = ({ video: { id, title, description, url, thumnail }, setId }) => {
  return (
    <div
      style={{
        width: "29%",
        textAlign: "center",
        border: "1px solid pink",
        margin: "10px",
        borderRadius: "10px",
        cursor: "pointer",
      }}
      onClick={() => setId(id)}
    >
      <h3>{id}</h3>
      <h4>{title}</h4>
      <p>{description}</p>
      <p>{url}</p>
      <p>{thumnail}</p>
    </div>
  );
};

export default Video;
