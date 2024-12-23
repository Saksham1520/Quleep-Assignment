import { createSlice } from "@reduxjs/toolkit";


const postSlice = createSlice({
    name: "post",
    initialState: {
        allposts: []
    },
    reducers: {
        setAllPosts: (state, action) => {
            state.allposts = action.payload;

        },
        deletePost: (state, action) => {
            state.allposts = state.allposts.filter((post) => post._id !== action.payload);
        },
        updatePost: (state, action) => {
            const updatedPost = action.payload;
            console.log(updatedPost)
            const index = state.allposts.findIndex((post) => post._id === updatedPost._id);


            if (index !== -1) {
                state.allposts[index] = updatedPost;
            }
        }
    }
})

export const {
    setAllPosts, deletePost, updatePost
} = postSlice.actions;

export default postSlice.reducer