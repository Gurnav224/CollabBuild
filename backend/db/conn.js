import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/project-management-DB")


const db = mongoose.connection;

db.on('error',console.error.bind(console,'MongoDb, connection Error'))
db.once('open',()=>{
    console.log('Connected to Mongodb')
})

export default mongoose