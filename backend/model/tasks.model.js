import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    status:{type:String,enum:['To do','In Progress','Done'],default:'To do'},
    project:{type:mongoose.Schema.Types.ObjectId,ref:'Project',required:true},
    assignedUser:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true}
})


const Task = mongoose.model('Task',taskSchema);

export default Task