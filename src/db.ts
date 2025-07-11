import {model,Schema} from "mongoose";
import mongoose from "mongoose";

mongoose.connect("mongodb+srv://diptanusarkar3020:taq2YRLqI3CJIGhW@cluster12.jqdns3v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster12");

const UserSchema = new Schema({
    email: String,
    username : {type:String, unique:true},
    password: String
})

export const USermodel = model("User", UserSchema);