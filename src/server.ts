import express from "express"
import cors from "cors"
import {drizzle} from "drizzle-orm/postgres-js"
import postgres from "postgres"
import "dotenv/config"
import { users } from "../drizzle/schema/user"

const app = express()
const PORT = 8000
const queryClient = postgres(
  `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
);
const db = drizzle(queryClient)

app.use(cors())


app.get("/",async (req,res)=>{
    await db.insert(users).values({username:"vishal",email:"vishal@gmail.com",password:"12345678",userType:"ADMIN"})
    // console.log(db.select().from(userSchema.users));
    return res.status(200).send("hello world");
})

app.listen(PORT,()=>console.log(`listening at port ${PORT}`))