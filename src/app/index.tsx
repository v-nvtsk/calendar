import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../store";
import App from "./app";

declare let PUBLIC_PATH: string;
if (!PUBLIC_PATH) PUBLIC_PATH = "/";

export const Root = () => (
  <Provider store={store}>
    <BrowserRouter basename={PUBLIC_PATH}>
      <App />
    </BrowserRouter>
  </Provider>
);
