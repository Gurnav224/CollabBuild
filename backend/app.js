import express from "express"

const app = express()

const PORT = 5000;

app.get("/hello",(req,res)=>{
    res.send(`<h1>CollabBuild</h1>`)
})


app.listen(PORT,()=>{
    console.log(`Server started at ${PORT}`)
})