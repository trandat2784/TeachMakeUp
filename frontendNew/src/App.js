import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

import Collection from "./pages/Collection";

import Login from "./pages/Login";
import Product from "./pages/Product";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import Search from "./component/Search";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Post from "./pages/Post";
import ReadPost from "./pages/ReadPost";
import UpPost from "./pages/UpPost";
import MyPost from "./pages/MyPost";
import Favourites from "./pages/Favourites";
import ForgetPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <ToastContainer />
      <Navbar />
      <Search />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/Collection" element={<Collection />} />

        <Route path="/Login" element={<Login />} />
        <Route path="/Product/:ProductId" element={<Product />} />
        <Route path="/Post" element={<Post />} />
        <Route path="/ReadPost/:PostId" element={<ReadPost />} />
        <Route path="/Favourites/" element={<Favourites />} />
        <Route path="/Up-post" element={<UpPost />} />
        <Route path="/My-post" element={<MyPost />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route
          path="/reset-password/:id/:token"
          element={<ResetPassword />}
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
