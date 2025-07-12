"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = userMiddleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_PASSWORD = "askdasmdkas;mdkasd";
function userMiddleware(req, res, next) {
    const token = req.headers.token;
    const decode = jsonwebtoken_1.default.verify(token, JWT_PASSWORD);
    if (decode) {
        //@ts-ignore
        req.userId = decode.id;
    }
    else {
        res.status(403).json({
            message: "You are not signed in"
        });
    }
}
