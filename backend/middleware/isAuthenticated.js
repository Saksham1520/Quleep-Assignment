import jwt from "jsonwebtoken";
const isAuthenticated = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            res.status(401).json({
                message: "User is not Authenticated !!",
                success: false
            })
        }
        const decode = jwt.verify(token, process.env.SECRET_KEY);
        if (!decode) {
            return res.status(401).json({
                message: "Invalid Token",
                success: false
            })
        }
        req.id = decode.userId;

        next()
    } catch (error) {
        console.log(error);

    }
}
export default isAuthenticated;