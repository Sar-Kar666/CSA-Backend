import jwt from "jsonwebtoken";
const JWT_PASSWORD="askdasmdkas;mdkasd";


export function userMiddleware(req:any,res:any,next:any){
    const token=req.headers.token;
    const decode=jwt.verify(token,JWT_PASSWORD);


    if(decode){
        //@ts-ignore
        req.userId=decode.id;

    } else {
        res.status(403).json({
            message: "You are not signed in"
        })
    }
}