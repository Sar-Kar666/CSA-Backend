import express from "express";
import { userRouter } from "./routes/user";
import { courseRouter } from "./routes/courses";
import { adminRouter } from "./routes/admin";
import cors from "cors";

const PORT = process.env.PORT || 3000;



const app= express();
app.use(express.json());
app.use(cors({
  origin: ["https://course-selling-website-gxal.vercel.app"],
  methods: ["GET", "POST"],
  credentials: true
}))

// app.use(cors());



app.use("/user",userRouter);
app.use("/courses",courseRouter);
app.use("/admin",adminRouter);


app.get("/", (_, res) => {
  res.send("API is running!");
});







app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});