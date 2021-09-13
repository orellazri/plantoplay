import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import Config from "./config.json";
import "./index.css";
import App from "./App";

axios.defaults.baseURL = Config.SERVER_URL;
axios.defaults.headers.post["Content-Type"] = "application/json";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
