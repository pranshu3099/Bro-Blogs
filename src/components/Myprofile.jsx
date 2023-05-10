import github from "/media/pranshu/My Passport/my-blog/src/icons/github.png";
import linkedin from "/media/pranshu/My Passport/my-blog/src/icons/linkedin.png";
import twitter from "/media/pranshu/My Passport/my-blog/src/icons/twitter.png";
import { useCallback, useState, useEffect, useLayoutEffect } from "react";
import useFetch from "./UseFetch";
import axios from "axios";
import { useMemo } from "react";
import { useAuthContext } from "../context/Provider";
const Myprofile = () => {
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
    "http://127.0.0.1:8000/api/posts/userposts",
    "",
    "GET",
    headers,
    [likes]
  );
  // useEffect(() => {
  //   if (data !== undefined) {
  //     let likearr = localStorage.getItem("posts")
  //       ? JSON.parse(localStorage.getItem("posts"))
  //       : [];

  //     const posts = likearr[0];
  //     let islikedArray = [];

  //     if (posts !== null) {
  //       Object.keys(posts).forEach((key) => {
  //         if (posts[key].includes(data[0].user_id)) islikedArray.push(true);
  //         else {
  //           islikedArray.push(false);
  //         }
  //       });
  //     }

  //     if (data.length > islikedArray.length) {
  //       let length = data.length - islikedArray.length;
  //       islikedArray = [...islikedArray, ...Array(length).fill(false)];
  //     }

  //     setResult(islikedArray);
  //   }
  // }, [data]);

  return (
    <>
      <div className="myprofile-container">
        <h1>Pranshu Srivastava</h1>
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
        <article>
          <div className="post-main-container">
            {data && <BlogPosts data={data} />}
          </div>
        </article>
      </div>
    </>
  );
};

const BlogPosts = ({ data }) => {
  return (
    <>
      {data.map((post, index) => (
        <div className="post-container" key={post.id}>
          <div className="date-name-container">
            <p>{post.name}</p>
            <p>15-april-2023</p>
          </div>
          <div className="post-title">
            <h1>{post.title}</h1>
          </div>
          <div className="post-icons-container">
            <p>Likes</p>
            <p>{post.count}</p>
            <p>comments</p>
            <p>34</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default Myprofile;
