import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import ProgressSection from './components/ProgressSection';
import TaskForm from './components/Taskform';
import TaskList from './components/Tasklist';
import OverdueAlert from './components/Overduealert';

function App() {
  // State management
  const [tasks, setTasks] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('deadline');
  const [showAlert, setShowAlert] = useState(false);
  const [overdueCount, setOverdueCount] = useState(0);

  // Load tasks from localStorage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('studentTasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('studentTasks', JSON.stringify(tasks));
    checkOverdueTasks();
  }, [tasks]);

  // Check for overdue tasks and show alert
  const checkOverdueTasks = () => {
    const now = new Date();
    const overdue = tasks.filter(task => {
      const deadline = new Date(task.deadline);
      return task.status !== 'completed' && deadline < now;
    });
    
    setOverdueCount(overdue.length);
    
    if (overdue.length > 0 && !showAlert) {
      setShowAlert(true);
    }
  };

  // Add new task
  const handleAddTask = (taskData) => {
    const newTask = {
      id: Date.now(),
      ...taskData,
      createdAt: new Date().toISOString()
    };

    setTasks(prev => [...prev, newTask]);
  };

  // Update task status
  const updateTaskStatus = (taskId) => {
    setTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        let newStatus;
        if (task.status === 'pending') newStatus = 'in-progress';
        else if (task.status === 'in-progress') newStatus = 'completed';
        else newStatus = 'pending';
        
        return { ...task, status: newStatus };
      }
      return task;
    }));
  };

  // Delete task
  const deleteTask = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(prev => prev.filter(task => task.id !== taskId));
    }
  };

  // Check if task is overdue
  const isOverdue = (deadline, status) => {
    if (status === 'completed') return false;
    const now = new Date();
    const deadlineDate = new Date(deadline);
    return deadlineDate < now;
  };

  // Calculate progress statistics
  const getProgressStats = () => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.status === 'completed').length;
    const inProgress = tasks.filter(t => t.status === 'in-progress').length;
    const pending = tasks.filter(t => t.status === 'pending').length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    return { total, completed, inProgress, pending, percentage };
  };

  // Filter and sort tasks
  const getFilteredAndSortedTasks = () => {
    let filtered = tasks;

    // Filter by status
    if (filterStatus !== 'all') {
      filtered = filtered.filter(task => task.status === filterStatus);
    }

    // Sort
    filtered = [...filtered].sort((a, b) => {
      if (sortBy === 'deadline') {
        return new Date(a.deadline) - new Date(b.deadline);
      } else if (sortBy === 'status') {
        const statusOrder = { 'pending': 1, 'in-progress': 2, 'completed': 3 };
        return statusOrder[a.status] - statusOrder[b.status];
      } else if (sortBy === 'recent') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      return 0;
    });

    return filtered;
  };

  const stats = getProgressStats();
  const filteredTasks = getFilteredAndSortedTasks();

  return (
    <div className="app-container">
      <Header />
      
      <ProgressSection stats={stats} />
      
      <div className="main-content">
        <div className="sidebar">
          <TaskForm onAddTask={handleAddTask} />
        </div>
        
        <TaskList
          tasks={filteredTasks}
          filterStatus={filterStatus}
          sortBy={sortBy}
          onFilterChange={setFilterStatus}
          onSortChange={setSortBy}
          onUpdateStatus={updateTaskStatus}
          onDeleteTask={deleteTask}
          isOverdue={isOverdue}
        />
      </div>

      {showAlert && overdueCount > 0 && (
        <OverdueAlert
          count={overdueCount}
          onClose={() => setShowAlert(false)}
        />
      )}
    
    </div>
    
  );
}

export default App;
