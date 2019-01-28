import React from "react";
import "./App.css";
import MD5 from "./test/MD5";
import FileHandler from "./test/FileHandler";
import Box from "./system/Box";

export default () => {
  return (
    <div className="App">
      <Box width={0.5} height={100}>
        <MD5 />
        <FileHandler />
      </Box>
    </div>
  );
};
