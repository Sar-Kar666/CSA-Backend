"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminMiddleware = adminMiddleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_ADMIN_PASSWORD = "dasdsadasdasd";
function adminMiddleware(req, res, next) {
    const token = req.headers.token;
    const decoded = jsonwebtoken_1.default.verify(token, JWT_ADMIN_PASSWORD);
    if (decoded) {
        //@ts-ignore
        req.userId = decoded.id;
        next();
    }
    else {
        res.status(403).json({
            message: "You are not signed in"
        });
    }
}
