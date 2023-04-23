import { useCallback, useEffect, useReducer, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import useFetch from "./UseFetch";
import { useAuthContext } from "../context/Provider";
import axios from "axios";
import Home from "./Home";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  useDisclosure,
  Input,
  Textarea,
  Select,
} from "@chakra-ui/react";
const CreateBlog = () => {
  const getBearerToken = () => localStorage.getItem("Bearer");
  const [bearer] = useState(getBearerToken);
  const headers = {
    Authorization: `Bearer ${bearer}`,
    "Content-Type": "application/json",
  };
  const { data, err } = useFetch(
    "http://127.0.0.1:8000/api/categories/getcategories",
    "",
    "GET",
    headers
  );
  const [selectedCategory, setSelectedCategory] = useState("");
  const { responseData } = useAuthContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const blogReducer = (state, action) => {
    switch (action.type) {
      case "pending":
        return action;
      case "title":
        return { ...state, title: action.title };
      case "blog":
        return { ...state, yourblog: action.yourblog };
      case "resolved":
        return action;
      default:
        throw new Error("error");
    }
  };
  const [blog, dispatch] = useReducer(blogReducer, {
    title: "",
    yourblog: "",
    type: "pending",
  });
  const [submit, setSubmit] = useState(false);
  const today = new Date();
  const monthOptions = { month: "long" };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (blog.title === "" && blog.yourblog === "") {
      alert("please write your blog");
    }
    dispatch({ title: "", yourblog: "", type: "resolved" });
    let randomNum = Math.floor(Math.random() * 9000) + 1000;
    let data = {
      title: blog.title,
      content: blog.yourblog,
      user_id: responseData.data.original.user.id,
      category_id: selectedCategory,
      post_id: randomNum,
    };
    axios
      .post("http://127.0.0.1:8000/api/posts/createposts", data, { headers })
      .then((response) => {
        if (response.status === 200) {
          setSubmit(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };
  return (
    <div className="blog-main-container">
      {
        <>
          <div className="blog-container">
            {data && (
              <SelectCategories
                category={data}
                onChange={handleCategoryChange}
              />
            )}
            <div className="input-container">
              <label className="title">
                <Input
                  width={"60rem"}
                  variant="flushed"
                  type="text"
                  value={blog.title}
                  className="input"
                  placeholder="Title"
                  onChange={(e) =>
                    dispatch({ ...blog, title: e.target.value, type: "title" })
                  }
                />
              </label>
            </div>
            <div>
              <Textarea
                name="blog"
                id="blog"
                className="blog"
                value={blog.yourblog}
                cols="129"
                rows="25"
                width={"60rem"}
                placeholder="your blog"
                onChange={(e) =>
                  dispatch({ ...blog, yourblog: e.target.value, type: "blog" })
                }
              />
            </div>
          </div>
          <Button
            type="submit"
            onClick={onOpen}
            className="publish"
            colorScheme="gray"
          >
            Publish
          </Button>
          {!submit && (
            <Modal
              closeOnOverlayClick={false}
              isOpen={isOpen}
              onClose={onClose}
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Your blog</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <Text fontSize="30px">{blog.title}</Text>
                  <p>
                    {today.toLocaleDateString("en-US", monthOptions) +
                      " " +
                      today.getDate() +
                      "," +
                      " " +
                      today.getFullYear()}
                  </p>
                  <Text fontSize="15px">{blog.yourblog}</Text>
                </ModalBody>

                <ModalFooter>
                  <>
                    <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
                      Submit
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                  </>
                </ModalFooter>
              </ModalContent>
            </Modal>
          )}
        </>
      }
      {submit && <Navigate to="/" />}
    </div>
  );
};

const SelectCategories = ({ category, onChange }) => {
  const handleChange = useCallback(
    (e) => {
      onChange(e.target.value);
    },
    [onChange]
  );
  return (
    <>
      <select onChange={handleChange}>
        <option value="">Select a category</option>
        {category.map((cat) => {
          return (
            <option key={cat.slug} value={cat.slug}>
              {cat.category_name}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default CreateBlog;
