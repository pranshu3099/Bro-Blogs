import { useReducer, useState } from "react";
import { Link } from "react-router-dom";
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
} from "@chakra-ui/react";
const CreateBlog = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const blogReducer = (state, action) => {
    switch (action.type) {
      case "pending":
        return action;
      case "title":
        return { ...state, title: action.title };
      case "blog":
        return { ...state, yourblog: action.yourblog };
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
    dispatch({ title: "", yourblog: "", type: "pending" });
    setSubmit(true);
  };
  return (
    <div>
      {!submit && (
        <>
          <div className="blog-container">
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
          <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
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
        </>
      )}
      {submit && (
        <div className="post-success-container">
          <div className="success-container">
            <div className="success">Post Submitted Successfully</div>
            <button class="success-btn" colorScheme="green">
              <Link to="/">Home</Link>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateBlog;
