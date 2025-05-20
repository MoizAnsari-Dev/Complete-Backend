import { Router } from "express";
import authorize from "../middlewares/authMiddleware.js";
import { createSubscription, getUserSubscriptions } from "../controller/subscriptionController.js";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) => {
  res.status(200).json({
    message: "Subscription route is working",
  });
});
subscriptionRouter.get("/:id", authorize, getUserSubscriptions);
subscriptionRouter.post("/", authorize, createSubscription);
subscriptionRouter.put("/:id", (req, res) => {
  const subscriptionId = req.params.id;
  const updatedSubscription = req.body;
  // Here you would typically update the subscription in the database
  res.status(200).json({
    message: `Subscription with ID ${subscriptionId} updated successfully`,
    subscription: updatedSubscription,
  });
});
subscriptionRouter.delete("/:id", (req, res) => {
  const subscriptionId = req.params.id;
  // Here you would typically delete the subscription from the database
  res.status(200).json({
    message: `Subscription with ID ${subscriptionId} deleted successfully`,
  });
});
subscriptionRouter.get("/user/:id", (req, res) => {
  const userId = req.params.userId;
  // Here you would typically fetch subscriptions for the user from the database
  res.status(200).json({
    message: `Subscriptions for all user with ID ${userId} fetched successfully`,
  });
});
subscriptionRouter.put(
  "/:id/cancel",
  (req, res) => {
    const subscriptionId = req.params.id;
    // Here you would typically activate the subscription in the database
    res.status(200).json({
      message: `Subscription with ID ${subscriptionId} cancel successfully`,
    });
  }
);
subscriptionRouter.get('/upcoming-renewals', (req, res) => {
  // Here you would typically fetch upcoming renewals from the database
  res.status(200).json({
    message: 'Upcoming renewals fetched successfully',
  });
});

export default subscriptionRouter