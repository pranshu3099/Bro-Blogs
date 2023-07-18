import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import useFetch from "./UseFetch";
import { useAuthContext } from "../context/Provider";
import axios from "axios";
import Home from "./Home";
import FileResizer from "react-image-file-resizer";
import EditorComponent from "./Editor";
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
  const [selectedFile, setSelectedFile] = useState([]);
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
      case "content":
        return { ...state, yourblog: action.yourblog };
      case "resolved":
        return action;
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
      // image: resizedImage,
    };
    console.log(data);
    // axios
    //   .post("http://127.0.0.1:3000/createposts", data, { headers })
    //   .then((response) => {
    //     if (response.status === 200) {
    //       setSubmit(true);
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };
  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };
  const handleRemovelist = (url) => {
    let newfilearr = selectedFile.filter((img) => {
      if (img !== url) return true;
      return false;
    });
    setSelectedFile(newfilearr);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile([...selectedFile, file.name]);
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
                  value={blog?.title}
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
                id="files"
                onChange={handleFileInputChange}
              />
            </div>
            <div>
              {
                <ImageUrllist
                  list={selectedFile}
                  removelist={handleRemovelist}
                />
              }
            </div>

            <div>
              <div className="blog-sub-container">
                <div>
                  <EditorComponent
                    reducer={blogReducer}
                    blog={blog}
                    dispatch={dispatch}
                  />
                </div>
              </div>
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
                  <Text fontSize="30px">{blog?.title}</Text>
                  <p>
                    {today.toLocaleDateString("en-US", monthOptions) +
                      " " +
                      today.getDate() +
                      "," +
                      " " +
                      today.getFullYear()}
                  </p>
                  <Text fontSize="15px">{blog?.yourblog}</Text>
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

const ImageUrllist = ({ list, removelist }) => {
  console.log(list);
  const handleRemoveurl = (url) => {
    removelist(url);
  };
  return (
    <ul className="imgparent">
      {list.map((url, index) => {
        return (
          <>
            <li key={index} value={index} className="imglist">
              {url}
            </li>
            <span
              onClick={(e) => {
                handleRemoveurl(url);
              }}
              style={{
                cursor: "pointer",
                fontSize: "20px",
              }}
            >
              x
            </span>
          </>
        );
      })}
    </ul>
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
