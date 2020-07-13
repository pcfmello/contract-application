import React from "react";
import ReactLoading from "react-loading";

const Loading = () => (
  <div className="d-flex justify-content-center align-items-center p-5">
    <ReactLoading type="bubbles" color="grey" height={"40%"} width={"40%"} />
  </div>
);

export default Loading;
