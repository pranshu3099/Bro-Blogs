import { Input, Button } from "@chakra-ui/react";
import user from "/media/pranshu/My Passport/my-blog/src/icons/user.png";
import email from "/media/pranshu/My Passport/my-blog/src/icons/email.png";
import phone from "/media/pranshu/My Passport/my-blog/src/icons/phone.png";
import eye from "/media/pranshu/My Passport/my-blog/src/icons/eye.png";
import hidden from "/media/pranshu/My Passport/my-blog/src/icons/hidden.png";
import { useReducer, useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useMemo } from "react";

const Signup = () => {
  const password_validate = (password) => {
    return (
      /(?=.*[A-Z])/.test(password) &&
      /(?=.{7,12}$)/.test(password) &&
      /[ -\/:-@\[-\`{-~]/.test(password) &&
      /(?=.*[0-9])/.test(password)
    );
  };

  const mobileValidate = (number) => {
    return /(?=.{10}$)/.test(number);
  };

  const emailValidate = (text) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(text);
  };

  const name_validate = (name) => {
    return /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(name);
  };

  const signupReducer = (data, action) => {
    switch (action.type) {
      case "pending":
        return data;
      case "name":
        if (!name_validate(action.name)) {
          return {
            ...data,
            name: action.name,
            nameValidation: action.nameValidation,
          };
        }
        return { ...data, name: action.name, nameValidation: false };
      case "mobile_number":
        if (!mobileValidate(action.mobile_number)) {
          return {
            ...data,
            mobile_number: action.mobile_number,
            mobileVerification: action.mobileVerification,
          };
        }
        return {
          ...data,
          mobile_number: action.mobile_number,
          mobileVerification: false,
        };

      case "email":
        if (!emailValidate(action.email)) {
          return {
            ...data,
            email: action.email,
            emailVerification: action.emailVerification,
          };
        }
        return { ...data, email: action.email, emailVerification: false };
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
    mobileVerification: false,
    emailVerification: false,
    nameValidation: false,
  });
  const [requiredFields, setRequireFields] = useState({});
  const [auth, setAuth] = useState(false);
  const getBearerToken = () => localStorage.getItem("Bearer");
  const [bearer] = useState(getBearerToken);
  const headers = useMemo(
    () => ({
      Authorization: `Bearer ${bearer}`,
      "Content-Type": "application/json",
    }),
    [bearer]
  );

  const changeIcon = (e, icon) => {
    if (icon === eye) {
      e.target.attributes.src.textContent = hidden;
    } else {
      e.target.attributes.src.textContent = eye;
    }
  };

  const showPassword = (e) => {
    const password = document.getElementById("password");
    const cnfpassword = document.getElementById("confirm_password");
    const icon = e.target.attributes.src.textContent;
    if (e.target.id === "password-icon") {
      changeIcon(e, icon);
      const type =
        password.getAttribute("type") === "Password" ? "text" : "Password";
      password.setAttribute("type", type);
    } else if (e.target.id === "cnf-password-icon") {
      changeIcon(e, icon);
      const cnftype =
        cnfpassword.getAttribute("type") === "Password" ? "text" : "Password";
      cnfpassword.setAttribute("type", cnftype);
    }
  };

  function fetchdata(info) {
    axios
      .post("http://127.0.0.1:8000/api/auth/register", info, { headers })
      .then((response) => {
        if (response.status === 200) {
          setAuth(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function checkRequiredfields(info) {
    const res = {};
    Object.keys(info).forEach((key) => {
      if (info[key] === "") {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const info = {
      name: data.name,
      password: data.password,
      password_confirmation: data.password_confirmation,
      email: data.email,
      mobile_number: data.mobile_number,
    };
    if (checkRequiredfields(info)) {
      fetchdata(info);
    }
  };
  return (
    <>
      <div className="signup">
        <h1 className="signup-h1">
          Hey there!! Welcome to Bro Blogs sign-up and start writing your blog
        </h1>
      </div>
      <form action="" className="form">
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
                dispatch({
                  ...data,
                  name: e.target.value,
                  type: "name",
                  nameValidation: true,
                });
              }}
            />
            <img className="sign-up-icons" src={user} alt="" />
            {data.nameValidation && (
              <div style={{ color: "red" }}>Invalid Name</div>
            )}
            {requiredFields.name && (
              <div style={{ color: "red" }}>Name field is required</div>
            )}
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
                  mobileVerification: true,
                });
              }}
            />
            {data.mobileVerification && (
              <div style={{ color: "red" }}>
                Mobile number must be of 10 digits
              </div>
            )}
            {requiredFields.mobile_number && (
              <div style={{ color: "red" }}> Mobile number is required</div>
            )}
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
                dispatch({
                  ...data,
                  email: e.target.value,
                  type: "email",
                  emailVerification: true,
                });
              }}
            />
            {data.emailVerification && (
              <div style={{ color: "red" }}>Invalid email address</div>
            )}
            {requiredFields.email && (
              <div style={{ color: "red" }}>email address is required</div>
            )}
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
            {requiredFields.password && (
              <div style={{ color: "red" }}> The password field is rquired</div>
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
              <div className="password" style={{ marginBottom: "5px" }}>
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
            {requiredFields.password_confirmation && (
              <div style={{ color: "red" }}>
                The cofirm password field is rquired
              </div>
            )}
            <div className="signup-btn">
              <Button colorScheme="blue" mr={3} mt={3} onClick={handleSubmit}>
                Signup
              </Button>
            </div>
          </div>
        </div>
      </form>
      {auth && <Navigate to="/Login" />}
    </>
  );
};

export default Signup;
