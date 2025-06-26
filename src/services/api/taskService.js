import tasksData from '@/services/mockData/tasks.json';

let tasks = [...tasksData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const taskService = {
  async getAll() {
    await delay(300);
    return [...tasks];
  },

  async getById(id) {
    await delay(200);
    const task = tasks.find(t => t.id === id);
    return task ? { ...task } : null;
  },

  async create(taskData) {
    await delay(250);
    const maxId = Math.max(...tasks.map(t => parseInt(t.id)), 0);
    const newTask = {
      ...taskData,
      id: (maxId + 1).toString(),
      completed: false,
      createdAt: new Date().toISOString(),
      completedAt: null
    };
    tasks.push(newTask);
    return { ...newTask };
  },

  async update(id, updates) {
    await delay(200);
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) throw new Error('Task not found');
    
    const updatedTask = {
      ...tasks[index],
      ...updates,
      completedAt: updates.completed === true && !tasks[index].completed 
        ? new Date().toISOString() 
        : updates.completed === false 
        ? null 
        : tasks[index].completedAt
    };
    
    tasks[index] = updatedTask;
    return { ...updatedTask };
  },

  async delete(id) {
    await delay(200);
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) throw new Error('Task not found');
    
    const deletedTask = tasks[index];
    tasks.splice(index, 1);
    return { ...deletedTask };
  },

  async bulkUpdate(ids, updates) {
    await delay(300);
    const updatedTasks = [];
    
    for (const id of ids) {
      const index = tasks.findIndex(t => t.id === id);
      if (index !== -1) {
        const updatedTask = {
          ...tasks[index],
          ...updates,
          completedAt: updates.completed === true && !tasks[index].completed 
            ? new Date().toISOString() 
            : updates.completed === false 
            ? null 
            : tasks[index].completedAt
        };
        tasks[index] = updatedTask;
        updatedTasks.push({ ...updatedTask });
      }
    }
    
    return updatedTasks;
  },

  async bulkDelete(ids) {
    await delay(300);
    const deletedTasks = [];
    
    // Sort IDs in descending order to avoid index shifting issues
    const sortedIds = [...ids].sort((a, b) => {
      const indexA = tasks.findIndex(t => t.id === a);
      const indexB = tasks.findIndex(t => t.id === b);
      return indexB - indexA;
    });
    
    for (const id of sortedIds) {
      const index = tasks.findIndex(t => t.id === id);
      if (index !== -1) {
        const deletedTask = tasks[index];
        tasks.splice(index, 1);
        deletedTasks.push({ ...deletedTask });
      }
    }
    
    return deletedTasks;
  }
};