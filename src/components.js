import React, { Ref, PropsWithChildren } from "react";
import ReactDOM from "react-dom";
// import { cx, css } from "@emotion/css"
export const Portal = ({ children }) => {
  return typeof document === "object"
    ? ReactDOM.createPortal(children, document.body)
    : null;
};
