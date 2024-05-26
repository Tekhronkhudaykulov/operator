import { useNavigate } from "react-router-dom";
import { appStore } from "../../store";

// @ts-ignore
import { loginToFile, getLoginJson } from "../../../electron/helper/filehelper";
import { Button, Form, Input } from "antd";
import { APP_ROUTES } from "../../router";
import { useState } from "react";

const Role = () => {
  const { operatorSignIn, listLoading } = appStore();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const loginData = getLoginJson();
  const loginParse = loginData && JSON.parse(loginData);
  const [ip, setIp] = useState<any>(loginParse?.ip);

  const forms = [
    {
      label: "E-mail",
      name: "email",
      required: true,
      message: "Заполните",
      child: (
        <Input
          size="large"
          onChange={(e) => form.setFieldValue("email", e.target.value)}
        />
      ),
    },
    {
      label: "Пароль",
      name: "password",
      required: true,
      message: "Заполните",
      child: (
        <Input.Password
          size="large"
          onChange={(e) => form.setFieldValue("password", e.target.value)}
        />
      ),
    },
  ];

  const onFinish = () => {
    form.validateFields().then(() => {
      const values = form.getFieldsValue();
      values["deviceName"] = "kiosk";
      values["ip"] = loginParse?.ip;
      operatorSignIn(values).then((res: any) => {
        if (res?.data?.authorization?.token) {
          // setParamsToCookies(values["email"], values["password"]);
          navigate(APP_ROUTES.HOME);
        }
      });
    });
  };
  return (
    <div className="container mr-[auto] ml-[auto] flex justify-center flex-col items-center h-[100vh] ">
      <div className="border p-[30px] rounded-[8px]  shadow-blue-500/50">
        <p className="text-[30px] text-center font-[700]">Вход</p>
        <div className="flex flex-col w-[300px] gap-y-[20px]  img-bg">
          <Input
            className="w-full"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            size="large"
          />
          <Button
            onClick={() => {
              loginToFile({
                ...loginParse,
                ip,
              });
              window.location.reload();
            }}
            type="primary"
            className="mt-4 w-full"
            size="large"
          >
            Сохранить IP address
          </Button>
          <Form
            form={form}
            onFinish={onFinish}
            className="w-full"
            layout="vertical"
            initialValues={{
              email: loginParse?.email,
              password: loginParse?.password,
            }}
          >
            {forms.map((item, idx) => (
              <Form.Item
                key={idx}
                label={item.label}
                name={item.name}
                rules={[{ required: item.required, message: item.message }]}
              >
                {item.child}
              </Form.Item>
            ))}
            <Form.Item>
              <Button
                size="large"
                className="w-full"
                type="primary"
                htmlType="submit"
                loading={listLoading}
                disabled={listLoading}
              >
                Авторизация
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Role;
