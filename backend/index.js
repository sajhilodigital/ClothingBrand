
// import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./Config/DBconnection.js";
import { userController } from "./UserController/user.controller.js";
import { productRoutes } from "./ProductController/product.routes.js";


// Load env variables
dotenv.config();

// Initialize app
const app = express();

// ------------------------ MIDDLEWARE ------------------------ //


app.use(express.json());
// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser
app.use(cookieParser());

// Connect to MongoDB
await connectDB();

// ------------------------ SECURITY ------------------------ //

// Allow your frontend domain
const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:3000",
  // /\.vercel\.app$/,
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow non-browser requests like curl/postman
    if (
      allowedOrigins.some((o) =>
        typeof o === "string" ? o === origin : o.test(origin)
      )
    ) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed: " + origin));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"],
};

app.use(cors(corsOptions));

// working 
// app.use(cors({
//   origin: (origin, callback) => {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("CORS not allowed: " + origin));
//     }
//   },
//   credentials: true, // ✅ allow cookies
//   methods: ["GET","POST","PUT","DELETE","OPTIONS"],
//   allowedHeaders: ["Content-Type","Authorization"],
// }));



// Prevent NoSQL injection
// app.use(express.json());
// app.use(sanitizeRequest);
// app.use(sanitizeXSS);


// Prevent XSS attacks 
// todo: fix issue prevent attack

// app.use(xss());

// Prevent HTTP parameter pollution
// app.use(hpp());

// Gzip compression
// app.use(compression());

// ------------------------ LOGGING ------------------------ //

// Only in development
// if (process.env.NODE_ENV === "development") {
//   app.use(morgan("dev"));
// }

// ------------------------ RAhttp://localhost:8000/auth LIMIT ------------------------ //

// ------------------------ ROUTES ------------------------ //
app.get("/", (req, res) => {
  res.send("Hello from Render backend 🚀");
});


// Prefix all user routes
app.use("/api/auth", userController);
app.use("/api/product", productRoutes);

// app.use(er);

// ------------------------ GLOBAL ERROR HANDLER ------------------------ //

app.use((err, req, res, next) => {
  console.error("Global Error Handler:", err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// ------------------------ START SERVER ------------------------ //

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `✅ Server running in ${
      process.env.NODE_ENV || "development"
    } mode on port ${PORT}`
  );
});
