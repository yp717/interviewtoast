import "./src/styles/global.css";
import React from "react";
import { wrapPageElement as RootWrapper } from "./wrapPageElement";

export const wrapPageElement = ({ element, props }) => {
  return <RootWrapper element={element} props={props} />;
};
