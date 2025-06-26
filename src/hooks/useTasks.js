import { useState, useEffect } from 'react';
import { taskService } from '@/services/api/taskService';
import { toast } from 'react-toastify';

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await taskService.getAll();
      setTasks(data);
    } catch (err) {
      setError('Failed to load tasks. Please try again.');
      console.error('Error loading tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (taskData) => {
    try {
      const newTask = await taskService.create(taskData);
      setTasks(prev => [newTask, ...prev]);
      toast.success('Task created successfully!');
      return newTask;
    } catch (err) {
      toast.error('Failed to create task');
      throw err;
    }
  };

  const updateTask = async (id, updates) => {
    try {
      const updatedTask = await taskService.update(id, updates);
      setTasks(prev => prev.map(task => 
        task.id === id ? updatedTask : task
      ));
      
      if (updates.completed !== undefined) {
        toast.success(updates.completed ? 'Task completed!' : 'Task marked as incomplete');
      }
      
      return updatedTask;
    } catch (err) {
      toast.error('Failed to update task');
      throw err;
    }
  };

  const deleteTask = async (id) => {
    try {
      await taskService.delete(id);
      setTasks(prev => prev.filter(task => task.id !== id));
      toast.success('Task deleted successfully');
    } catch (err) {
      toast.error('Failed to delete task');
      throw err;
    }
  };

  const bulkUpdateTasks = async (ids, updates) => {
    try {
      const updatedTasks = await taskService.bulkUpdate(ids, updates);
      setTasks(prev => prev.map(task => {
        const updated = updatedTasks.find(ut => ut.id === task.id);
        return updated || task;
      }));
      
      if (updates.completed !== undefined) {
        toast.success(`${ids.length} tasks ${updates.completed ? 'completed' : 'marked as incomplete'}`);
      }
      
      return updatedTasks;
    } catch (err) {
      toast.error('Failed to update tasks');
      throw err;
    }
  };

  const bulkDeleteTasks = async (ids) => {
    try {
      await taskService.bulkDelete(ids);
      setTasks(prev => prev.filter(task => !ids.includes(task.id)));
      toast.success(`${ids.length} tasks deleted successfully`);
    } catch (err) {
      toast.error('Failed to delete tasks');
      throw err;
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return {
    tasks,
    loading,
    error,
    refetch: loadTasks,
    createTask,
    updateTask,
    deleteTask,
    bulkUpdateTasks,
    bulkDeleteTasks
  };
};