import {
  App,
  Button,
  Card,
  Form,
  Input,
  Typography,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useSignUp } from "../../network/auth";
import classes from "./signup.module.css";

interface FormValues {
  name: string;
  password: string;
  email: string;
}

const SignUp = () => {
  const { mutateAsync, isPending } = useSignUp();
  const { notification } = App.useApp();
  const navigate = useNavigate();

  const submitUser = async (values: FormValues) => {
    try {
      await mutateAsync({
        email: values.email,
        password: values.password,
        name: values.name,
      });
      navigate("/login");
      notification.success({
        message: "You are signed up successfully",
        placement: "bottom",
      });
    } catch (error: any) {
      notification.error({ message: error.response.data.error, placement: "bottom" });
    }
  };

  return (
    <div className={classes.signUpWrapper}>
      <div className={classes.leftContainer}>
        <Card className={classes.signUpCard}>
          <Typography.Title>Sign Up</Typography.Title>
          <Typography.Text>
            Create an account or{" "}
            <Link className={classes.signInLink} to={"/login"}>
              Sign In
            </Link>
          </Typography.Text>
          <Form<FormValues>
            layout="vertical"
            preserve={false}
            requiredMark={true}
            onFinish={(values) => submitUser(values)}
          >
            <Form.Item
              name="name"
              label="User Name"
              rules={[
                {
                  required: true,
                  min: 3,
                  message: "User Name should be at least 3 characters",
                },
              ]}
            >
              <Input prefix={<UserOutlined />} />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  type: "email",
                  required: true,
                  message: "Invalid Email Format",
                },
              ]}
            >
              <Input prefix={<UserOutlined />} />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  pattern: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
                  message:
                    "Password must be at least 8 characters, including a special character, number, and letter",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Button loading={isPending} htmlType="submit" type="primary" block>
              Sign Up
            </Button>
          </Form>
        </Card>
      </div>
      <div className={classes.rightContainer}>
        <Typography.Title className={classes.welcomeText}>
          Welcome to Our Platform
        </Typography.Title>
        <Typography.Text className={classes.descriptionText}>
          Join us and explore amazing features.
        </Typography.Text>
        <div className={classes.credits}>
          <Typography.Text className={classes.appInfo}>
            This is an authentication module only.
          </Typography.Text>
          <Typography.Text className={classes.devInfo}>
            Developed by <strong>Menna Ayman</strong>
          </Typography.Text>
          <Typography.Text className={classes.contactInfo}>
            Contact: <a href="mailto:mennaayman94@gmail.com">mennaayman94@gmail.com</a>
          </Typography.Text>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
