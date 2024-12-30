import Task from '../models/task.js'

export const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        if (tasks.length)
            res.status(200).send(tasks)
        else
            res.status(400).send("Tasks Not Found")
    } catch (error) {
        res.status(500).send(error.message)
    }
};
export const createTask = async (req, res) => {
    try {
        const newTask = new Task(req.body);
        await newTask.save();
        res.status(200).json({
            message: "Task added successfully",
            task: newTask,
        });
    } catch (error) {
        res.status(500).json("Failed to create new task")
    }
};


export const updateTask = async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!updatedTask) {
            return res.status(404).json({ message: "Task Not Found" })
        }
        res.status(200).json({
            message: "success update task",
            task: updateTask
        })
    } catch (error) {
        res.status(500).json({
            message: "Failed to update task",
            error: error.message
        })
    }
};
export const deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        await Task.findByIdAndDelete(taskId)
        res.status(200).send(`Success delete task`)
    } catch (error) {
        res.status(500).send("Failed to delete task")
    }
}
