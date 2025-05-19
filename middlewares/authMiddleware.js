import User from "../models/userModel";

const authorize = async (req, res, next) => {
    try {
        // Check if the token is present in the cookies
        const token = req.cookies.token;
        // If the token is not present, return an unauthorized error
        if (!token) {
            return res.status(401).json({
                status: "fail",
                message: "Unauthorized",
            });
        }
        // Verify the token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        // If the user is not found, return an unauthorized error
        if (!user) {
            return res.status(401).json({
                status: "fail",
                message: "Unauthorized",
            });
        }
        // If the user is found, attach the user to the request object and call next()
        // to proceed to the next middleware or route handler
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            status: "fail",
            message: "Unauthorized",
        });
    }
}

export default authorize;