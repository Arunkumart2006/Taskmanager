import React from 'react';
import TaskCard from './Taskcart';

function TaskList({ 
  tasks, 
  filterStatus, 
  sortBy, 
  onFilterChange, 
  onSortChange,
  onUpdateStatus,
  onDeleteTask,
  isOverdue
}) {
  return (
    <div className="tasks-section">
      {/* Filters */}
      <div className="filters">
        <h4>🔍 Filter & Sort</h4>
        
        <div className="filter-group">
          <label>Status:</label>
          <select 
            value={filterStatus} 
            onChange={(e) => onFilterChange(e.target.value)}
          >
            <option value="all">All Tasks</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Sort By:</label>
          <select 
            value={sortBy} 
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="deadline">Deadline</option>
            <option value="status">Status</option>
            <option value="recent">Recently Added</option>
          </select>
        </div>
      </div>

      {/* Tasks Grid */}
      {tasks.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📝</div>
          <h3>No tasks found</h3>
          <p>Add your first task to get started!</p>
        </div>
      ) : (
        <div className="tasks-grid">
          {tasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onUpdateStatus={onUpdateStatus}
              onDeleteTask={onDeleteTask}
              isOverdue={isOverdue}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default TaskList;
