import { $api } from "./api";
// @ts-ignore
import { getLoginJson } from "../../electron/helper/filehelper";

const loginData = getLoginJson();
const loginParse = JSON.parse(loginData);

const saveIp = loginParse?.ip;

export const requests = {
  fetchOperator: () => $api.post(`${saveIp}/current-queue/`),
  fetchOperatorById: (id: any) => $api.get(`${saveIp}/operator/${id}/queue`),
  sendDataOperator: () => $api.post(`${saveIp}/queue-next`),
  signInOperators: (payload: any) => $api.post(`${saveIp}/login/`, payload),
  logout: () => $api.get(`${saveIp}/logout`),
  fetchCountQue: () => $api.get(`${saveIp}/get-queue-count-by-operator`),

  myData: () => $api.get(`${saveIp}/me`),
  setOperatorStatus: (payload: { status: number }) =>
    $api.post(`${saveIp}/set-operator-status`, payload),
  getCurrentQue: () => $api.post(`${saveIp}/current-queue/`),
  fetchOperatorQueList: () => $api.get(`${saveIp}/get-list-by-operator`),
};
