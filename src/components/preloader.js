import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const Preloader = () => {
  return (
    <div className="loading__container">
      <CircularProgress color="secondary" size={80} />
    </div>
  );
};

export { Preloader };
