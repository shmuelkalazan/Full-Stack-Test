import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {type:String},
    description: {type:String},
    create_date: { type: Date, default: Date.now },
    update_date: { type: Date },
    due_date: {type:Date},
    assigned_user_id: {type:Number},
    priority_id: {type:Number},
    status_id: {type:Number}
});

export default mongoose.model('Task',taskSchema)