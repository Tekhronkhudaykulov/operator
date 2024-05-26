import { message } from "antd";
// import { RequestTimeoutErrorType } from "../types";
import i18n from "../../i18n";
import axios from "axios";

export const ERRORS = {
  username: i18n.t("empty_username"),
  password: i18n.t("empty_password"),
  phone: i18n.t("empty_phone"),
  code: i18n.t("empty_code"),
  timeot_error: i18n.t("timeout_error"),
};

export const updateErrorsLanguage = () => {
  ERRORS.username = i18n.t("empty_username");
  ERRORS.password = i18n.t("empty_password");
  ERRORS.phone = i18n.t("empty_phone");
  ERRORS.code = i18n.t("empty_code");
  ERRORS.timeot_error = i18n.t("timeout_error");
};

i18n.on("languageChanged", () => {
  updateErrorsLanguage();
});

export const requestTimeoutError = (error: any, errorMessage: string) => {
  if (axios.isAxiosError(error) && error.code === "ECONNABORTED") {
    message.error({
      content: errorMessage,
    });
  }
};
