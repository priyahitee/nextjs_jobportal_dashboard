import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export async function validateJWT(request: NextRequest){
        try{
            const token = request.cookies.get('token')?.value;
            if(!token){
                throw new Error("No token found");
            }
            // decode JWT token
            const decodeData: any = await jwt.verify(token, process.env.jwt_secret!);
            return decodeData.userId;
        } catch(error: any){
            throw new Error(error.message);
        }
}