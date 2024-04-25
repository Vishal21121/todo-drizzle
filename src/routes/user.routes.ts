import express from "express"
const router = express.Router()
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "../../drizzle/schema/user";
import bcrypt from "bcrypt"
import {userRegisterValidator} from "../validators/user.validator"
import { validation } from "../middleware/validate.middleware";


const queryClient = postgres(
  `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
);
const db = drizzle(queryClient, { schema });

router.post("/register",userRegisterValidator(),validation, async(req:express.Request,res:express.Response)=>{
    const { username, email, password, userType } = req.body;
    try {
        const userFound = await db.query.users.findFirst(email)
        if(userFound){
            return res.status(400).json({
                success: false,
                data:{
                    statusCode: 400,
                    message:"Please enter another email id"
                }
            })
        }
        const userWithUserName = await db.query.users.findFirst(username);
        if (userWithUserName) {
          return res.status(400).json({
            success: false,
            data: {
              statusCode: 400,
              message: "Please enter another username",
            },
          });
        }
        const hashedPassword = await bcrypt.hash(password,10)
        const userCreated = await db
                            .insert(schema.users)
                            .values({
                                username,
                                email,
                                password:hashedPassword,
                                userType: userType || "USER"
                            });
        console.log(userCreated)
        const userCreatedFound = await db.query.users.findFirst(email)
        return res.status(201).json({
            success: true,
            data:{
                statusCode:201,
                value: userCreatedFound
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
          success: false,
          data: {
            statusCode: 500,
            message: error || "Internal server error",
          },
        });
    }
})

export default router