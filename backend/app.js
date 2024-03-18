import mongoose from "./db/conn.js";
import User from "./model/user.model.js";
import Project from "./model/project.model.js";
import Task from "./model/tasks.model.js";
import express from "express";

const PORT = 3000;
const app = express()



app.get('/',async(req,res)=>{
    res.send('Project Management App')
})

app.get('/test',async(req,res)=>{

    try{

       const user = new User({
        username:"Test User 1",
        email:"TestUser@example.com",
        password:"TestUser@password1234"
       })

       const savedUser = await user.save()


       const project = new Project({
        title:"Test Project 1",
        description:"a  sample Project description",
        owner:savedUser._id
       })

       const savedProject = await project.save();

       const task = new Task({
        title:"Test Task 1",
        description:"a sample task description",
        project:savedProject._id,
        assignedUser:savedUser._id
       })

       await task.save()

       res.status(200).json({message:"Models and Relationship successfully tested."})
    }
    catch(err){
        res.status(500).json({error:"Error Occured",details:err.message})
    }
})

app.post('/users', async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }
  
      // Create a new user
      const newUser = new User({ username, email, password });
      const savedUser = await newUser.save();
  
      res.status(201).json(savedUser);
    } catch (error) {
      res.status(500).json({ error: 'Error occurred', details: error.message });
    }
  });

app.get('/users',async(req,res)=>{
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({error:"Error Occurred",details:err.message})
    }
})

app.get("/projects",async(req,res)=>{
    try{
     const project = await Project.find().populate("owner");
     res.status(200).json({project})
    }
    catch(err){
        res.status(500).json({error:"Error Occurred",details:err.message})
    }


})


app.get("/tasks",async(req,res)=>{
    try {
        const tasks = await Task.find()
        res.status(200).json({tasks})
    } catch (error) {
        res.status(500).json({error:"Error Occurred",details:err.message})
    }
})


// by id

app.get("/users/:userId",async(req,res)=>{
    
    try {
        const userId = req.params.userId;
        const user  = await User.findById(userId);
        res.status(200).json({user})
        
    } catch (error) {
        res.status(500).json({error:"Error Occurred",details:error.message})
    }
})


app.get("/projects/:projectId",async(req,res)=>{
    try {
        const projectId = req.params.projectId;
        const project = await Project.findById(projectId);

        res.status(200).json({project})
    } catch (error) {
        res.status(500).json({error:"Error Occurred",details:error.message})
    }
})

app.get('/tasks/:taskId',async (req,res)=>{
    try {
        const taskId = req.params.taskId;
        const user  = await Task.findById(taskId);
        res.status(200).json({user})
    } catch (error) {
        res.status(500).json({error:"Error Occurred",details:error.message})
    }
})

// Retrieve tasks by user when the "/user/:userId/tasks" endpoint is hit

app.get("/users/:userId/tasks",async(req,res)=>{

    try {
        const userId = req.params.userId;
        const tasks = await Task.find({assignedUser:userId}).populate('project');
        console.log(tasks)
        res.status(200).json({tasks})
    } catch (error) {
        res.status(500).json({error:"Error Occurred",details:error.message})
    }
})

// Retrieve projects by user when the "/user/:userId/projects" endpoint is hit

app.get("/users/:userId/projects",async (req,res)=>{
    
    try {
        const userId = req.params.userId;
        const projects = await Project.find({owner:userId});
        console.log(projects)
        res.status(200).json({projects})
        
    } catch (error) {
        res.status(500).json({error:"Error Occurred",details:error.message})
    }
})

app.listen(PORT,()=>{
    console.log(`Server started ${PORT}`)
})