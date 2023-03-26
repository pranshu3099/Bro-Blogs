import { Input, Button } from "@chakra-ui/react";
import user from "/media/pranshu/My Passport/my-blog/src/icons/user.png";
import email from "/media/pranshu/My Passport/my-blog/src/icons/email.png";
import phone from "/media/pranshu/My Passport/my-blog/src/icons/phone.png";
import eye from "/media/pranshu/My Passport/my-blog/src/icons/eye.png";

const Signup = () => {
  return (
    <>
      <div className="signup">
        <h1 className="signup-h1">
          Hey there!! Welcome to Bro Blogs sign-up and start writing your blog
        </h1>
      </div>
      <form action="">
        <div className="signup-container">
          <div>
            <Input
              type="text"
              placeholder="Your name"
              width={"500px"}
              margin={5}
              variant="flushed"
            />
            <img className="sign-up-icons" src={user} alt="" />
            <Input
              type="number"
              placeholder="Mobile number"
              width={"500px"}
              margin={5}
              variant="flushed"
            />
            <img className="sign-up-icons" src={phone} alt="" />
            <Input
              type="email"
              placeholder="email"
              width={"500px"}
              margin={5}
              variant="flushed"
            />
            <img className="sign-up-icons" src={email} alt="" />
            <Input
              type="Password"
              placeholder="password"
              width={"500px"}
              margin={5}
              variant="flushed"
            />
            <img className="sign-up-icons" src={eye} alt="" />
            <Input
              type="Password"
              placeholder="Reenter the password"
              width={"500px"}
              margin={5}
              variant="flushed"
            />{" "}
            <img className="sign-up-icons" src={eye} alt="" />
            <Button colorScheme="blue" mr={3}>
              Login
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Signup;
