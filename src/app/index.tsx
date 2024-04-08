import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../store";
import App from "./app";

export const Root = () => (
  <Provider store={store}>
    <BrowserRouter basename="/calendar-app">
      <App />
    </BrowserRouter>
  </Provider>
);
