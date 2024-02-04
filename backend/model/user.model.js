import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unqiue:true
    },
    email:{
        type:String,
        required:true,
        unqiue:true
    }
    ,
    password:{
        type:String,
        required:true,
        unqiue:true
    },
    projects:[
        {
            type:mongoose.Schema.Types.ObjectId,ref:'Project'
        }
    ]
})


const User = mongoose.model('User',userSchema);

export default User