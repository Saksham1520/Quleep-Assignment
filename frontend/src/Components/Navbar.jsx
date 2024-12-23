import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { setUser } from "../Redux/authSlice";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const logoutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/logout", {
        withCredentials: true,
      });
      if (res.data.success) {
        console.log(res);
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.message);
    }
  };

  return (
    <nav className="bg-black p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-lg">
          <Link to="/">BlogApp</Link>
        </div>
        <div className="hidden md:flex space-x-8">
          <Link to="/" className="text-white hover:text-gray-300">
            Home
          </Link>
          <Link to="/createpost" className="text-white hover:text-gray-300">
            Create Post
          </Link>
          <Link to="/myposts" className="text-white hover:text-gray-300">
            My Posts
          </Link>
        </div>
        <div className="hidden md:flex space-x-4">
          {user ? (
            <button
              to="/login"
              onClick={logoutHandler}
              className="text-white px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="text-white px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-white px-4 py-2 bg-green-600 rounded hover:bg-green-700"
              >
                Signup
              </Link>
            </>
          )}
        </div>
        <div className="md:hidden flex items-center space-x-4">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-white">
            {menuOpen ? <RxCross1 /> : <GiHamburgerMenu />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden  text-white space-y-4 py-4">
          <div className="flex flex-col items-center justify-center">
            <Link to="/" className=" px-6 py-2">
              Home
            </Link>
            <Link to="/createpost" className=" px-6 py-2">
              Create Post
            </Link>
          </div>
          {user ? (
            <div className="flex justify-center w-full">
              <Link
                to="/login"
                onClick={logoutHandler}
                className="text-center px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
              >
                Logout
              </Link>
            </div>
          ) : (
            <div className="flex flex-col space-y-2 px-6 py-2">
              <Link
                to="/login"
                className="w-fit mx-auto text-center px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="w-fit mx-auto text-center px-4 py-2 bg-green-600 rounded hover:bg-green-700"
              >
                Signup
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
