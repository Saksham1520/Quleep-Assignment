import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAllPosts } from "../Redux/postSlice";
import axios from "axios";

function useGetAllPosts() {
  const dispatch = useDispatch();
  return useEffect(() => {
    const fetchedAllPosts = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/getAllPosts", {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setAllPosts(res.data.posts));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchedAllPosts();
  }, []);
}

export default useGetAllPosts;
