import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../Redux/authSlice";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import store from "../Redux/Store";
import { Loader2 } from "lucide-react";

function Signup() {
  const fullNameElement = useRef();
  const emailElement = useRef();
  const passwordElement = useRef();
  const profilePhotoElement = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((store) => store.auth);

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName", fullNameElement.current.value);
    formData.append("email", emailElement.current.value);
    formData.append("password", passwordElement.current.value);
    if (profilePhotoElement.current.files[0]) {
      formData.append("file", profilePhotoElement.current.files[0]);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(
        "http://localhost:8080/api/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Sign Up
        </h2>
        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              ref={fullNameElement}
              placeholder="Enter your full name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              ref={emailElement}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              ref={passwordElement}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Profile Picture
            </label>
            <input
              type="file"
              name="file"
              accept="image/*"
              ref={profilePhotoElement}
              className="w-full text-gray-700 cursor-pointer"
            />
          </div>

          <div>
            {loading ? (
              <button className="w-full my-4 flex items-center justify-center bg-black text-white">
                <Loader2 className="animate-spin" /> Please wait
              </button>
            ) : (
              <button
                type="submit"
                className="w-full px-4 py-2 bg-black text-white font-medium rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Sign Up
              </button>
            )}
          </div>
        </form>
        <div className="mt-4 text-center">
          <span className="text-sm">Already have an account? </span>
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
