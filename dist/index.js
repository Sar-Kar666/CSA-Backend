"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("./routes/user");
const courses_1 = require("./routes/courses");
const admin_1 = require("./routes/admin");
const cors_1 = __importDefault(require("cors"));
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
// app.use(cors({
//   origin: ["https://course-selling-website-gxal.vercel.app"],
//   methods: ["GET", "POST"],
//   credentials: true
// }))
app.use((0, cors_1.default)());
app.use("/user", user_1.userRouter);
app.use("/courses", courses_1.courseRouter);
app.use("/admin", admin_1.adminRouter);
app.get("/", (_, res) => {
    res.send("API is running!");
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
