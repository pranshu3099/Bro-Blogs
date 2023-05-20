import like from "/media/pranshu/My Passport/my-blog/src/icons/like.png";
import comment from "/media/pranshu/My Passport/my-blog/src/icons/comment.png";
import heart from "/media/pranshu/My Passport/my-blog/src/icons/heart.png";
import { useCallback, useState, useEffect, useLayoutEffect } from "react";
import useFetch from "../UseFetch";
import axios from "axios";
import { useMemo } from "react";
import { useAuthContext } from "../../context/Provider";
import { useLocation } from "react-router-dom";
import { Button, Input, Textarea } from "@chakra-ui/react";
const Posts = () => {
  const location = useLocation();
  const { postdata } = location.state || {};
  console.log(postdata);
  const getBearerToken = () => localStorage.getItem("Bearer");
  const [bearer] = useState(getBearerToken);
  const { responseData } = useAuthContext();
  const [likes, setLikes] = useState(0);
  const [result, setResult] = useState([]);
  const [sendComment, setSendComment] = useState(false);
  const [Yourcomment, setYourComment] = useState("");
  const [yourCommentList, setYourCommentList] = useState([]);
  const headers = useMemo(
    () => ({
      Authorization: `Bearer ${bearer}`,
      "Content-Type": "application/json",
    }),
    [bearer]
  );
  useEffect(() => {
    if (postdata !== undefined) {
      let likearr = localStorage.getItem("posts")
        ? JSON.parse(localStorage.getItem("posts"))
        : [];

      const posts = likearr[0];
      let islikedArray = [];

      if (posts !== null) {
        Object.keys(posts).forEach((key) => {
          if (posts[key].includes(postdata.user_id)) islikedArray.push(true);
          else {
            islikedArray.push(false);
          }
        });
      }

      // if (data.length > islikedArray.length) {
      //   let length = data.length - islikedArray.length;
      //   islikedArray = [...islikedArray, ...Array(length).fill(false)];
      // }

      setResult(islikedArray);
    }
  }, [postdata]);

  useEffect(() => {
    axios
      .get(
        `http://127.0.0.1:8000/api/comments/getcomments/${postdata[0].post_id}`,
        {
          headers,
        }
      )
      .then((res) => {
        console.log(res.data);
        setYourCommentList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  function setLikedToLocalStorage(user_id, post_id) {
    let likearr = localStorage.getItem("posts")
      ? JSON.parse(localStorage.getItem("posts"))
      : [];
    if (likearr.length) {
      let updatedArr = likearr.map((posts) => {
        if (posts.hasOwnProperty(post_id)) {
          let arr = posts[post_id];
          arr.push(user_id);
          return {
            ...posts,
            [post_id]: arr,
          };
        } else {
          posts = { ...posts, [post_id]: [user_id] };
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

  function removeLikedFromLocalStorage(user_id, post_id) {
    let likearr = localStorage.getItem("posts")
      ? JSON.parse(localStorage.getItem("posts"))
      : [];

    if (!likearr.length) return false;
    let updatedArr = likearr.map((posts) => {
      if (posts.hasOwnProperty(post_id)) {
        let arr = posts[post_id];
        let newArr = arr.filter((id) => id !== user_id);
        return {
          ...posts,
          [post_id]: newArr,
        };
      }
      return posts;
    });
    localStorage.setItem("posts", JSON.stringify(updatedArr));
  }

  const handleLike = (e, post_id, user_id, count) => {
    let updatedCount = 0;

    if (e.target.attributes.src.textContent === heart) {
      e.target.attributes.src.textContent = like;
      updatedCount = 0;
      setLikes(updatedCount);
      removeLikedFromLocalStorage(user_id, post_id);
    } else {
      e.target.attributes.src.textContent = heart;
      updatedCount = 1;
      setLikes(updatedCount);
      setLikedToLocalStorage(user_id, post_id);
    }
    if (count) {
      if (updatedCount) {
        updatedCount = count ? count : 0;
        updatedCount++;
      } else {
        updatedCount = count ? count : 0;
        updatedCount--;
      }
    }
    let postLikesData = {
      likes: updatedCount,
      post_id: post_id,
      user_id: user_id,
    };
    axios
      .post("http://127.0.0.1:8000/api/likeposts/likes", postLikesData, {
        headers,
      })
      .then((res) => {
        setLikes(updatedCount);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSendComment = () => {
    const comment = {
      user_id: postdata[0].user_id,
      post_id: postdata[0].post_id,
      comment: Yourcomment,
    };
    setYourComment("");
    axios
      .post("http://127.0.0.1:8000/api/comments/create", comment, { headers })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const handleComment = (e, post_id) => {
    if (sendComment) {
      setSendComment(false);
      document.getElementById("comment-list").style.left = "-100%";
      document.getElementById("comment-list").style.width = "20%";
    } else {
      setSendComment(true);
      document.getElementById("comment-list").style.left = "0";
      document.getElementById("comment-list").style.width = "100%";
    }
  };

  return (
    <article>
      <div className="post-main-container">
        {postdata ? (
          <BlogPosts
            posts={postdata}
            onhandleLikeChange={handleLike}
            onhandleComment={handleComment}
            count={likes}
            result={result}
          />
        ) : null}
      </div>
      <div className="comment-list-container">
        <ul id="comment-list">
          <div className="comment-container">
            <Textarea
              placeholder="Comment"
              className="comment"
              value={Yourcomment}
              onChange={(e) => {
                setYourComment(e.target.value);
              }}
            />
            <div className="comment-btn-container">
              <Button
                colorScheme="blue"
                onClick={handleSendComment}
                className="comment-btn"
              >
                comment
              </Button>
              <Button
                colorScheme="blue"
                onClick={handleComment}
                className="comment-btn"
              >
                cancel
              </Button>
            </div>
          </div>
          <div className="main-comment-list">
            {yourCommentList.length ? (
              <CommentList comments={yourCommentList} />
            ) : null}
          </div>
        </ul>
      </div>
    </article>
  );
};

const CommentList = ({ comments }) => {
  return (
    <>
      {comments.map((comment, index) => {
        return (
          <li key={index}>
            <p className="name">{comment.name}</p>
            <p className="main-comment">{comment.comment}</p>
          </li>
        );
      })}
    </>
  );
};

const BlogPosts = ({ posts, onhandleLikeChange, onhandleComment, result }) => {
  const handleLike = (e, post_id, user_id, count) => {
    onhandleLikeChange(e, post_id, user_id, count);
  };
  const handleComment = (e, post_id) => {
    onhandleComment(e, post_id);
  };

  const dateTimeString = posts[0].created_at;
  const dateTime = new Date(dateTimeString);
  const date = dateTime.toLocaleDateString();
  return (
    <>
      {posts.map((post, index) => (
        <div className="post-container" key={post.id}>
          <div className="date-name-container">
            <p>{post.name}</p>
            <p>{date}</p>
          </div>
          <div className="post-title">
            <h1>{post.title}</h1>
          </div>
          <div className="post-content">
            <p>{post.content}</p>
          </div>
          <div className="post-icons-container">
            {
              <img
                src={
                  result.length
                    ? result[index] === false
                      ? like
                      : heart
                    : like
                }
                alt=""
                className="post-icons"
                onClick={(e) =>
                  handleLike(e, post.post_id, post.user_id, post.count)
                }
                id="likes"
              />
            }
            <p>{post.count}</p>
            <img
              src={comment}
              alt=""
              className="post-icons"
              onClick={(e) => handleComment(e, post.post_id)}
            />
            <p>34</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default Posts;
