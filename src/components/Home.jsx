import like from "/media/pranshu/My Passport/my-blog/src/icons/like.png";
import comment from "/media/pranshu/My Passport/my-blog/src/icons/comment.png";
import heart from "/media/pranshu/My Passport/my-blog/src/icons/heart.png";
import { useCallback, useState, useEffect, useLayoutEffect } from "react";
import useFetch from "./UseFetch";
import axios from "axios";
import { useMemo } from "react";
import { useAuthContext } from "../context/Provider";
import Comment from "./modal/Posts";

const Home = () => {
  const getBearerToken = () => localStorage.getItem("Bearer");
  const [bearer] = useState(getBearerToken);
  const { responseData } = useAuthContext();
  const [likes, setLikes] = useState(0);
  const [result, setResult] = useState([]);
  const headers = useMemo(
    () => ({
      Authorization: `Bearer ${bearer}`,
      "Content-Type": "application/json",
    }),
    [bearer]
  );
  const { data, err, loading } = useFetch(
    "http://127.0.0.1:8000/api/posts/getposts",
    "",
    "GET",
    headers,
    [likes]
  );

  const handleBlog = (e, post_id) => {
    console.log(post_id);
    axios
      .get(`http://127.0.0.1:8000/api/posts/getsinglepost/${post_id}`, {
        headers,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <article>
      <div className="post-main-container">
        {data && <BlogPosts data={data} onHandleBlog={handleBlog} />}
      </div>
    </article>
  );
};

const BlogPosts = ({ data, onHandleBlog }) => {
  const handleBlog = (e, post_id) => {
    onHandleBlog(e, post_id);
  };

  return (
    <>
      {data.map((post, index) => (
        <div className="post-container" key={post.id}>
          <div className="date-name-container">
            <p>{post.name}</p>
            <p>15-april-2023</p>
          </div>
          <div className="post-title">
            <h1
              onClick={(e) => handleBlog(e, post.post_id)}
              style={{ cursor: "pointer" }}
            >
              {post.title}
            </h1>
          </div>
        </div>
      ))}
    </>
  );
};

export default Home;
