import blog from "/home/pranshu/Bro Blogs/Bro-Blogs/src/images/blog.jpg";
import email from "/home/pranshu/Bro Blogs/Bro-Blogs/src/icons/email.png";
import eye from "/home/pranshu/Bro Blogs/Bro-Blogs/src/icons/eye.png";
import hidden from "/home/pranshu/Bro Blogs/Bro-Blogs/src/icons/hidden.png";
import { Input, Button } from "@chakra-ui/react";
import React from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/Provider";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  let [data, setData] = React.useState({
    email: "",
    password: "",
  });
  let [requiredFields, setRequireFields] = React.useState({});
  let [error, setError] = React.useState({
    email: "",
    password: "",
  });
  let { auth, setAuth, setRes, responseData } = useAuthContext();
  let changeIcon = (e, icon) => {
    if (icon === eye) {
      e.target.attributes.src.textContent = hidden;
    } else {
      e.target.attributes.src.textContent = eye;
    }
  };

  const showPassword = (e) => {
    const password = document.getElementById("password");
    const icon = e.target.attributes.src.textContent;
    if (e.target.id === "password-icon") {
      changeIcon(e, icon);
      const type =
        password.getAttribute("type") === "Password" ? "text" : "Password";
      password.setAttribute("type", type);
    }
  };

  function checkRequiredfields() {
    const res = {};
    Object.keys(data).forEach((key) => {
      if (data[key] === "") {
        res[key] = true;
      }
    });
    if (Object.keys(res).length) {
      setRequireFields(res);
      return false;
    } else {
      setRequireFields({});
      return true;
    }
  }

  function fetchdata() {
    axios
      .post("http://localhost:3000/login", data)
      .then((response) => {
        if (response.status === 200) {
          setAuth(true);
          setRes(response);
          localStorage.setItem("Bearer", response.data.Authorization);
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
        // setError(err.response.data.error);
      });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (checkRequiredfields()) {
      fetchdata();
    }
  };

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
              value={data.email}
              onChange={(e) => {
                setData({
                  ...data,
                  email: e.target.value,
                });
              }}
            />
            <img src={email} alt="" className="login-icons" />
            {requiredFields?.email && <div>The email field is required</div>}
            {error?.email && <div>{error?.email}</div>}
            <Input
              type="Password"
              id="password"
              placeholder="password"
              width={"500px"}
              margin={5}
              variant="flushed"
              onChange={(e) => {
                setData({
                  ...data,
                  password: e.target.value,
                });
              }}
            />{" "}
            <img
              src={eye}
              id="password-icon"
              alt=""
              className="login-icons"
              onClick={showPassword}
            />
            {requiredFields.password && (
              <div>The passsword field is required</div>
            )}
            {error.password && <div>{error.password}</div>}
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Login
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};
export default Login;
