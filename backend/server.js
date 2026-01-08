import dotenv from "dotenv";
dotenv.config();
import session from "express-session";
import cookieParser from "cookie-parser";
import express from "express";
import axios from "axios";
import cors from "cors";
import connectDB from "./configs/db.js";
import userRoute from "./routes/userRoute.js";
import sellerRoute from "./routes/sellerRoutes.js";
import connectCloudinary from "./configs/cloudinary.js";
import productRouter from "./routes/productRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import addressRouter from "./routes/addressRoutes.js";
import orderRouter from "./routes/orderRoutes.js";

const app = express();
const port = process.env.PORT || 5000;

await connectDB();
await connectCloudinary();

const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 },
  })
);

// Routes
app.get("/", (req, res) => {
  res.send("Hello from backend");
});

app.use("/api/user", userRoute);
app.use("/api/seller", sellerRoute);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);
app.use("/api/order", orderRouter);
app.use("/uploads", express.static("uploads"));

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});










// import dotenv from 'dotenv';
// dotenv.config();
// import session from 'express-session';
// import cookieParser from 'cookie-parser';
// import express from 'express';
// import cors from 'cors';
// import connectDB from './configs/db.js';
// import userRoute from './routes/userRoute.js';
// import sellerRoute from './routes/sellerRoutes.js';
// import connectCloudinary from './configs/cloudinary.js';
// import productRouter from './routes/productRoutes.js';
// import cartRouter from './routes/cartRoutes.js';
// import addressRouter from './routes/addressRoutes.js';
// import orderRouter from './routes/orderRoutes.js';



// const app = express();
// const port = process.env.PORT || 5000;

// await connectDB();
// await connectCloudinary();

// //allowed multiple origins
// const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];

// //middleware confi
// app.use(express.json());
// app.use(cookieParser());
// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true
// }));

// app.use(express.json());
// app.use(cookieParser());

// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     secure: false, // true only in production (with HTTPS)
//     maxAge: 24 * 60 * 60 * 1000, // 1 day
//   },
// }));


// //route
// app.get('/', (req,res)=>{
//     res.send('hello from backend');
// })

// app.use('/api/user', userRoute)
// app.use('/api/seller', sellerRoute)
// app.use('/api/product', productRouter)
// app.use('/api/cart', cartRouter)
// app.use('/api/address', addressRouter)
// app.use('/api/order', orderRouter)
// app.use('/uploads', express.static('uploads'));





// app.listen(port,()=>{
//     console.log(`server is running on http://localhost:${port}`)
// })