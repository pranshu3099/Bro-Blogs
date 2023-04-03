import { Input, Button } from "@chakra-ui/react";
import user from "/media/pranshu/My Passport/my-blog/src/icons/user.png";
import email from "/media/pranshu/My Passport/my-blog/src/icons/email.png";
import phone from "/media/pranshu/My Passport/my-blog/src/icons/phone.png";
import eye from "/media/pranshu/My Passport/my-blog/src/icons/eye.png";
import { useReducer, useEffect, useState } from "react";
import axios from "axios";

const Signup = () => {
  const password_validate = (password) => {
    return (
      /(?=.*[A-Z])/.test(password) &&
      /(?=.{7,12}$)/.test(password) &&
      /[ -\/:-@\[-\`{-~]/.test(password) &&
      /(?=.*[0-9])/.test(password)
    );
  };
  const signupReducer = (data, action) => {
    switch (action.type) {
      case "pending":
        return data;
      case "name":
        return { ...data, name: action.name };
      case "mobile_number":
        return { ...data, mobile_number: action.mobile_number };
      case "email":
        return { ...data, email: action.email };
      case "password":
        if (!password_validate(action.password)) {
          return {
            ...data,
            password: action.password,
            passwordvalidate: action.passwordvalidate,
          };
        }
        return { ...data, password: action.password, passwordvalidate: false };
      case "confirm_password":
        if (!password_validate(action.password_confirmation)) {
          return {
            ...data,
            password_confirmation: action.password_confirmation,
            confimpasswordvalidate: action.confimpasswordvalidate,
          };
        }
        if (data.password !== action.password_confirmation) {
          return {
            ...data,
            password_confirmation: action.password_confirmation,
            confimpasswordvalidate: false,
            matchpassword: true,
          };
        }
        return {
          ...data,
          password_confirmation: action.password_confirmation,
          confimpasswordvalidate: false,
          matchpassword: false,
        };
      default:
        throw new Error("type not matched");
    }
  };
  const [data, dispatch] = useReducer(signupReducer, {
    name: "",
    password: "",
    password_confirmation: "",
    email: "",
    mobile_number: "",
    type: "pending",
    passwordvalidate: false,
    confimpasswordvalidate: false,
    matchpassword: false,
  });

  const showPassword = (e) => {
    const password = document.getElementById("password");
    const cnfpassword = document.getElementById("confirm_password");
    if (e.target.id === "password-icon") {
      const type =
        password.getAttribute("type") === "Password" ? "text" : "Password";
      password.setAttribute("type", type);
    } else if (e.target.id === "cnf-password-icon") {
      const cnftype =
        cnfpassword.getAttribute("type") === "Password" ? "text" : "Password";
      cnfpassword.setAttribute("type", cnftype);
    }
  };

  function fetchdata() {
    axios
      .post("http://127.0.0.1:8000/api/auth/register", data)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchdata();
  };
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
              placeholder="your name"
              width={"500px"}
              margin={5}
              variant="flushed"
              name="name"
              value={data.name}
              onChange={(e) => {
                dispatch({ ...data, name: e.target.value, type: "name" });
              }}
            />
            <img className="sign-up-icons" src={user} alt="" />
            <Input
              type="number"
              placeholder="mobile number"
              width={"500px"}
              margin={5}
              variant="flushed"
              name="mobile_number"
              value={data.mobile_number}
              onChange={(e) => {
                dispatch({
                  ...data,
                  mobile_number: e.target.value,
                  type: "mobile_number",
                });
              }}
            />
            <img className="sign-up-icons" src={phone} alt="" />
            <Input
              type="email"
              placeholder="email"
              width={"500px"}
              margin={5}
              variant="flushed"
              name="email"
              value={data.email}
              onChange={(e) => {
                dispatch({ ...data, email: e.target.value, type: "email" });
              }}
            />
            <img className="sign-up-icons" src={email} alt="" />
            <Input
              id="password"
              type="Password"
              placeholder="password"
              width={"500px"}
              margin={5}
              variant="flushed"
              name="password"
              value={data.password}
              onChange={(e) => {
                dispatch({
                  ...data,
                  password: e.target.value,
                  passwordvalidate: true,
                  type: "password",
                });
              }}
            />
            <img
              className="sign-up-icons"
              id="password-icon"
              src={eye}
              alt=""
              onClick={showPassword}
            />
            {data.passwordvalidate && (
              <div className="password">
                <div>
                  <p>Password should contain at least one capital char</p>
                  <p>The length of the password should be bewteen 7 to 12</p>
                  <p>The password must contain atleast one special character</p>
                  <p>password atleast contain a number</p>
                </div>
              </div>
            )}
            <Input
              type="Password"
              placeholder="confirm password"
              id="confirm_password"
              width={"500px"}
              margin={5}
              variant="flushed"
              name="confirm_password"
              value={data.password_confirmation}
              onChange={(e) => {
                dispatch({
                  ...data,
                  password_confirmation: e.target.value,
                  confimpasswordvalidate: true,
                  type: "confirm_password",
                });
              }}
            />{" "}
            <img
              className="sign-up-icons"
              id="cnf-password-icon"
              src={eye}
              alt=""
              onClick={showPassword}
            />
            {data.confimpasswordvalidate && (
              <div className="password">
                <div>
                  <p>Password should contain at least one capital char</p>
                  <p>The length of the password should be bewteen 7 to 12</p>
                  <p>The password must contain atleast one special character</p>
                  <p>password atleast contain a number</p>
                </div>
              </div>
            )}
            {data.matchpassword && (
              <div className="password">Password does not match</div>
            )}
            <Button colorScheme="blue" mr={3} mt={3} onClick={handleSubmit}>
              Signup
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Signup;
