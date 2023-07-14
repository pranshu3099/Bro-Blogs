import like from "/home/pranshu/Bro Blogs/Bro-Blogs/src/icons/like.png";
import comment from "/home/pranshu/Bro Blogs/Bro-Blogs/src/icons/comment.png";
import heart from "/home/pranshu/Bro Blogs/Bro-Blogs/src/icons/heart.png";
import { useCallback, useState, useEffect, useLayoutEffect } from "react";
import useFetch from "./UseFetch";
import axios from "axios";
import { useMemo } from "react";
import { useAuthContext } from "../context/Provider";
import { useNavigate } from "react-router-dom";
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
    "http://127.0.0.1:3000/getposts",
    "",
    "GET",
    headers,
    [userpost]
  );
  useEffect(() => {
    if (userpost.length) {
      navigate("/posts", { state: { postdata: userpost } });
    }
  }, [userpost, navigate]);
  const handleBlog = (e, post_id) => {
    axios
      .get(`http://127.0.0.1:3000/getsinglepost/${post_id}`, {
        headers,
      })
      .then((res) => {
        setUserPost(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <article style={{ marginTop: "35px" }}>
        {!userpost.length && (
          <>
            <div className="post-main-container">
              {data && <BlogPosts data={data} onHandleBlog={handleBlog} />}
            </div>
          </>
        )}
      </article>
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
        <div className="post-container" key={post.id}>
          <div className="date-name-container">
            <p>{post.created_at.substring(0, 9)}</p>
            <p>{post.user.name}</p>
          </div>
          <div className="post-title">
            <h1
              onClick={(e) => handleBlog(e, post.posts_id)}
              style={{ cursor: "pointer" }}
            >
              {post.title}
            </h1>
            <p>{post.content}</p>
          </div>
          <hr />
        </div>
      ))}
    </>
  );
};

export default Home;
