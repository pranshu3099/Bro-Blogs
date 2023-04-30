import like from "/media/pranshu/My Passport/my-blog/src/icons/like.png";
import comment from "/media/pranshu/My Passport/my-blog/src/icons/comment.png";
import heart from "/media/pranshu/My Passport/my-blog/src/icons/heart.png";
import { useCallback, useState } from "react";
import useFetch from "./UseFetch";
import axios from "axios";
import { useMemo } from "react";
import { useAuthContext } from "../context/Provider";

const Home = () => {
  const getBearerToken = () => localStorage.getItem("Bearer");
  const [bearer] = useState(getBearerToken);
  const { responseData } = useAuthContext();
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
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
  function setLikedToLocalStorage(user_id, post_id) {
    let likearr = localStorage.getItem("posts")
      ? JSON.parse(localStorage.getItem("posts"))
      : [];
    if (likearr.length) {
      let updatedArr = likearr.map((posts) => {
        if (Object.keys(posts)[0] === String(post_id)) {
          let arr = posts.post_id;
          if (!arr) {
            posts[Object.keys(posts)[0]] = [user_id];
          } else {
            arr.push(user_id);
            posts.post_id = arr;
          }
        }
        return posts;
      });
      likearr = updatedArr;
    } else {
      let newPost = {
        [post_id]: [user_id],
      };
      likearr.push(newPost);
    }
    localStorage.setItem("posts", JSON.stringify(likearr));
  }

  function getLikedFromLocalStorage(user_id, post_id) {
    let likearr = localStorage.getItem("posts")
      ? JSON.parse(localStorage.getItem("posts"))
      : [];

    if (!likearr.length) return false;
    likearr.map((posts) => {
      if (Object.keys(posts)[0] === String(post_id)) {
        let arr = posts[post_id];
        console.log(arr);
        let newArr = arr.filter((id) => id !== user_id);
        posts[post_id] = newArr;
      }
      console.log("hey");
      return posts;
    });
    localStorage.setItem("posts", JSON.stringify(likearr));
  }

  const handleLike = (e) => {
    let updatedCount = 0;

    if (liked && getLikedFromLocalStorage(data[0].user_id, data[0].post_id)) {
      updatedCount = 0;
      setLiked(false);
    } else if (getLikedFromLocalStorage(data[0].user_id, data[0].post_id)) {
      setLiked(false);
    } else {
      updatedCount = 1;
      setLiked(true);
      setLikedToLocalStorage(data[0].user_id, data[0].post_id);
    }
    if (data?.count && !loading) {
      console.log("hey", data.count);
      updatedCount = data.count;
      if (liked) updatedCount++;
      else updatedCount--;
    }
    let postLikesData = {
      likes: updatedCount,
      post_id: data[0]?.post_id,
      user_id: responseData?.data?.original?.user?.id,
    };
    axios
      .post("http://127.0.0.1:8000/api/likeposts/likes", postLikesData, {
        headers,
      })
      .then((res) => {
        console.log(res);
        setLikes(updatedCount);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <article>
      <div className="post-main-container">
        {data && (
          <BlogPosts
            data={data}
            onhandleLikeChange={handleLike}
            count={likes}
            liked={liked}
          />
        )}
      </div>
    </article>
  );
};

const BlogPosts = ({ data, onhandleLikeChange, count, handleCount, liked }) => {
  const handleLike = (e) => {
    onhandleLikeChange(e);
  };
  return (
    <>
      {data.map((post) => (
        <div className="post-container" key={post.id}>
          <div className="date-name-container">
            <p>{post.user.name}</p>
            <p>15-april-2023</p>
          </div>
          <div className="post-title">
            <h1>{post.title}</h1>
          </div>
          <div>
            <p>{post.content}</p>
          </div>
          <div className="post-icons-container">
            {
              <img
                src={liked ? heart : like}
                alt=""
                className="post-icons"
                onClick={handleLike}
                id="likes"
              />
            }
            <p>{post.count}</p>
            <img src={comment} alt="" className="post-icons" />
            <p>34</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default Home;
