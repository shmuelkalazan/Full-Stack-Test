import express from 'express';
import taskRoutes from './routes/taskRoutes.js';
import { connectToMongo } from './config/db.js';
import cors from 'cors';
import dotenv from 'dotenv'

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors())

connectToMongo();

const PORT = 5000;

app.use('/tasks', taskRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});