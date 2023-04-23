import like from "/media/pranshu/My Passport/my-blog/src/icons/like.png";
import comment from "/media/pranshu/My Passport/my-blog/src/icons/comment.png";
import heart from "/media/pranshu/My Passport/my-blog/src/icons/heart.png";
import { useState } from "react";
import useFetch from "./UseFetch";

const Home = () => {
  const getBearerToken = () => localStorage.getItem("Bearer");
  const [bearer] = useState(getBearerToken);
  const headers = {
    Authorization: `Bearer ${bearer}`,
    "Content-Type": "application/json",
  };
  const { data, err } = useFetch(
    "http://127.0.0.1:8000/api/posts/getposts",
    "",
    "GET",
    headers
  );
  console.log(data);
  let changeIcon = (e, icon) => {
    if (icon === like) {
      e.target.attributes.src.textContent = heart;
    } else {
      e.target.attributes.src.textContent = like;
    }
  };
  const handleLike = (e) => {
    const icon = e.target.attributes.src.textContent;
    changeIcon(e, icon);
  };

  return (
    <article>
      <div className="post-main-container">
        {data && <ReturnPosts data={data} onhandleLikeChange={handleLike} />}
      </div>
    </article>
  );
};

const ReturnPosts = ({ data, onhandleLikeChange }) => {
  const handleLike = (e) => {
    onhandleLikeChange(e);
  };
  return (
    <>
      <div className="post-container">
        <div className="date-name-container">
          <p>{data.user.name}</p>
          <p>15-april-2023</p>
        </div>
        <div className="post-title">
          <h1>{data.title}</h1>
        </div>
        <div>
          <p>{data.content}</p>
        </div>
        <div className="post-icons-container">
          {
            <img
              src={like}
              alt=""
              className="post-icons"
              onClick={handleLike}
              id="likes"
            />
          }
          <p>50k</p>
          <img src={comment} alt="" className="post-icons" />
          <p>34</p>
        </div>
      </div>
    </>
  );
};

export default Home;
