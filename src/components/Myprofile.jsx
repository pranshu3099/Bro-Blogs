import github from "/home/pranshu/Bro Blogs/Bro-Blogs/src/icons/github.png";
import linkedin from "/home/pranshu/Bro Blogs/Bro-Blogs/src/icons/linkedin.png";
import twitter from "/home/pranshu/Bro Blogs/Bro-Blogs/src/icons/twitter.png";
import { useCallback, useState, useEffect, useLayoutEffect } from "react";
import axios from "axios";
import { useMemo } from "react";
import { useAuthContext } from "../context/Provider";
import useFetch from "./UseFetch";
import { useNavigate } from "react-router-dom";
const Myprofile = () => {
  const getBearerToken = () => localStorage.getItem("Bearer");
  const [bearer] = useState(getBearerToken);
  const [likes, setLikes] = useState(0);
  const [userpost, setUserPost] = useState([]);
  const navigate = useNavigate();
  const { responseData } = useAuthContext();
  const headers = useMemo(
    () => ({
      Authorization: `Bearer ${bearer}`,
      "Content-Type": "application/json",
    }),
    [bearer]
  );
  const { data, err, loading } = useFetch(
    `http://127.0.0.1:3000/uerPosts/${responseData?.data?.user?.id}`,
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
      <div className="myprofile-container">
        <h1>{responseData?.data?.user?.name}</h1>
        <div className="interest">
          <p>Web Developement</p>
          <p>Artificial Intelligence</p>
        </div>
        <div className="my-profile-icons">
          <a href="#">
            <img src={github} alt="" />
          </a>
          <a href="#">
            <img src={linkedin} alt="" />
          </a>
          <a href="#">
            <img src={twitter} alt="" />
          </a>
        </div>
      </div>
      <article style={{ marginTop: "35px" }}>
        {data?.posts.length ? (
          <div className="post-main-container">
            {data && <BlogPosts data={data} onHandleBlog={handleBlog} />}
          </div>
        ) : (
          <h1>No post to show</h1>
        )}
      </article>
    </>
  );
};
const HTMLRenderer = ({ htmlContent }) => {
  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};
const BlogPosts = ({ data, onHandleBlog }) => {
  const handleBlog = (e, post_id) => {
    onHandleBlog(e, post_id);
  };

  const posts_data = data?.posts;
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
            <HTMLRenderer htmlContent={post?.parsed_content} />
          </div>
        </div>
      ))}
    </>
  );
};

export default Myprofile;
