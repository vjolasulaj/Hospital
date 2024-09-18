import React from "react";
import { BounceLoader } from "react-spinners";
import "../styles/Loader.css";

const Loader = () => {
  return (
    <div className="loader-container">
      <BounceLoader color="#5653ec" loading speedMultiplier={1} />
    </div>
  );
};
export default Loader;