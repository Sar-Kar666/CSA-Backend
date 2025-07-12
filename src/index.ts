import express from "express";
import mongoose from "mongoose";
import { USermodel } from "./db";
import { userRouter } from "./routes/user";
import cors from "cors";


const PORT = process.env.PORT || 3000;



const app= express();
app.use(express.json());
// app.use(cors({
//   origin: ["https://course-selling-website-delta.vercel.app"],
//   methods: ["GET", "POST"],
//   credentials: true
// }))

app.use(cors());



app.use("/user",userRouter);


app.get("/", (_, res) => {
  res.send("API is running!");
});







app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});