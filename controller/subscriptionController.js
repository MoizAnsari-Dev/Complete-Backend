import Subscription from "../models/subscriptions.js";


// Create a new subscription
export const createSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id, // Assuming you have user info in req.user
        })
        res.status(201).json({
            status: "success",
            data: {
                subscription,
            },
        });
    } catch (error) {
        next(error);
    }
}

// Get all subscriptions for a user
export const getUserSubscriptions = async (req, res, next) => {
    try {
        // Check if the user is authorized to view this subscription
        // Assuming req.user.id is the ID of the logged-in user
        if (req.user.id !== req.params.id) {
            return res.status(403).json({
                status: "fail",
                message: "You are not authorized to view this resource",
            });
        }
        // Fetch subscriptions for the user
        // Assuming req.params.id is the ID of the user whose subscriptions you want to fetch
        const subscriptions = await Subscription.find({ user: req.params.id })
        // Check if subscriptions exist
        console.log(subscriptions);
        
        res.status(200).json({
            status: "success",
            data: {
                subscriptions,
            },
        });

    } catch (error) {
        next(error);
    }
}