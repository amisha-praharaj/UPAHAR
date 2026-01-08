import express from "express";
import { addAddress, getAddress, updateAddress } from "../controllers/addressController.js";
import authUser from "../middlewares/authUser.js";

const addressRouter = express.Router();

// Protected routes
addressRouter.post("/add", authUser, addAddress);
addressRouter.get("/get", authUser, getAddress);
addressRouter.put("/update", authUser, updateAddress);

export default addressRouter;










// import { addAddress, getAddress } from "../controllers/addressController.js";
// import authUser from "../middlewares/authUser.js";
// import express from "express";

// const addressRouter = express.Router();

// addressRouter.post("/add", authUser, addAddress);
// addressRouter.post("/get", authUser, getAddress);

// export default addressRouter;



