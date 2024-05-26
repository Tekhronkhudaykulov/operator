// import Operator from "../../../public/Operator.png";
import { useEffect } from "react";
import Logo from "../../assets/images/img_gai.png";
import { appStore } from "../../store";
import QueueCard from "../../components/queueCard";
import "./style.scss";
import Button from "@mui/material/Button";
import { Switch, message } from "antd";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import QueUe from "../../assets/icon";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../router";

const Home = () => {
  const {
    operatorSendData,
    currentQue,
    getCurrentQue,
    user,
    operatorStatusLoading,
    setOperatorStatus,
    listLoadingForSend,
    getQueCount,
    count,
  } = appStore();

  useEffect(() => {
    getCurrentQue();
    getQueCount();
  }, []);

  const navigate = useNavigate();

  return (
    <>
      <div>
        <div className="flex  items-center bg-[#004138] py-[3px] ">
          <div
            onDoubleClick={() => {
              Cookies.remove("token");
              navigate(APP_ROUTES.LOGIN);
            }}
            className="w-[300px] flex items-center justify-center"
          >
            <img src={Logo} className="w-[200px] h-[200px]" alt="" />
          </div>
          <p className="text-center  text-[45px] mr-auto text-white">
            Электронная очередь / Elektron navbat
          </p>
          <div className="flex items-center gap-8 text-white text-[36px] mx-12">
            Статус
            <Switch
              onChange={() => {
                if (user?.operator_status?.int === 1) {
                  setOperatorStatus({ status: 2 }).then(
                    (res) =>
                      res?.message === "success" &&
                      message.success({ content: "Вы не активны" })
                  );
                } else {
                  setOperatorStatus({ status: 1 }).then(
                    (res) =>
                      res?.message === "success" &&
                      message.info({ content: "Вы активны" })
                  );
                }
              }}
              checked={user?.operator_status?.int === 1 ? true : false}
              className="bg-red w-[4rem] h-[2rem] [&>div]:!top-[50%] [&>div]:translate-y-[-50%]"
              loading={operatorStatusLoading}
              disabled={operatorStatusLoading}
            />
          </div>
        </div>
        <div>
          <div>
            <div className="grid grid-cols-2 h-[200px]  text-white">
              <div className="bg-[#2EA006] uppercase flex items-center text-center text-[40px] !font-bold justify-center ">
                обслуживается / hizmat ko`rsatilmoqda
              </div>
              <div className="grid">
                <Button
                  variant="outlined"
                  className="!bg-[#DB0000] uppercase !text-white  h-[100%] W-[100%] !text-[40px] !font-bold"
                  onClick={() => {
                    operatorSendData().then((res) => {
                      if (res.message !== "success") {
                        message.info({ content: "Hozigi vaqtda navbat yoq!" });
                      }
                      getCurrentQue().then(() => {
                        getQueCount();
                      });
                    });
                  }}
                  endIcon={<ArrowForwardIcon className="!text-[52px] ml-4" />}
                >
                  {listLoadingForSend ? "Loading..." : " Keyingi/Следующий"}
                </Button>
              </div>
            </div>
            <div className="mt-[20px] grid grid-cols-2">
              <div className="felx items-center justify-center">
                <QueueCard
                  title={currentQue?.prefix}
                  num={currentQue?.number}
                  bg="#2EA006"
                  textBg="#2EA006"
                />
              </div>
              <div className="flex items-center">
                <QueUe />
                <div className="flex items-center justify-center flex-col">
                  <p className="text-[90px]">{count?.count}</p>
                  <p className="text-[40px]">Navbatda turganlar</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
