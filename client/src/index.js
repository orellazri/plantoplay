import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import axios from "axios";

import Config from "./config.json";
import "./index.css";
import App from "./App";
import store from "./store";

axios.defaults.baseURL = Config.SERVER_URL;
axios.defaults.headers.post["Content-Type"] = "application/json";

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
