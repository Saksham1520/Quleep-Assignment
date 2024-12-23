import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLoading } from "../Redux/authSlice";
import axios from "axios";
import { toast } from "react-toastify";

function CreatePost() {
  const titleElement = useRef();
  const descriptionElement = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    const postInput = {
      title: titleElement.current.value,
      description: descriptionElement.current.value,
    };
    try {
      dispatch(setLoading(true));
      const res = await axios.post(
        "http://localhost:8080/api/createpost",
        postInput,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
    } finally {
      dispatch(setLoading(false));
    }
    titleElement.current.value = "";
    descriptionElement.current.value = "";
  };

  return (
    <div className="min-h-screen bg-gray-300 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Create a New Post
        </h2>
        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Title</label>
            <input
              type="text"
              ref={titleElement}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter post title"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">
              Description
            </label>
            <textarea
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter post description"
              rows="4"
              ref={descriptionElement}
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg shadow-md "
          >
            Create Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
