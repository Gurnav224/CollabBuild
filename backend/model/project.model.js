import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    }
    ,
    description:{
        type:String
    }
    ,
    tasks:[{type:mongoose.Schema.Types.ObjectId,ref:'Task'}],
    owner:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true}
})


const Project = mongoose.model('Project',projectSchema);

export default Project