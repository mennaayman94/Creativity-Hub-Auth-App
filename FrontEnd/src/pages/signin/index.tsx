import { App, Button, Card, Form, Input, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useLogin } from "../../network/auth";
import { useNavigate } from "react-router-dom";
import classes from "./signin.module.css";

interface FormValues {
  password: string;
  email: string;
}

const SignIn = () => {
  const { mutateAsync, isPending } = useLogin();
  const { notification } = App.useApp();
  const navigate = useNavigate();

  const submitLogin = async (values: FormValues) => {
    try {
      const res = await mutateAsync({
        email: values.email,
        password: values.password,
      },);
      navigate("/profile");
      localStorage.setItem("userId", res.userId);
      notification.success({
        message: "You are signed in successfully",
        placement: "bottom",
      });
    } catch (error: any) {
      notification.error({ message: error.response.data.error, placement: "bottom" });
    }
  };

  return (
    <div className={classes.signInWrapper}>
      <Card className={classes.signInCard}>
        <Typography.Title className={classes.title}>Sign In</Typography.Title>
        <Typography.Text className={classes.subtitle}>
          Welcome to Creativity Hub. Enter your details to continue.
        </Typography.Text>
        <Form<FormValues>
          layout="vertical"
          requiredMark={false}
          onFinish={(values) => submitLogin(values)}
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { type: "email", message: "Invalid Email Format" },
              { required: true, message: "Email is required" },
            ]}
          >
            <Input prefix={<UserOutlined />} />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Password is required" }]}
          >
            <Input.Password />
          </Form.Item>
          <Button loading={isPending} htmlType="submit" type="primary" block>
            Sign In
          </Button>
        </Form>
        <div className={classes.credits}>
          <Typography.Text className={classes.appInfo}>
            This is an authentication module only. 
          </Typography.Text>
          <Typography.Text className={classes.devInfo}>
            Developed by <strong>Menna Ayman </strong> 
          </Typography.Text>
          <Typography.Text className={classes.extraInfo}>
            Built with security and simplicity in mind.
          </Typography.Text>
        </div>
      </Card>
    </div>
  );
};

export default SignIn;
