import like from "/media/pranshu/My Passport/my-blog/src/icons/like.png";
import comment from "/media/pranshu/My Passport/my-blog/src/icons/comment.png";
import heart from "/media/pranshu/My Passport/my-blog/src/icons/heart.png";
import { useState } from "react";

const Home = () => {
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
        <div className="post-container">
          <div className="date-name-container">
            <p>Pranshu Srivastava</p>
            <p>15-april-2023</p>
          </div>
          <div className="post-title">
            <h1>My first blog on Artificial Intelligence</h1>
          </div>
          <div>
            <p>
              One reason for the stir delights me and makes me incredibly happy
              as a teacher of mathematics. By all accounts, these two teenage
              math students are the exact opposite of the majority of the math
              establishment. They are female, they are African-American, and
              they come from an area which is not particularly renowned for
              producing high academic achievers. This is just an awesome turn of
              events and one which should inspire anyone — no matter what their
              gender, ethnic or socio-demographic background — that excellence
              in your chosen field of study is always attainable if you have
              enough joy and passion for what you do. One reason for the stir
              delights me and makes me incredibly happy as a teacher of
              mathematics. By all accounts, these two teenage math students are
              the exact opposite of the majority of the math establishment. They
              are female, they are African-American, and they come from an area
              which is not particularly renowned for producing high academic
              achievers. This is just an awesome turn of events and one which
              should inspire anyone — no matter what their gender, ethnic or
              socio-demographic background — that excellence in your chosen
              field of study is always attainable if you have enough joy and
              passion for what you do. One reason for the stir delights me and
              makes me incredibly happy as a teacher of mathematics. By all
              accounts, these two teenage math students are the exact opposite
              of the majority of the math establishment. They are female, they
              are African-American, and they come from an area which is not
              particularly renowned for producing high academic achievers. This
              is just an awesome turn of events and one which should inspire
              anyone — no matter what their gender, ethnic or socio-demographic
              background — that excellence in your chosen field of study is
              always attainable if you have enough joy and passion for what you
              do.
            </p>
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
        <div></div>
      </div>
    </article>
  );
};

export default Home;
