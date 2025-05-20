import Subscription from "../models/subscriptions.js";

export const createSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id, // Assuming you have user info in req.user
        })
    } catch (error) {
        next(error);
    }
}