export const sortTasks = (tasks, sortBy = 'priority') => {
  const priorityOrder = { high: 3, medium: 2, low: 1 };
  
  return [...tasks].sort((a, b) => {
    switch (sortBy) {
      case 'priority':
        if (a.completed !== b.completed) {
          return a.completed ? 1 : -1; // Completed tasks at bottom
        }
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      
      case 'dueDate':
        if (a.completed !== b.completed) {
          return a.completed ? 1 : -1;
        }
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      
      case 'created':
        return new Date(b.createdAt) - new Date(a.createdAt);
      
      case 'category':
        if (a.completed !== b.completed) {
          return a.completed ? 1 : -1;
        }
        return a.category.localeCompare(b.category);
      
      default:
        return 0;
    }
  });
};

export const filterTasks = (tasks, filters) => {
  return tasks.filter(task => {
    // View filter
    if (filters.view === 'completed' && !task.completed) return false;
    if (filters.view === 'active' && task.completed) return false;
    if (filters.view === 'today' && !isToday(task.dueDate)) return false;
    if (filters.view === 'upcoming' && !isUpcoming(task.dueDate)) return false;
    if (filters.view === 'overdue' && (!isOverdue(task.dueDate) || task.completed)) return false;
    
    // Category filter
    if (filters.category && task.category !== filters.category) return false;
    
    // Priority filter
    if (filters.priority && task.priority !== filters.priority) return false;
    
    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      const searchableText = `${task.title} ${task.notes || ''} ${task.category}`.toLowerCase();
      if (!searchableText.includes(searchTerm)) return false;
    }
    
    return true;
  });
};

export const getTaskStats = (tasks) => {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const active = total - completed;
  const overdue = tasks.filter(t => !t.completed && isOverdue(t.dueDate)).length;
  const today = tasks.filter(t => !t.completed && isToday(t.dueDate)).length;
  
  return {
    total,
    completed,
    active,
    overdue,
    today,
    completionRate: total > 0 ? Math.round((completed / total) * 100) : 0
  };
};

// Import date utilities
const isToday = (dateString) => {
  if (!dateString) return false;
  const date = new Date(dateString);
  const today = new Date();
  return date.toDateString() === today.toDateString();
};

const isUpcoming = (dateString) => {
  if (!dateString) return false;
  const date = new Date(dateString);
  const today = new Date();
  const weekFromNow = new Date(today);
  weekFromNow.setDate(weekFromNow.getDate() + 7);
  return date >= today && date <= weekFromNow;
};

const isOverdue = (dateString) => {
  if (!dateString) return false;
  const date = new Date(dateString);
  const today = new Date();
  const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  return dateOnly < todayOnly;
};