import express from "express"
import cors from "cors"
import authRoute from "./routes/authRoute.js"
import path from "path"
import "dotenv/config"
import mongoose from "mongoose";
import cookieParser from "cookie-parser"

const app = express();
const port = process.env.PORT;

const _dirname = path.resolve();

//database
 const DB_URL = process.env.DB_URL;
 mongoose.connect(DB_URL).then(()=>{
    console.log("datbase connected")
 }).catch((error)=>{
    console.log(`database connection error: ${error}`)
 })

//middlewere
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())
const corsOption ={
    origin: "http://localhost:5173",
    credentials : true,
}
app.use(cors(corsOption));



//routes
 app.use("/auth", authRoute)
 
 app.use(express.static(path.join(_dirname, "/frontend/dist")));
 app.get("*", (_, res)=>{
   res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"))
 })

//server
app.listen(port, ()=>{
    console.log(`server is listening at port: ${port}`)
})
