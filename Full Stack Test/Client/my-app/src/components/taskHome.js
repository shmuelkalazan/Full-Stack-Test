import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskModal from "./TaskModal";
import TaskList from "./TaskList";
import { Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";

export default function TaskHome() {
  const [tasks, setTasks] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showHeader, setShowHeader] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      const result = await axios.get("http://localhost:5000/tasks/getAllTasks");
      setTasks(result.data);
    };
    fetchTasks();
  }, []);
  const onEditTask = async (task) => {
    setShowHeader(false);
    setSelectedTask(task);
    setIsEditing(true);
    setShowEditModal(true);
  };

  const onDeleteTask = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      await axios.delete(`http://localhost:5000/tasks/deleteTask/${taskId}`);
      setTasks(tasks.filter((task) => task._id !== taskId));
    }
  };

  const onSaveTask = async (updatedTask) => {
    try {
      if (isEditing) {
        updatedTask.update_date = new Date();
        const response = await axios.put(
          `http://localhost:5000/tasks/updateTask/${updatedTask._id}`,
          updatedTask
        );
        if (response?.status === 200) {
          setTasks(
            tasks.map((task) =>
              task._id === updatedTask._id ? { ...response.data.task } : task
            )
          );
        }
        setIsEditing(false);
      } else {
        const response = await axios.post(
          "http://localhost:5000/tasks/createTask",
          updatedTask
        );
        if (response?.status === 200) {
          alert("Task Added successfully");
          setTasks([...tasks, response.data.task]);
        }
      }
      setShowEditModal(false);
      setShowHeader(true);
      setSelectedTask({});
    } catch (error) {
      alert("Failed to save the task. Please try again.");
    }
  };

  const handleCreateTask = () => {
    setShowHeader(false);
    setSelectedTask({});
    setIsEditing(false);
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowHeader(true);
    setIsEditing(false);
    setShowEditModal(false);
  };

  const getPriorityColor = (priority_id) => {
    switch (priority_id) {
      case 1:
        return "success";
      case 2:
        return "primary";
      case 3:
        return "warning";
      case 4:
        return "danger";
      default:
        return "secondary";
    }
  };

  const getPriorityLabel = (priority_id) => {
    switch (priority_id) {
      case 1:
        return "Low";
      case 2:
        return "Medium";
      case 3:
        return "High";
      case 4:
        return "Urgent";
      default:
        return "";
    }
  };

  return (
    <div>
      {showHeader && (
        <header>
          <h1 className="text-center todolist-title">TODO List</h1>
          <Button className="custom-button" onClick={handleCreateTask}>
            <FaPlus />
            {"   "} Add New Task
          </Button>{" "}
        </header>
      )}
      <TaskList
        tasks={tasks}
        getPriorityLabel={getPriorityLabel}
        getPriorityColor={getPriorityColor}
        onDeleteTask={onDeleteTask}
        onEditTask={onEditTask}
      />
      <TaskModal
        show={showEditModal}
        task={selectedTask}
        onClose={handleCloseModal}
        onSaveTask={onSaveTask}
        isEditing={isEditing}
      />
    </div>
  );
}
