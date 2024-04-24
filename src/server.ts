import express from "express"
import cors from "cors"

const app = express()
const PORT = 8080

app.use(cors())


app.get("/",(req,res)=>{
    return res.status(200).send("hello world");
})

app.listen(PORT,()=>console.log(`listening at port ${PORT}`))