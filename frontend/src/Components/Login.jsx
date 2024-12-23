import { Loader2 } from "lucide-react";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setLoading, setUser } from "../Redux/authSlice";
import axios from "axios";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();

  const { loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const emailElement = useRef();
  const passwordElement = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();

    const loginInput = {
      email: emailElement.current.value,
      password: passwordElement.current.value,
    };

    try {
      dispatch(setLoading(true));
      const res = await axios.post(
        "http://localhost:8080/api/login",
        loginInput,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
    emailElement.current.value = "";
    passwordElement.current.value = "";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="Your email"
              ref={emailElement}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Your password"
              ref={passwordElement}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
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
        </form>
        <div className="mt-4 text-center">
          <span className="text-sm">Don't have an account? </span>
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
