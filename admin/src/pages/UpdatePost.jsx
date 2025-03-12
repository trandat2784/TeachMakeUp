import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets.js";
import { toast } from "react-toastify";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AdminContextKey } from "../Context/AdminContext.jsx";
const UpdatePost = ({ token }) => {
  const { posts } = useContext(AdminContextKey);
  const { id } = useParams();
  const [postData, setPostData] = useState([]);
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);
  const [title, setTitle] = useState("");
  const [videoId, setVideoId] = useState("");
  const [description, setDescription] = useState();
  const [category, setCategory] = useState("hairandnails");
  const [subCategory, setSubcategory] = useState("Men");
  const [steps, setSteps] = useState(1);
  const [renderInput, setRenderInput] = useState(Array(steps).fill(""));
  useEffect(() => {
    fetchPostData();
    setRenderInput(Array(steps).fill(""));
  }, [steps]);
  const fetchPostData = async () => {
    const foundPost = posts.find((item) => item._id === id);
    if (foundPost) {
      setPostData(foundPost);
    } else {
      console.log("Post not found");
    }
  };
  useEffect(() => {
    setTitle(postData.title);
    setVideoId(postData.videoId)
    setDescription(postData.description)
    setCategory(postData.category)
    if (postData && Array.isArray(postData.step)) {
      setSteps(postData.step.length);
       setRenderInput(postData.step); 
    }
    else
    {
       setRenderInput(Array(steps).fill(""));
    }
    // console.log(postData);
  }, [postData]);
  const handleStepChange = (index, value) => {
    const newRenderInput = [...renderInput];
    newRenderInput[index] = value;
    setRenderInput(newRenderInput);
    console.log(renderInput);
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title); 
      formData.append("description", description);
      formData.append("videoId", videoId);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("step", JSON.stringify(renderInput));
      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);
      formData.append("PostId", id);
      console.log(title, description, videoId, category, renderInput);
      const response = await axios.post(
        "http://localhost:3000" + "/api/post/update",
        formData,
        { headers: { token } }
      );
      if (response.data.success) {
        console.log(response.data.success);
        toast.success(response.data.message);
        setTitle("");
        setDescription("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        
      } else {
        toast.error(response.data.message);
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <form
      action=""
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full items-start gap-3 "
    >
      <div>
        <p className="mb-2">Upload image</p>
        <div className="flex gap-2">
          <label htmlFor="image1">
            <img
              className="w-20 h-20"
              src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
              alt=""
            />
            <input
              onChange={(e) => setImage1(e.target.files[0])}
              type="file"
              id="image1"
              hidden
            />
          </label>
          <label htmlFor="image2">
            <img
              className="w-20 h-20"
              src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
              alt=""
            />
            <input
              onChange={(e) => setImage2(e.target.files[0])}
              type="file"
              id="image2"
              hidden
            />
          </label>
          <label htmlFor="image3">
            <img
              className="w-20 h-20"
              src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
              alt=""
            />
            <input
              onChange={(e) => setImage3(e.target.files[0])}
              type="file"
              id="image3"
              hidden
            />
          </label>
          <label htmlFor="image4">
            <img
              className="w-20 h-20"
              src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
              alt=""
            />
            <input
              onChange={(e) => setImage4(e.target.files[0])}
              type="file"
              id="image4"
              hidden
            />
          </label>
        </div>
      </div>
      <div className="w-full">
        <p className="mb-2">Post title</p>
        <input
          onChange={(e) => setTitle(e.target.value)}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Type here"
          required=""
          value={title}
        />
      </div>
      <div className="w-full">
        <p className="mb-2">Video id</p>
        <input
          onChange={(e) => setVideoId(e.target.value)}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Id video youtube"
          required=""
          value={videoId}
        />
      </div>
      <div className="w-full">
        <p className="mb-2">Post description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Write content here"
          required=""
          value={description}
        ></textarea>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Sub category</p>
          <select
            onChange={(e) => setSubcategory(e.target.value)}
            className="w-full px-3 py-2"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div>
          <p className="mb-2">Post category</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2"
          >
            <option value="hairandnails">Hair and Nails</option>
            <option value="skin">Skin</option>
            <option value="perfume">Perfume</option>
            <option value="outfit">Outfit</option>
          </select>
        </div>
        <div>
          <p className="mb-2">Steps</p>
          <input
            onChange={(e) => setSteps(Number(e.target.value))}
            className="w-full px-3 py-2 sm:w-[120px]"
            type="Number"
            placeholder="1"
            value={steps}
          />
        </div>
      </div>
      {renderInput.map((step, index) => (
        <div className="w-full" key={index}>
          <p className="mb-2">Post description</p>
          <textarea
            onChange={(e) => handleStepChange(index, e.target.value)}
            className="w-full max-w-[500px] px-3 py-2"
            type="text"
            placeholder="Write content here"
            required=""
            value={step}
          ></textarea>
        </div>
      ))}
      <button type="submit" className="w-28 py-3 mt-4 bg-black text-white">
        UPDATE
      </button>
    </form>
  );
};

export default UpdatePost;
