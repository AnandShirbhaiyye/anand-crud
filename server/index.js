import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Task from "./models/Task.js";
dotenv.config();

const app = express();
app.use(express.json());

async function connectMongoDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    if (conn) {
      console.log("Connected to MongoDB");
    }
  } catch (err) {
    console.log(err.message);
  }
}
connectMongoDB();

app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "All Good🥳🥳",
  });
});

//POST /task
app.post("/task", async (req, res) => {
  const { title, description } = req.body;

  const newTask = new Task({
    title: title,
    description: description,
  });

  const savedTask = await newTask.save();

  res.json({
    success: true,
    message: " Task Saved Successfully...",
    data: savedTask,
  });
});

//GET /tasks
app.get("/tasks", async (req, res) => {
  const tasks = await Task.find();

  res.json({
    success: true,
    message: "All tasks fetched successfully",
    data: tasks,
  });
});

// Delete /task/delete
app.delete("/task/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedtask = await Task.deleteOne({
      _id: id,
    });

    res.json({
      success: true,
      message: "Task Successfully Deleted",
      data: deletedtask,
    });
  } catch (err) {
    console.log(err.message);
  }
});

// app.post("/task/id", async (req, res) => {
//     try {
//       const { id } = req.body;
  
//       const deletedtask = await Task.deleteOne({
//         _id: id,
//       });
  
//       res.json({
//         success: true,
//         message: "Task Successfully Deleted",
//         data: deletedtask,
//       });
//     } catch (err) {
//       console.log(err.message);
//     }
// });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`The server is Running on Port ${PORT} 🚀`);
});
