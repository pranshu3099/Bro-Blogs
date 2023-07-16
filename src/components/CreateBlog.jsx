import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import useFetch from "./UseFetch";
import { useAuthContext } from "../context/Provider";
import axios from "axios";
import Home from "./Home";
import FileResizer from "react-image-file-resizer";
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
  const [data, setData] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [resizedImage, setResizedImage] = useState(null);
  const [additionalComponents, setAdditionalComponents] = useState([]);
  let [id, setId] = useState(0);
  const headers = useMemo(
    () => ({
      Authorization: `${bearer}`,
      "Content-Type": "application/json",
    }),
    [bearer]
  );

  useEffect(() => {
    axios
      .get("http://127.0.0.1:3000/getcategories", { headers })
      .then((response) => {
        if (response.status === 200) {
          setData(response.data);
          console.log(response);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
      title: blog?.title,
      content: blog?.yourblog,
      user_id: Number(responseData?.data?.user?.id),
      category_id: Number(selectedCategory),
      posts_id: Number(randomNum),
      image: resizedImage,
    };

    axios
      .post("http://127.0.0.1:3000/createposts", data, { headers })
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

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    FileResizer.imageFileResizer(
      file,
      300,
      300,
      "JPEG",
      80,
      0,
      (uri) => {
        setResizedImage(uri);
      },
      "base64"
    );
  };

  const RemoveChild = (id) => {
    const filteredComponents = additionalComponents.filter((child) => {
      if (child.props.value !== id) return true;
      return false;
    });
    setAdditionalComponents(filteredComponents);
  };

  const AddChild = () => {
    const newComponent = (
      <div className="blog-sub-container" value={id}>
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileInputChange}
          />
        </div>
        <Input
          width={"60rem"}
          variant="flushed"
          type="text"
          value={blog.title}
          className="input"
          placeholder="Heading"
          onChange={(e) =>
            dispatch({
              ...blog,
              title: e.target.value,
              type: "title",
            })
          }
        />
        <Textarea
          name="blog"
          id="blog"
          className="blog"
          value={blog.yourblog}
          cols="12"
          rows="12"
          width={"60rem"}
          placeholder="your blog"
          onChange={(e) =>
            dispatch({
              ...blog,
              yourblog: e.target.value,
              type: "blog",
            })
          }
        />
        <button onClick={() => RemoveChild(id)}>Remove</button>
      </div>
    );
    setAdditionalComponents([...additionalComponents, newComponent]);
    setId(id + 1);
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
              <input
                type="file"
                accept="image/*"
                onChange={handleFileInputChange}
              />
            </div>
            <div>
              <button onClick={AddChild}>Add More</button>
            </div>
            <div>
              <div className="blog-sub-container">
                <div className="input-container">
                  <label className="title">
                    <Input
                      width={"60rem"}
                      variant="flushed"
                      type="text"
                      value={blog.title}
                      className="input"
                      placeholder="Heading"
                      onChange={(e) =>
                        dispatch({
                          ...blog,
                          title: e.target.value,
                          type: "title",
                        })
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
                    cols="12"
                    rows="12"
                    width={"60rem"}
                    placeholder="your blog"
                    onChange={(e) =>
                      dispatch({
                        ...blog,
                        yourblog: e.target.value,
                        type: "blog",
                      })
                    }
                  />
                </div>
              </div>
              {additionalComponents}
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
      {headers.Authorization === String(null) && <Navigate to="/Login" />}
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
  const category_data = category.categories;
  return (
    <>
      <select onChange={handleChange}>
        <option value="">Select a category</option>
        {category_data.map((cat) => {
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
