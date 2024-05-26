import { useEffect } from "react";
import { appStore } from "../../store";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../router";
import { useIdleTimer } from "react-idle-timer";

const Net = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const handleOnUserIdle = () => {
      const { fetchMe } = appStore();
      const isOnline = () => {
        return window.navigator.onLine;
      };
      if (isOnline()) {
        fetchMe().then((res: any) => {
          if (!res?.data?.user?.id) {
            navigate(APP_ROUTES.LOGIN);
          }
        });
        useIdleTimer({
          timeout: 200,
          onIdle: handleOnUserIdle,
          debounce: 500,
        });
        navigate(APP_ROUTES.HOME);
      } else {
        navigate(APP_ROUTES.NET);
        useIdleTimer({
          timeout: 200,
          onIdle: handleOnUserIdle,
          debounce: 500,
        });
      }
    };
  }, []);
  return <div>Not set</div>;
};

export default Net;
