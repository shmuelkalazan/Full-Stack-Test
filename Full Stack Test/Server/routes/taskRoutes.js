import { Router } from 'express';
const router = Router();
import { getAllTasks, createTask, updateTask, deleteTask } from '../controllers/taskController.js'

router.get('/getAllTasks', getAllTasks)
router.post('/createTask', createTask)
router.put('/updateTask/:id', updateTask)
router.delete('/deleteTask/:id', deleteTask)

export default router;
