import React from "react";
import LogoImg from "../Images/Embrace_log_new.png"; // Adjust the import path according to your file structure

function Logo({ width = "200 px " }) {
  return (
    <div>
      <img src={LogoImg} alt="Logo" style={{ width }} />
    </div>
  );
}

export default Logo;
