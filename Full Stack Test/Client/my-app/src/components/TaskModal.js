import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { FaCheck, FaTimes } from "react-icons/fa";

export default function TaskModal({
  show,
  task,
  onClose,
  onSaveTask,
  isEditing,
}) {
  const [editedTask, setEditedTask] = useState({});
  useEffect(() => {
    if (isEditing && task) {
      setEditedTask({ ...task });
    } else {
      setEditedTask({
        title: "",
        description: "",
        due_date: "",
        priority_id: 1,
        status_id: 1,
      });
    }
  }, [isEditing, task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((task) => ({
      ...task,
      [name]: value,
    }));
  };
  const validForm = () => {
    const { title, due_date, priority_id, status_id } = editedTask;
    if (!title || !due_date || !priority_id || !status_id) return false;
    return true;
  };
  const handleSave = () => {
    if (!validForm()) {
      alert("The form is invalid. Please ensure all fields are filled out.");
      return;
    }
    onSaveTask({ ...task, ...editedTask });
  };

  return (
    <Modal show={show} onHide={onClose} centered className="modal">
      <Modal.Header closeButton>
        <Modal.Title>{isEditing ? "Edit Task" : "Create Task"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={editedTask.title || ""}
              onChange={handleChange}
              placeholder="Enter Title"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={editedTask.description || ""}
              onChange={handleChange}
              placeholder="Enter description"
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDueDate">
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              type="date"
              name="due_date"
              value={
                editedTask.due_date
                  ? new Date(editedTask.due_date).toISOString().split("T")[0]
                  : ""
              }
              onChange={handleChange}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPriority">
            <Form.Label>Priority</Form.Label>
            <Form.Control
              as="select"
              name="priority_id"
              value={editedTask.priority_id || ""}
              onChange={handleChange}
            >
              <option value={1}>Low</option>
              <option value={2}>Medium</option>
              <option value={3}>High</option>
              <option value={4}>Urgent</option>
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formStatus">
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              name="status_id"
              value={editedTask.status_id || ""}
              onChange={handleChange}
            >
              <option value={1}>Draft</option>
              <option value={2}>In Progress</option>
              <option value={3}>On Hold</option>
              <option value={4}>Completed</option>
              <option value={5}>Deleted</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          <FaTimes />
          {"    "}Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          <FaCheck />
          {"    "}
          {isEditing ? "Save Changes" : "Create Task"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
