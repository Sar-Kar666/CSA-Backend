"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.USermodel = exports.Purchasemodel = exports.Coursemodel = exports.Adminmodel = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
mongoose_2.default.connect("mongodb+srv://diptanusarkar3020:taq2YRLqI3CJIGhW@cluster12.jqdns3v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster12");
const UserSchema = new mongoose_1.Schema({
    email: String,
    username: { type: String, unique: true },
    password: String
});
const AdminSchema = new mongoose_1.Schema({
    email: String,
    username: { type: String, unique: true },
    password: String
});
const CourseSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: String,
    price: Number,
    imageUrl: String,
    creatorId: { type: mongoose_1.Types.ObjectId, required: true },
});
const PurchaseSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Types.ObjectId, required: true },
    courseId: { type: mongoose_1.Types.ObjectId, required: true }
});
exports.Adminmodel = (0, mongoose_1.model)("Admin", AdminSchema);
exports.Coursemodel = (0, mongoose_1.model)("Courses", CourseSchema);
exports.Purchasemodel = (0, mongoose_1.model)("Purchase", PurchaseSchema);
exports.USermodel = (0, mongoose_1.model)("User", UserSchema);
