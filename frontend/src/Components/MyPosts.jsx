import React, { useState } from "react";
import AllPosts from "./AllPosts";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { setLoading } from "../Redux/authSlice";
import { deletePost, updatePost } from "../Redux/postSlice";
import { Link } from "react-router-dom";

function MyPosts() {
  const { allposts } = useSelector((store) => store.post);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const [editingPostId, setEditingPostId] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", description: "" });

  const userPosts = user
    ? allposts.filter((post) => post.created_by._id === user._id)
    : [];

  const deletePostHandler = async (postId) => {
    try {
      dispatch(setLoading(true));
      const res = await axios.delete(
        `http://localhost:8080/api/deletepost/${postId}`,
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        console.log(res);
        toast.success(res.data.message);
        dispatch(deletePost(postId));
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const updateInput = {
    title: editForm.title,
    description: editForm.description,
  };

  const updatePostHandler = async (postId) => {
    try {
      dispatch(setLoading(true));
      const res = await axios.put(
        `http://localhost:8080/api/updatepost/${postId}`,
        updateInput,
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        console.log("Update api respose", res.data);
        toast.success(res.data.message);
        dispatch(updatePost(res.data.post));
        setEditingPostId(null);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update post.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleEditClick = (post) => {
    setEditingPostId(post._id);
    setEditForm({ title: post.title, description: post.description });
  };

  const cancelEdit = () => {
    setEditingPostId(null);
    setEditForm({ title: "", description: "" });
  };

  return (
    <div className="bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {userPosts.length > 0 ? (
            userPosts.map((item) => (
              <div
                key={item._id}
                className="relative bg-white shadow-md rounded-lg p-4"
              >
                <AllPosts items={item} />

                <button
                  onClick={() => deletePostHandler(item._id)}
                  className="absolute top-2 right-2 bg-red-600 text-white text-sm px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>

                <button
                  onClick={() => handleEditClick(item)}
                  className="mt-4 w-full bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700"
                >
                  Edit
                </button>
              </div>
            ))
          ) : (
            <p>No posts available.</p>
          )}
        </div>
      </div>

      {editingPostId && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-lg font-semibold mb-4">Edit Post</h2>
            <input
              type="text"
              value={editForm.title}
              onChange={(e) =>
                setEditForm((prev) => ({ ...prev, title: e.target.value }))
              }
              className="w-full mb-4 p-2 border rounded"
              placeholder="Title"
            />
            <textarea
              value={editForm.description}
              onChange={(e) =>
                setEditForm((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              className="w-full mb-4 p-2 border rounded"
              placeholder="Description"
            />
            <div className="flex justify-between">
              <button
                onClick={() => updatePostHandler(editingPostId)}
                className="bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700"
              >
                Save
              </button>
              <button
                onClick={cancelEdit}
                className="bg-gray-400 text-white text-sm px-3 py-1 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyPosts;
