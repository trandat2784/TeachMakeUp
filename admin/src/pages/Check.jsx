import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { assets } from "../../../frontend/src/assets/frontend_assets/assets";
const Check = () => {
  const { PostId } = useParams();
  const [postData, setPostData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const fetchData = async () => {
    try {
    
      console.log("Fetching data review", PostId);
      const response = await axios.post(
        `http://localhost:3000/api/review/single`,
        { PostId }
      );
      console.log("review data", response.data);
      setPostData(response.data.review);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } 
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex gap-6 sm:gap-12 flex-col sm:flex-row">
        <div className="flex-1 flex flex-col-reverse  sm:flex-row">
          <div className="w-full sm:w-[80%]">
            <div>
              {postData.image?.length ? (
                <img
                  className="min-w-400  min-h-450px object-cover"
                  src={postData.image[0]}
                  alt="Post"
                />
              ) : (
                <p>No image available</p>
              )}
            </div>
          </div>
        </div>
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{postData.title}</h1>
          <p className="mt-5 text-gray-500 md:w-4/5">{postData.description}</p>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original content designed for makeup enthusiasts.</p>
            <p>
              Learn step-by-step techniques to enhance your skills and create
              stunning looks.
            </p>
          </div>
        </div>
      </div>
      {/* content 2 */}
      <div className="mt-20 w-full">
        <iframe
          className="w-full"
          height="500"
          src={`https://www.youtube.com/embed/${postData.videoId}?start=37057`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm cursor-pointer">Step to do</b>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm">
          {postData.step?.map((step, index) => {
            return (
              <div key={index}>
                <b className="text-black-100">Step {index + 1}</b>
                <p>{step}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Check;
