import express from "express";
import { Router } from "express";
import { USermodel } from "../db";
import jwt from "jsonwebtoken";
import { userMiddleware } from "../middleware/userMiddleware";
const JWT_PASSWORD="askdasmdkas;mdkasd";

const userRouter = Router();

userRouter.post("/signup", async (req,res)=>{
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



userRouter.post("/signin", async (req,res)=>{
    
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


    // userRouter.get("/purchases",userMiddleware, async function (req,res) {
    //     //@ts-ignore
    //     const userId=req.userId;

    //     const purchases= await purchaseModel.find({
    //         userId
    //     });


    // })


export {userRouter};