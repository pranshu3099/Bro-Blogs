import blog from "/media/pranshu/My Passport/my-blog/src/images/blog.jpg";
import email from "/media/pranshu/My Passport/my-blog/src/icons/email.png";
import eye from "/media/pranshu/My Passport/my-blog/src/icons/eye.png";
import { Input, Button } from "@chakra-ui/react";
const Login = () => {
  return (
    <>
      <div className="login">
        <h1 className="login-h1">
          Welcome!! Start Writing Your Tech Blog Today
        </h1>
      </div>
      <form action="">
        <div className="login-container">
          <img className="login-img" src={blog} alt="" />
          <div>
            <Input
              type="email"
              placeholder="email"
              width={"500px"}
              margin={5}
              variant="flushed"
            />
            <img src={email} alt="" className="login-icons" />
            <Input
              type="Password"
              placeholder="password"
              width={"500px"}
              margin={5}
              variant="flushed"
            />{" "}
            <img src={eye} alt="" className="login-icons" />
            <Button colorScheme="blue" mr={3}>
              Login
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;
