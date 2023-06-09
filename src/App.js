import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import CreateBlog from "./components/CreateBlog";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import SharedLayout from "./components/SharedLayout";
import { AuthProvider } from "./context/Provider";
import Myprofile from "./components/Myprofile";
import Posts from "./components/modal/Posts";
function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SharedLayout />}>
              <Route index element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/create" element={<CreateBlog />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/Signup" element={<Signup />} />
              <Route path="/myprofile" element={<Myprofile />} />
              <Route path="/posts" element={<Posts />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
