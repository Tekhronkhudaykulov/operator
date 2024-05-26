import { FC, ReactNode, useEffect, useState } from "react";
import { Footer, Navbar } from "../layouts";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from ".";
import { appStore } from "../store";
import "./animation.scss";
import NotInternet from "../assets/iconNotNet";

interface Props {
  child?: ReactNode;
}

const PrivateRoute: FC<Props> = ({ child }) => {
  const navigate = useNavigate();
  const { fetchMe } = appStore();

  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    fetchMe().then((res) => {
      if (res?.response?.status > 300) {
        navigate(APP_ROUTES.LOGIN);
      }
    });
  }, []);

  return (
    <>
      {isOnline ? (
        <>
          <Navbar />
          <div className={`py-[23px] h-full overflow-y-auto `}>{child}</div>
          <Footer />
        </>
      ) : (
        <div>
          <NotInternet />
        </div>
      )}
    </>
  );
};

export default PrivateRoute;
