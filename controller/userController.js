import User from "../models/userModel.js";

export const getUsers = async (req, res, next) => {
    try {
        // find all users
        const users = await User.find();
        res.status(200).json({
            status: "success",
            data: {
                users,
            },
        });
    } catch (error) {
        return next(error);
    }
}

export const getUser = async (req, res, next) => {
    try {
        // find user by id
        const user = await User.findById(req.params.id).select("-password");// exclude password from response
        // check if user exists
        if (!user) {
            return res.status(404).json({
                status: "fail",
                message: "User not found",
            });
        }
        res.status(200).json({
            status: "success",
            data: {
                user,
            },
        });
    } catch (error) {
        return next(error);
    }
}