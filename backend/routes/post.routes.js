import express from "express"
import { createpost, deletePost, getAllPosts, getPostById, updatePost } from "../controllers/posts.controller.js"
import isAuthenticated from "../middleware/isAuthenticated.js"
const router = express.Router()

router.route("/createpost").post(isAuthenticated, createpost)
router.route("/getAllPosts").get(isAuthenticated, getAllPosts)
router.route("/getpost/:id").get(isAuthenticated, getPostById)
router.route("/updatepost/:id").put(isAuthenticated, updatePost)
router.route("/deletepost/:id").delete(isAuthenticated, deletePost)

export default router;