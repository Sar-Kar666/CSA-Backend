import { Router } from "express";
import { Coursemodel } from "../db";
const courseRouter = Router();


courseRouter.get("/preview", async function(req, res) {
    
    const courses = await Coursemodel.find({});

    res.json({
        courses
    })
})

export {courseRouter};