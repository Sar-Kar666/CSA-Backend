import express from "express";
import mongoose from "mongoose";
import { USermodel } from "./db";
const JWT_PASSWORD="askdasmdkas;mdkasd";
import jwt from "jsonwebtoken";
import cors from "cors";
const PORT = process.env.PORT || 3000;



const app= express();
app.use(express.json());
const allowedOrigins = [
  "http://localhost:5173", 
  "https://course-selling-website-gxal.vercel.app"
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST"],
  credentials: true
}));


app.get("/", (_, res) => {
  res.send("API is running!");
});



app.post("/signup", async (req,res)=>{
    try{
    const username = req.body.username;
    const email=req.body.email;
    const password = req.body.password;

       await USermodel.create({
            
            username: username,
            email: email,
            password: password
        })

        res.json({
            mesasge: "done"
        })
    }catch(e){
          res.status(500).json({ error: "Internal Server Error" });
            
        
    }
   

});

app.post("/signin", async (req,res)=>{
    
    const email = req.body.email;
    const password = req.body.password;
    const existingUser= await USermodel.findOne({
            email, password 
        })
        
        if(existingUser){
            const token= jwt.sign({
                    id: existingUser._id
                    
            },JWT_PASSWORD)
           
            res.json({
                token
                
            })
            
        }else{
            res.status(403).json({
                message: "Incorrect credentials"
            })
        }
       

       
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});