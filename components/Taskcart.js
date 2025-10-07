import React from 'react';

function TaskCard({ task, onUpdateStatus, onDeleteTask, isOverdue }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getStatusButtonText = (status) => {
    if (status === 'pending') return 'Start Task';
    if (status === 'in-progress') return 'Complete';
    return 'Reopen';
  };

  const taskOverdue = isOverdue(task.deadline, task.status);

  return (
    <div 
      className={`task-card ${task.status.replace(' ', '-')} ${taskOverdue ? 'overdue' : ''}`}
    >
      <div className="task-header">
        <div className="task-title">{task.title}</div>
        <span className={`task-status ${task.status.replace(' ', '-')}`}>
          {task.status}
        </span>
      </div>

      {task.description && (
        <div className="task-description">
          {task.description}
        </div>
      )}

      <div className={`task-deadline ${taskOverdue ? 'overdue-text' : ''}`}>
        📅 {formatDate(task.deadline)}
        {taskOverdue && ' - ⚠️ OVERDUE'}
      </div>

      <div className="task-actions">
        <button 
          className="btn btn-small btn-status"
          onClick={() => onUpdateStatus(task.id)}
        >
          {getStatusButtonText(task.status)}
        </button>
        <button 
          className="btn btn-small btn-delete"
          onClick={() => onDeleteTask(task.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
