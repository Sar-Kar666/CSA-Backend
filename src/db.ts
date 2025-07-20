import {model,Schema, Types} from "mongoose";
import mongoose from "mongoose";

mongoose.connect("mongodb+srv://diptanusarkar3020:taq2YRLqI3CJIGhW@cluster12.jqdns3v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster12");

const UserSchema = new Schema({
    email: String,
    username : {type:String, unique:true},
    password: String
});

const AdminSchema = new Schema({
    email: String,
    username : {type:String, unique:true},
    password: String
});

const CourseSchema = new Schema({
    title: { type: String, required: true },
    description: String,
    price: Number,
    imageUrl: String,
    creatorId: { type: Types.ObjectId, required: true },
});


const PurchaseSchema = new Schema({
    userId:{ type: Types.ObjectId, required: true },
    courseId: { type: Types.ObjectId, required: true }
});

export const Adminmodel=model("Admin",AdminSchema);
export const Coursemodel=model("Courses",CourseSchema);
export const Purchasemodel=model("Purchase",PurchaseSchema);
export const USermodel = model("User", UserSchema);