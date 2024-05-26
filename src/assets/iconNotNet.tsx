import "./icon.scss";

const NotInternet = () => {
  return (
    <div className="container-not-set">
      <h3 className="not-set-head text-[35px] mb-[20px]">
        Connecting to server
      </h3>
      <div className="component PC">
        <div className="flare"></div>
      </div>
      <div className="component signals">
        <div className="dot first"></div>
        <div className="dot second"></div>
        <div className="dot third"></div>
      </div>
      <div className="component server">
        <div className="slot"></div>
        <div className="slot"></div>
        <div className="button"></div>
        <div className="button"></div>
      </div>
    </div>
  );
};

export default NotInternet;
