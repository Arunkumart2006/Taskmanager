import React from 'react';

function ProgressSection({ stats }) {
  return (
    <div className="progress-section">
      <div className="progress-stats">
        <div className="stat-card">
          <span className="stat-value">{stats.total}</span>
          <span className="stat-label">Total Tasks</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{stats.completed}</span>
          <span className="stat-label">Completed</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{stats.inProgress}</span>
          <span className="stat-label">In Progress</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{stats.pending}</span>
          <span className="stat-label">Pending</span>
        </div>
      </div>

      <div className="progress-bar-section">
        <h3>Overall Progress</h3>
        <div className="progress-bar-container">
          <div 
            className="progress-bar" 
            style={{ width: `${stats.percentage}%` }}
          >
            {stats.percentage}% Complete ({stats.completed}/{stats.total})
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProgressSection;
