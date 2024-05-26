import "./App.css";
import Router from "./router/Router";
import { ConfigProvider } from "antd";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";
import "./assets/font/fonts.css";

const App = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <ConfigProvider>
        <Router />
      </ConfigProvider>
    </I18nextProvider>
  );
};

export default App;
