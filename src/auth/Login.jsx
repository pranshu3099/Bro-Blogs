import blog from "/media/pranshu/My Passport/my-blog/src/images/blog.jpg";
import { Input, Button } from "@chakra-ui/react";
const Login = () => {
  return (
    <>
      <div className="login">
        <h1 className="login-h1">
          Welcome!! Start Writing Your Tech Blog Today
        </h1>
      </div>
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
          <br />
          <Input
            type="Password"
            placeholder="password"
            width={"500px"}
            margin={5}
            variant="flushed"
          />{" "}
          <br />
          <Button colorScheme="blue" mr={3}>
            Submit
          </Button>
        </div>
      </div>
    </>
  );
};

export default Login;
