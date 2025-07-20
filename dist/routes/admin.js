"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRouter = void 0;
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const adminMiddleware_1 = require("../middleware/adminMiddleware");
const db_1 = require("../db");
const adminRouter = (0, express_1.Router)();
exports.adminRouter = adminRouter;
const JWT_ADMIN_PASSWORD = "dasdsadasdasd";
adminRouter.post("/signup", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password, username } = req.body; // TODO: adding zod validation
        // TODO: hash the password so plaintext pw is not stored in the DB
        // TODO: Put inside a try catch block
        yield db_1.Adminmodel.create({
            email: email,
            password: password,
            username: username
        });
        res.json({
            message: "Signup succeeded"
        });
    });
});
adminRouter.post("/signin", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        // TODO: ideally password should be hashed, and hence you cant compare the user provided password and the database password
        const admin = yield db_1.Adminmodel.findOne({
            email: email,
            password: password
        });
        if (admin) {
            const token = jsonwebtoken_1.default.sign({
                id: admin._id,
                role: "admin"
            }, JWT_ADMIN_PASSWORD);
            // Do cookie logic
            res.json({
                token: token
            });
        }
        else {
            res.status(403).json({
                message: "Incorrect credentials"
            });
        }
    });
});
adminRouter.post("/course", adminMiddleware_1.adminMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        //@ts-ignore
        const adminId = req.userId;
        const { title, description, imageUrl, price } = req.body;
        // creating a web3 saas in 6 hours
        const course = yield db_1.Coursemodel.create({
            title: title,
            description: description,
            imageUrl: imageUrl,
            price: price,
            creatorId: adminId
        });
        res.json({
            message: "Course created",
            courseId: course._id
        });
    });
});
adminRouter.put("/course", adminMiddleware_1.adminMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        //@ts-ignore
        const adminId = req.userId;
        const { title, description, imageUrl, price, courseId } = req.body;
        // creating a web3 saas in 6 hours
        const course = yield db_1.Coursemodel.updateOne({
            _id: courseId,
            creatorId: adminId
        }, {
            title: title,
            description: description,
            imageUrl: imageUrl,
            price: price
        });
        res.json({
            message: "Course updated",
            //@ts-ignore
            courseId: course._id
        });
    });
});
