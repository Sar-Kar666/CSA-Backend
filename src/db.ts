import {model,Schema} from "mongoose";
import mongoose from "mongoose";

mongoose.connect("mongodb+srv://diptanusarkar3020:200232%4012@cluster1.wf334v7.mongodb.net/Course-Selling-App?retryWrites=true&w=majority&appName=Cluster1");

const UserSchema = new Schema({
    email: String,
    username : {type:String, unique:true},
    password: String
})

export const USermodel = model("User", UserSchema);