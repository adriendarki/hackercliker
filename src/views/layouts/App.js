import React from "react";
import { BrowserRouter } from "react-router-dom";

// import "./App.scss";
import { Content } from "./";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Content />
      </BrowserRouter>
    </div>
  );
}

export default App;