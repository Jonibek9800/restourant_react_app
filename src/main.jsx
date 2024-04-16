import React from "react";
import { createContext } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { stores } from "./store/index.js";

export const NavigateContext = createContext();

ReactDOM.createRoot(document.getElementById("root")).render(
  <NavigateContext.Provider value={"/"}>
    <Provider store={stores}>
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    </Provider>
  </NavigateContext.Provider>
);
