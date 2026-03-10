import JWT from "jsonwebtoken";

const adminAuth = (req, res, next) => {
    try {
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized: No token provided",
            });
        }

        const decoded = JWT.verify(token, process.env.JWT_SECRET);

        // ✅ Check if user is admin
        if (!decoded) {
            return res.status(403).json({
                message: "Forbidden: Admin access only",
            });
        }

        req.user = decoded; // attach full user data
        req.adminEmail = decoded.email; // 👈 ye add karo
        
        next();
    } catch (error) {
        console.log("adminAuth error:", error.message);

        return res.status(401).json({
            message: "Unauthorized: Invalid or expired token",
        });
    }
};

export default adminAuth;