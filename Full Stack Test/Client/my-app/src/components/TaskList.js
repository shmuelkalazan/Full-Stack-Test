import React from "react";
import { Button, Card } from "react-bootstrap";
import { FaPen, FaTrashAlt } from "react-icons/fa";

export default function TaskList({
  tasks,
  getPriorityColor,
  getPriorityLabel,
  onEditTask,
  onDeleteTask,
}) {
  return (
    <div className="mt-4">
      <div className="task-cards-container">
        {tasks &&
          tasks.length > 0 &&
          tasks.map((task) => (
            <div key={task._id} className="task-card-col">
              <div className="task-card">
                <Card.Body>
                  <Card.Title>
                    {task.title}
                    <span
                      className={`ms-2 badge bg-${getPriorityColor(
                        task.priority_id
                      )}`}
                    >
                      {getPriorityLabel(task.priority_id)}
                    </span>
                  </Card.Title>
                  <Card.Text>
                    {task.description || "No description exists for this task."}
                  </Card.Text>
                  <div className="d-flex justify-content-between align-items-center">
                    <small className="text-muted">
                      Due Date:{new Date(task.due_date).toLocaleDateString()}
                    </small>
                  </div>
                  <div>
                    <Button
                      variant="secondary"
                      className="me-2"
                      onClick={() => onEditTask(task)}
                    >
                      <FaPen />
                    </Button>
                    <Button
                      variant="secondary"
                      className="me-2"
                      onClick={() => onDeleteTask(task._id)}
                    >
                      <FaTrashAlt />
                      <span className="visually-hidden">Delete</span>
                    </Button>
                  </div>
                </Card.Body>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
