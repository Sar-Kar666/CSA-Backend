import jwt from "jsonwebtoken";
const JWT_ADMIN_PASSWORD="dasdsadasdasd";

export function adminMiddleware(req:any,res:any,next:any) {
    const token = req.headers.token;
    const decoded = jwt.verify(token, JWT_ADMIN_PASSWORD);

    if (decoded) {
        //@ts-ignore
        req.userId = decoded.id;
        next()
    } else {
        res.status(403).json({
            message: "You are not signed in"
        })
    }

}
