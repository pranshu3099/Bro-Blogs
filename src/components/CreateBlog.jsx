import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import useFetch from "./UseFetch";
import { useAuthContext } from "../context/Provider";
import axios from "axios";
import Home from "./Home";
import FileResizer from "react-image-file-resizer";
import EditorComponent from "./Editor";
import url from "/home/pranshu/Bro Blogs/Bro-Blogs/src/icons/url.png";

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
import { upload } from "@testing-library/user-event/dist/upload";
const CreateBlog = () => {
  const getBearerToken = () => localStorage.getItem("Bearer");
  const [bearer] = useState(getBearerToken);
  const [data, setData] = useState("");
  const [selectedFile, setSelectedFile] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const [resizedImage, setResizedImage] = useState(null);
  const [additionalComponents, setAdditionalComponents] = useState([]);
  const [url, setUrl] = useState([]);
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

  const blogReducer = (state, { type, payload }) => {
    switch (type) {
      case "pending":
        return state;
      case "title":
        return { ...state, ...payload };
      case "content":
        return { ...state, ...payload };
      case "resolved":
        return state;
      default:
        throw new Error("error");
    }
  };

  const [blog, dispatch] = useReducer(blogReducer, {
    title: "",
    blogContent: "",
  });

  const [submit, setSubmit] = useState(false);
  const today = new Date();
  const monthOptions = { month: "long" };
  // console.log(blog);
  const handleSubmit = (e) => {
    console.log(blog);
    e.preventDefault();
    if (blog.title === "" && blog.blogContent === "") {
      alert("please write your blog");
    }
    // dispatch({ title: "", blogContent: "", type: "resolved" });
    let randomNum = Math.floor(Math.random() * 9000) + 1000;
    let data = {
      title: blog?.title,
      content: blog?.blogContent,
      user_id: Number(responseData?.data?.user?.id),
      category_id: Number(selectedCategory),
      posts_id: Number(randomNum),
      image: selectedFile,
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
  const handleRemovelist = (url, list_img) => {
    console.log(list_img);
    let newfilearr = imagePreview.filter((img) => {
      if (img !== url) return true;
      return false;
    });
    setImagePreview(newfilearr);
    let newimagearr = selectedFile.filter((img) => {
      if (img !== list_img) return true;
      return false;
    });
    setSelectedFile(newimagearr);
  };

  const handleContentChange = (state, action) => {
    blogReducer(state, action);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile([...selectedFile, file.name]);
    let reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview([...imagePreview, reader.result]);
    };

    if (file) reader.readAsDataURL(file);
  };

  const copyTextToClipboard = (text) => {
    if (navigator.clipboard && window.isSecureContext) {
      // Use Clipboard API if available
      navigator.clipboard.writeText(text);
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
  };

  const handleGeturl = (e) => {
    let textToCopy = e.target.previousElementSibling.textContent;
    copyTextToClipboard(textToCopy);
  };

  const uploadImages = () => {
    const formData = new FormData();
    selectedFile.forEach((image) => {
      formData.append("images", image);
    });
    try {
      const response = axios
        .post("http://127.0.0.1:3000/api/uploadimage", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `${bearer}`,
          },
        })
        .then((res) => {
          setUrl(res.data.url);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.error(error);
    }
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
                    dispatch({
                      type: "title",
                      payload: { title: e.target.value },
                    })
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
                name="images"
              />
            </div>
            <div>
              {
                <ImageUrllist
                  list={selectedFile}
                  removelist={handleRemovelist}
                  imgurl={handleGeturl}
                  preview={imagePreview}
                  copyurl={url}
                />
              }
            </div>
            <div>
              <button onClick={uploadImages}>upload images</button>
            </div>
            <div>
              <div className="blog-sub-container">
                <div>
                  <EditorComponent
                    blog={blog}
                    dispatch={dispatch}
                    handleChange={handleContentChange}
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
                  <Text fontSize="15px">{blog?.blogContent}</Text>
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

const ImageUrllist = ({ list, removelist, preview, imgurl, copyurl }) => {
  const handleRemoveurl = (img, list_img) => {
    removelist(img, list_img);
  };

  const handleurl = (e) => {
    imgurl(e);
  };

  return (
    <ul className="imgparent">
      {preview.map((img, index) => {
        return (
          <>
            <li key={index} value={index} className="imglist">
              <img src={img} alt="img" />
            </li>
            <span
              onClick={(e) => {
                handleRemoveurl(img, list[index]);
              }}
              style={{
                cursor: "pointer",
                fontSize: "20px",
              }}
            >
              x
            </span>
            <p style={{ display: "none" }} value={index}>
              {copyurl[index]?.path}
            </p>
            <img
              src={url}
              alt=""
              style={{
                cursor: "pointer",
                width: "17px",
                margin: "6px",
              }}
              id="imgurl"
              onClick={(e) => {
                handleurl(e);
              }}
            />
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
