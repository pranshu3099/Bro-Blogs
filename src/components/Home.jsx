import github from "/home/pranshu/Bro Blogs/Bro-Blogs/src/icons/github.png";
import linkedin from "/home/pranshu/Bro Blogs/Bro-Blogs/src/icons/linkedin.png";
import twitter from "/home/pranshu/Bro Blogs/Bro-Blogs/src/icons/twitter.png";
import { useCallback, useState, useEffect, useLayoutEffect } from "react";
import useFetch from "./UseFetch";
import axios from "axios";
import { useMemo } from "react";
import { useAuthContext } from "../context/Provider";
import { useNavigate } from "react-router-dom";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
const Home = () => {
  const getBearerToken = () => localStorage.getItem("Bearer");
  const [bearer] = useState(getBearerToken);
  const [likes, setLikes] = useState(0);
  const [userpost, setUserPost] = useState([]);
  const navigate = useNavigate();
  const headers = useMemo(
    () => ({
      Authorization: `Bearer ${bearer}`,
      "Content-Type": "application/json",
    }),
    [bearer]
  );
  const { data, err, loading } = useFetch(
    "http://localhost:3000/getposts",
    "",
    "GET",
    headers,
    [userpost]
  );
  useEffect(() => {
    localStorage.setItem("postdata", JSON.stringify(userpost?.postdata));
    if (Object.keys(userpost).length) {
      navigate("/posts", { state: userpost });
    }
  }, [userpost, navigate]);
  const handleBlog = (e, post_id) => {
    axios
      .get(`http://localhost:3000/getsinglepost/${post_id}`, {
        headers,
        withCredentials: true,
      })
      .then((res) => {
        setUserPost({
          status: true,
          postdata: res?.data,
        });
      })
      .catch((err) => {
        setUserPost({
          status: false,
          postdata: err?.response?.data,
        });
      });
  };
  return (
    <>
      <div className="home-container">
        <header>
          <h1>Pranshu's Blog</h1>
        </header>
        <article className="article">
          <p>
            Hi there, I'm Shoubhit aka nexxel. I'm 18 y/o and going to
            university soon. I like shuffling cards and building things. I enjoy
            language design, web development and I live on the terminal.
          </p>
          <p>
            Right now I'm building a journal app, learning OCaml, writing blog
            posts and going to the gym regularly.
          </p>
        </article>

        <div className="projects-container">
          <header>
            <h1>Projects</h1>
          </header>
          <div className="projects-sub-container">
            <div>
              <a
                href="https://github.com/pranshu3099/parkade-frontend"
                target="_blank"
              >
                Parkade
              </a>
              <p>
                Automatic car parking monitoring system. Real-time number plate
                scanning. User registration and admin panel.
              </p>
            </div>
            <div>
              <a
                href="https://github.com/pranshu3099/Snake-Game"
                target="_blank"
              >
                Snake Game
              </a>
              <p>A Simple snake game made using javascript</p>
            </div>
            <div>
              <a href="#">wordle</a>
              <p>The best way to start a full-stack, typesafe Next.js app</p>
            </div>
            <div>
              <a href="#">wordle</a>
              <p>The best way to start a full-stack, typesafe Next.js app</p>
            </div>
            <div>
              <a href="#">wordle</a>
              <p>The best way to start a full-stack, typesafe Next.js app</p>
            </div>
          </div>
        </div>

        <div className="user-blogs-container">
          <header>
            <h1>Blogs</h1>
          </header>

          {!userpost.length && (
            <>
              <div>
                {data && <BlogPosts data={data} onHandleBlog={handleBlog} />}
              </div>
            </>
          )}
        </div>
        <hr />
        <div className="myprofile-container">
          <p>Pranshu Srivastava</p>
          <div className="my-profile-icons">
            <a href="https://github.com/pranshu3099" target="_blank">
              <img src={github} alt="" />
            </a>
            <a href="https://www.linkedin.com/in/pranshu-cse/" target="_blank">
              <img src={linkedin} alt="" />
            </a>
            <a href="https://twitter.com/brocode08071934" target="_blank">
              <img src={twitter} alt="" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

const BlogPosts = ({ data, onHandleBlog }) => {
  const handleBlog = (e, post_id) => {
    onHandleBlog(e, post_id);
  };

  const posts_data = data[0]?.posts;
  return (
    <>
      {posts_data.map((post, index) => (
        <div className="user-blogs-sub-container">
          <p
            onClick={(e) => handleBlog(e, post.posts_id)}
            style={{ cursor: "pointer" }}
            key={post?.id}
          >
            {post.title}
          </p>
          <div className="date-name-container">
            <div>{post.created_at.substring(0, 9)}</div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Home;
