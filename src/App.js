import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import CreateBlog from "./components/CreateBlog";
import SharedLayout from "./components/SharedLayout";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/create" element={<CreateBlog />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
