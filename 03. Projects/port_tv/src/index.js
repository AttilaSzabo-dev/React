import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import TvControllerProvider from "./context/TvControllerProvider";

import "./index.css";

ReactDOM.render(
  <TvControllerProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </TvControllerProvider>,
  document.getElementById("tvAppRoot")
);
