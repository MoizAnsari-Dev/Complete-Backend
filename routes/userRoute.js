import { Router } from "express";

const userRouter = Router();

userRouter.get("/", (req, res) => {
  res.status(200).json({
    message: "User route is working",
  });
});

userRouter.get("/:id", (req, res) => {
  const userId = req.params.id;
  res.status(200).json({
    message: `User with ID ${userId} is working`,
  });
});

userRouter.post("/", (req, res) => {
  const newUser = req.body;
  // Here you would typically save the new user to the database
  res.status(201).json({
    message: "User created successfully",
    user: newUser,
  });
});

userRouter.put("/:id", (req, res) => {
  const userId = req.params.id;
  const updatedUser = req.body;
  // Here you would typically update the user in the database
  res.status(200).json({
    message: `User with ID ${userId} updated successfully`,
    user: updatedUser,
  });
});
userRouter.delete("/:id", (req, res) => {
  const userId = req.params.id;
  // Here you would typically delete the user from the database
  res.status(200).json({
    message: `User with ID ${userId} deleted successfully`,
  });
});


export default userRouter;
