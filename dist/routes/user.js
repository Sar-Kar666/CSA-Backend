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
exports.userRouter = void 0;
const express_1 = require("express");
const db_1 = require("../db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userMiddleware_1 = require("../middleware/userMiddleware");
const JWT_PASSWORD = "askdasmdkas;mdkasd";
const userRouter = (0, express_1.Router)();
exports.userRouter = userRouter;
userRouter.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        yield db_1.USermodel.create({
            username: username,
            email: email,
            password: password
        });
        res.json({
            mesasge: "done"
        });
    }
    catch (e) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
userRouter.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = req.body.password;
    const existingUser = yield db_1.USermodel.findOne({
        email, password
    });
    if (existingUser) {
        const token = jsonwebtoken_1.default.sign({
            id: existingUser._id,
            role: "user"
        }, JWT_PASSWORD);
        res.json({
            token
        });
    }
    else {
        res.status(403).json({
            message: "Incorrect credentials"
        });
    }
}));
userRouter.get("/purchases", userMiddleware_1.userMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        //@ts-ignore
        const userId = req.userId;
        const purchases = yield db_1.Purchasemodel.find({
            userId
        });
        let purchasedCourseIds = [];
        for (let i = 0; i < purchases.length; i++) {
            purchasedCourseIds.push(purchases[i].courseId);
        }
        const coursesData = yield db_1.Coursemodel.find({
            _id: { $in: purchasedCourseIds }
        });
        res.json({
            purchases,
            coursesData
        });
    });
});
