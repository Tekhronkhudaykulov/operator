import { SetState, create } from "zustand";
import { devtools } from "zustand/middleware";
import { requests } from "../helpers/requests";
import { $api, getToken } from "../helpers/api";
// @ts-ignore

import { loginToFile } from "../../electron/helper/filehelper";
import { message } from "antd";
// import { useNavigate } from "react-router-dom";

interface StateAction {
  fetchMe: () => Promise<any>;
  setOperatorStatus: (params: { status: number }) => Promise<any>;
  operatorSignIn: () => Promise<any>;
  getCurrentQueNumber: () => Promise<any>;
  operatorSendData: () => Promise<any>;
  getCurrentQue: () => Promise<any>;
  getQueCount: () => Promise<any>;

  listLoading: boolean;
  operatorStatusLoading: boolean;

  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    operator_status?: { int: number; string: string };
  };
  meLoading: boolean;
  currentQue: {
    prefix: any;
    category_id: any;
    number: any;
  };
  listLoadingForSend: boolean;
  operatorQueList: {
    DONE: [];
    WAITING: [];
  };
  count: any;
}

const initialState: StateAction = {
  fetchMe: async () => {},
  setOperatorStatus: async () => {},
  operatorSignIn: async () => {},
  getCurrentQueNumber: async () => {},
  operatorSendData: async () => {},
  getCurrentQue: async () => {},
  getQueCount: async () => {},

  listLoading: false,
  operatorStatusLoading: false,
  listLoadingForSend: false,
  count: null,
  token: "",
  user: {
    id: 1,
    name: "",
    email: "",
    operator_status: { int: 1, string: "АКТИВНЫЙ" },
  },
  meLoading: false,
  currentQue: {
    prefix: null,
    category_id: null,
    number: null,
  },
  operatorQueList: {
    DONE: [],
    WAITING: [],
  },
};

const categoryStore = create(
  devtools((set: SetState<StateAction>) => ({
    ...initialState,
    fetchMe: async () => {
      set({ meLoading: true });
      try {
        const { data } = await requests.myData();
        set({ user: data?.data?.user });
        return data;
      } catch (err) {
        return err;
      } finally {
        set({ meLoading: false });
      }
    },

    setOperatorStatus: async (payload) => {
      set({ operatorStatusLoading: true });
      try {
        const { data } = await requests.setOperatorStatus(payload);
        set((state: any) => {
          return {
            ...state,
            user: { ...state.user, operator_status: { int: payload.status } },
          };
        });
        return data;
      } catch (err) {
        return err;
      } finally {
        set({ operatorStatusLoading: false });
      }
    },

    operatorSignIn: async (payload: any) => {
      set({ listLoading: true });
      try {
        const data = await requests.signInOperators(payload);
        console.log(data);
        if (data.status === 200) {
          loginToFile({
            deviceName: payload?.deviceName,
            email: payload?.email,
            password: payload?.password,
            ip: payload?.ip,
            token: data?.data?.data?.authorization?.token,
          });
          $api.defaults.headers.common.Authorization = `Bearer ${data?.data?.data?.authorization?.token}`;
        } else {
          message.error({ content: data?.data?.message });
        }
        return data.data;
      } catch (err: any) {
        if (err?.response?.data?.message) {
          message.error({ content: err?.response?.data?.message });
        }
        return err;
      } finally {
        set({ listLoading: false });
      }
    },

    getCurrentQueNumber: async () => {
      set({ listLoading: true });
      getToken();
      try {
        const { data } = await requests.getCurrentQue();
        set({ currentQue: data.data });
        return data;
      } catch (err) {
        return err;
      } finally {
        set({ listLoading: false });
      }
    },
    operatorSendData: async () => {
      set({ listLoadingForSend: true });
      try {
        const { data } = await requests.sendDataOperator();
        // set({ currentQue: data.data });
        return data;
      } catch (err) {
        return err;
      } finally {
        set({ listLoadingForSend: false });
      }
    },
    getCurrentQue: async () => {
      set({ listLoading: true });
      try {
        const { data } = await requests.fetchOperator();
        set({ currentQue: data.data });
        return data;
      } catch (err) {
        // alert("Navbat yoq");
        return err;
      } finally {
        set({ listLoading: false });
      }
    },
    getQueCount: async () => {
      set({ listLoading: true });
      try {
        const { data } = await requests.fetchCountQue();
        set({ count: data.data });
        return data;
      } catch (err) {
        // alert("Navbat yoq");
        return err;
      } finally {
        set({ listLoading: false });
      }
    },
  }))
);

export default categoryStore;

// get - queue - count - by - operator;
