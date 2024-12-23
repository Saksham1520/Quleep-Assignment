import { Post } from "../models/post.model.js";

export const createpost = async (req, res) => {
    try {
        const { title, description } = req.body;
        const userId = req.id;

        if (!title || !description) {
            res.status(400).json({
                message: "Both Fields are required !!",
                success: false
            })
        }


        const post = await Post.create({
            title,
            description,
            created_by: userId
        })

        return res.status(200).json({
            message: "New Post created successfully",
            success: true
        })


    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong',
            error: error.message
        })
    }
}

export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate({ path: "created_by" }).sort({ created_At: -1 })
        if (!posts) {
            return res.status(404).json({
                message: "Jobs not found",
                success: false
            })
        }
        return res.status(200).json({
            message: "All posts are retrieved.",
            posts,
            success: true
        })

    } catch (error) {
        console.log(error);

    }
}

export const getPostById = async (req, res) => {
    try {
        const postId = req.params.id;
        console.log("Post ID:", postId);
        const post = await Post.findById(postId)
        if (!post) {
            return res.status(400).json({
                message: "No Post found",
                success: false
            })
        }
        return res.status(200).json({
            post,
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message,
        });
    }
}

export const updatePost = async (req, res) => {
    try {
        const { title, description } = req.body
        const postId = req.params.id;

        let post = await Post.findById(postId).populate({ path: "created_by" })
        if (!post) {
            return res.status(404).json({
                message: "Post not found",
                success: false,
            });
        }

        if (title) post.title = title
        if (description) post.description = description

        await post.save()



        return res.status(200).json({
            message: "Post is updated successfully",
            post,
            success: true
        })

    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message,
        });
    }
}

export const deletePost = async (req, res) => {
    try {
        const postId = req.params.id

        const post = await Post.findByIdAndDelete(postId)

        if (!post) {
            res.status(404).json({
                message: "Post not found",
                success: false
            })
        }

        res.status(200).json({
            message: "Post deleted successfully",
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message,
        });
    }

}