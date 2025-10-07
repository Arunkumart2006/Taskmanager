import React, { useState } from 'react';

function TaskForm({ onAddTask }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    deadline: '',
    status: 'pending'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.deadline) {
      alert('Please fill in all required fields!');
      return;
    }

    onAddTask(formData);
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      deadline: '',
      status: 'pending'
    });
  };

  return (
    <div className="add-task-form">
      <h3>➕ Add New Task</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Task Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="e.g., Complete Math Assignment"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Add task details..."
          />
        </div>

        <div className="form-group">
          <label htmlFor="deadline">Deadline *</label>
          <input
            type="date"
            id="deadline"
            name="deadline"
            value={formData.deadline}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Initial Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Add Task
        </button>
      </form>
    </div>
  );
}

export default TaskForm;
