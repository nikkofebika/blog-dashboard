import React from "react";

const Badge = ({ bg, text }) => {
  return <span className={`badge ${bg}`}>{text}</span>;
};

export default Badge;
