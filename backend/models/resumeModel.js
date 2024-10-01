import mongoose from "mongoose"


const resumeShcema =  mongoose.Schema({
    title : {type: String, required:true}
    
})

export const Resume = mongoose.model("Resume", resumeShcema)