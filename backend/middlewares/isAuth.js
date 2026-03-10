import JWT from "jsonwebtoken";

const isAuth = async (req, res, next) => {
    try {
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized: No token provided",
            });
        }

        const decoded = JWT.verify(token, process.env.JWT_SECRET);

        // Attach userId to request
        req.userId = decoded.userId;

        next();
    } catch (error) {
        console.log("isAuth error:", error.message);

        return res.status(401).json({
            message: "Unauthorized: Invalid or expired token",
        });
    }
};

export default isAuth;