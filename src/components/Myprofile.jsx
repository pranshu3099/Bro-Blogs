import github from "/media/pranshu/My Passport/my-blog/src/icons/github.png";
import linkedin from "/media/pranshu/My Passport/my-blog/src/icons/linkedin.png";
import twitter from "/media/pranshu/My Passport/my-blog/src/icons/twitter.png";
const Myprofile = () => {
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
        <div className="my-blogs">
          <div className="my-blogs-container">
            <p className="title">My first blog on Machine Learning</p>
            <p className="sub-heading">
              Use of Artificial intelligence is increasing rapidly{" "}
            </p>
            <div>
              <p>likes: 10k</p>
              <p>comments: 3k</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Myprofile;
