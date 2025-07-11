"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.USermodel = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
mongoose_2.default.connect("mongodb+srv://diptanusarkar3020:taq2YRLqI3CJIGhW@cluster12.jqdns3v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster12")
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("Connection error:", err));
const UserSchema = new mongoose_1.Schema({
    email: String,
    username: { type: String, unique: true },
    password: String
});
exports.USermodel = (0, mongoose_1.model)("User", UserSchema);
