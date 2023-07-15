import like from "/home/pranshu/Bro Blogs/Bro-Blogs/src/icons/like.png";
import comment from "/home/pranshu/Bro Blogs/Bro-Blogs/src/icons/comment.png";
import heart from "/home/pranshu/Bro Blogs/Bro-Blogs/src/icons/heart.png";
import { useState, useEffect, useLayoutEffect } from "react";
import axios from "axios";
import { useMemo } from "react";
import { useAuthContext } from "../../context/Provider";
import { useLocation } from "react-router-dom";
import { Button, Input, Textarea } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
const Posts = () => {
  const location = useLocation();
  const { postdata } = location.state || {};
  const getBearerToken = () => localStorage.getItem("Bearer");
  const [bearer] = useState(getBearerToken);
  const { responseData } = useAuthContext();
  const [likes, setLikes] = useState(0);
  const [result, setResult] = useState([]);
  const [sendComment, setSendComment] = useState(false);
  const [Yourcomment, setYourComment] = useState("");
  const [yourCommentList, setYourCommentList] = useState([]);
  const navigate = useNavigate();
  const headers = useMemo(
    () => ({
      Authorization: `${bearer}`,
      "Content-Type": "application/json",
    }),
    [bearer]
  );

  useEffect(() => {
    if (responseData !== undefined) {
      let likearr = localStorage.getItem("posts")
        ? JSON.parse(localStorage.getItem("posts"))
        : [];
      const posts = likearr[0];

      let islikedArray = [];
      console.log(
        posts[postdata[0]?.posts?.posts_id].includes(
          responseData?.data?.user?.id
        )
      );
      if (posts !== undefined) {
        if (posts.hasOwnProperty(postdata[0]?.posts?.posts_id)) {
          if (
            posts[postdata[0]?.posts?.posts_id].includes(
              responseData?.data?.user?.id
            )
          ) {
            console.log("first");
            islikedArray.push(true);
          } else {
            console.log("else");
            islikedArray.push(false);
          }
        }
      }

      setResult(islikedArray);
    }
  }, [postdata]);

  useEffect(() => {
    axios
      .get(
        `http://127.0.0.1:3000/getcomments/${postdata[0]?.posts?.posts_id}`,
        {
          headers,
        }
      )
      .then((res) => {
        setYourCommentList(res.data.comments);
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

  const handleLike = (e, post_id, user_id, likes_count) => {
    if (headers.Authorization !== String(null)) {
      if (e.target.attributes.src.textContent === heart) {
        e.target.attributes.src.textContent = like;
        removeLikedFromLocalStorage(user_id, post_id);
        axios
          .post(
            `http://127.0.0.1:3000/removeLikes/${post_id}/users/${user_id}`,
            {
              headers,
            }
          )
          .then((res) => {
            setLikes(res?.data?.likes);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        e.target.attributes.src.textContent = heart;
        setLikedToLocalStorage(user_id, post_id);
        axios
          .post(`http://127.0.0.1:3000/addlikes/${post_id}/users/${user_id}`, {
            headers,
          })
          .then((res) => {
            setLikes(res?.data?.likes);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      navigate("/Login");
    }
  };

  function checkForSpaces() {
    let trimmedText = Yourcomment;
    let pattern = /^\s*$/;
    return pattern.test(trimmedText);
  }

  const handleSendComment = () => {
    if (headers.Authorization !== String(null)) {
      let comment = {};
      if (Yourcomment === "" || checkForSpaces()) {
        alert("comment is required");
      } else {
        comment = {
          user_id: responseData?.data?.user?.id,
          posts_id: postdata[0].posts?.posts_id,
          comment: Yourcomment,
        };
        setYourComment("");
        axios
          .post("http://127.0.0.1:3000/comment/", comment, { headers })
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
      }
      comment["name"] = responseData?.data?.user?.name;
      console.log(comment);
      setYourCommentList([...yourCommentList, comment]);
    } else {
      navigate("/Login");
    }
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
            commentcount={yourCommentList}
            count={likes}
            result={result}
            responseData={responseData}
            likes={likes}
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
              <CommentList usercomments={yourCommentList} />
            ) : null}
          </div>
        </ul>
      </div>
    </article>
  );
};

const CommentList = ({ usercomments }) => {
  return (
    <>
      {usercomments.map((comment, index) => {
        return (
          <li key={index}>
            <p className="name">
              {comment?.name ? comment.name : comment?.user?.name}
            </p>
            <p className="main-comment">{comment?.comment}</p>
          </li>
        );
      })}
    </>
  );
};

const BlogPosts = ({
  posts,
  onhandleLikeChange,
  onhandleComment,
  result,
  responseData,
  likes,
  commentcount,
}) => {
  const handleLike = (e, post_id, user_id, likes_count) => {
    onhandleLikeChange(e, post_id, user_id, likes_count);
  };
  const handleComment = (e, post_id) => {
    onhandleComment(e, post_id);
  };
  return (
    <>
      {posts.map((post, index) => (
        <div className="post-container" key={IDBIndex}>
          <div className="date-name-container">
            <p>{post?.posts?.user?.name}</p>
            <p>{post?.posts?.created_at.substring(0, 9)}</p>
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
                  handleLike(
                    e,
                    post?.posts?.posts_id,
                    responseData?.data?.user?.id,
                    post?.posts?.likes_count
                  )
                }
                id="likes"
              />
            }
            <p>{likes ? likes : post?.posts?.likes_count}</p>
            <img
              src={comment}
              alt=""
              className="post-icons"
              onClick={(e) => handleComment(e, post?.posts?.posts_id)}
            />
            <p>{commentcount.length}</p>
          </div>
          <div className="post-title">
            <h1>{post?.posts?.title}</h1>
          </div>
          <div className="post-image">
            <img src={post?.posts?.image} alt="" />
          </div>
          <div className="post-content">
            <p>{post.posts.content}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default Posts;
