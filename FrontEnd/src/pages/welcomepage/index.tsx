import { Button, Card, Spin, Typography } from "antd";
import { useGetUserProfile } from "../../network/users";
import { useLogOut } from "../../network/auth";
import { useNavigate } from "react-router";
import classes from "./welcome.module.css";

const WelcomePage = () => {
  const { isLoading, data } = useGetUserProfile();
  const { mutateAsync } = useLogOut();
  const navigate = useNavigate();
  console.log(isLoading , data) 
  const logOut = async () => {
    await mutateAsync();
    localStorage.removeItem("userId");
    navigate("/register");
  };

  return (
    <div className={classes.welcomeWrapper}>
      <Spin spinning={isLoading}>
        <Card className={classes.welcomeCard}>
          {data && (
            <>
              <Typography.Title className={classes.welcomeTitle}>
                🎉 Welcome, {data.name}! 🎉
              </Typography.Title>
              <Typography.Text className={classes.welcomeText}>
                You've successfully completed the authentication module and
                unlocked access to our platform.
              </Typography.Text>
              <Typography.Text className={classes.instructionText}>
                Get ready to explore and enjoy a seamless experience!
              </Typography.Text>
            </>
          )}
          <Button className={classes.logoutButton} onClick={logOut} type="primary">
            Logout
          </Button>
        </Card>
      </Spin>
    </div>
  );
};

export default WelcomePage;
