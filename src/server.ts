import express from "express"
import cors from "cors"
import "dotenv/config"
import userRouter from "./routes/user.routes"

const app = express()
const PORT = 8000


app.use(cors())
app.use(express.json())
app.use("/api/v1/users",userRouter)

app.get("/",async (req,res)=>{
    // console.log(db.select().from(userSchema.users));
    return res.status(200).send("hello world");
})

app.listen(PORT,()=>console.log(`listening at port ${PORT}`))