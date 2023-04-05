import React from "react";
import Header from "./Header";
const Container = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 py-10">{children}</div>
    </div>
  );
};

export default Container;
