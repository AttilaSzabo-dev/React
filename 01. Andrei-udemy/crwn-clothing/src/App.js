import React from "react";
import { Route } from "react-router-dom";

import HomePage from "./pages/home-page/home-page.component";

import "./App.css";

function App() {
  return (
    <div>
      <Route path="/">
        <HomePage/>
      </Route>
    </div>
  );
}

export default App;
