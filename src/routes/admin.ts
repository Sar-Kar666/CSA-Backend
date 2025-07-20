import { Router } from "express";
import jwt from "jsonwebtoken";
import { adminMiddleware } from "../middleware/adminMiddleware";
import { Adminmodel, Coursemodel } from "../db";
const adminRouter = Router();
const JWT_ADMIN_PASSWORD="dasdsadasdasd";

adminRouter.post("/signup", async function(req, res) {
    const { email, password, username } = req.body; // TODO: adding zod validation
    // TODO: hash the password so plaintext pw is not stored in the DB

    // TODO: Put inside a try catch block
    await Adminmodel.create({
        email: email,
        password: password,
        username:username
    })
    
    res.json({
        message: "Signup succeeded"
    })
});

adminRouter.post("/signin", async function(req, res) {
    const { email, password } = req.body;

    // TODO: ideally password should be hashed, and hence you cant compare the user provided password and the database password
    const admin = await Adminmodel.findOne({
        email: email,
        password: password
    });

    if (admin) {
        const token = jwt.sign({
            id: admin._id,
            role: "admin"
        }, JWT_ADMIN_PASSWORD);

        // Do cookie logic

        res.json({
            token: token
        })
    } else {
        res.status(403).json({
            message: "Incorrect credentials"
        })
    }
});



adminRouter.post("/course", adminMiddleware, async function(req, res) {
    //@ts-ignore
    const adminId = req.userId;

    const { title, description, imageUrl, price } = req.body;

    // creating a web3 saas in 6 hours
    const course = await Coursemodel.create({
        title: title, 
        description: description, 
        imageUrl: imageUrl, 
        price: price, 
        creatorId: adminId
    })

    res.json({
        message: "Course created",
        courseId: course._id
    })
})


adminRouter.put("/course", adminMiddleware, async function(req, res) {
    //@ts-ignore
    const adminId = req.userId;

    const { title, description, imageUrl, price, courseId } = req.body;

    // creating a web3 saas in 6 hours
    const course = await Coursemodel.updateOne({
        _id: courseId, 
        creatorId: adminId 
    }, {
        title: title, 
        description: description, 
        imageUrl: imageUrl, 
        price: price
    })

    res.json({
        message: "Course updated",
        //@ts-ignore
        courseId: course._id
    })
})

export {adminRouter};