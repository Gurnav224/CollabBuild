import mongoose from "mongoose";


const uri = "mongodb+srv://chaudharyg856:IRI1eqBdKCgbkY5E@cluster0.0konzrv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(uri)


const db = mongoose.connection;

db.on('error',console.error.bind(console,'MongoDb, connection Error'))
db.once('open',()=>{
    console.log('Connected to Mongodb')
})

export default mongoose