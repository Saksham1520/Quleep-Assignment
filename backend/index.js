import express from "express"
import cookieParser from "cookie-parser";
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.routes.js"
import postRoute from "./routes/post.routes.js"
dotenv.config({});

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
}
app.use(cors(corsOptions))

const PORT = process.env.PORT


app.use("/api", userRoute)
app.use("/api", postRoute)

app.listen(PORT, () => {
    connectDB()
    console.log(`Server is runing at port ${PORT}`)
})

