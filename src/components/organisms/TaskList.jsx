import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TaskItem from '@/components/organisms/TaskItem';
import Button from '@/components/atoms/Button';
import { sortTasks, filterTasks } from '@/utils/taskUtils';

const TaskList = ({ 
  tasks, 
  filters = {}, 
  sortBy = 'priority',
  onUpdateTask, 
  onDeleteTask,
  onBulkUpdate,
  onBulkDelete,
  loading = false 
}) => {
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [showSelection, setShowSelection] = useState(false);

  const filteredAndSortedTasks = useMemo(() => {
    const filtered = filterTasks(tasks, filters);
    return sortTasks(filtered, sortBy);
  }, [tasks, filters, sortBy]);

  const handleSelectTask = (taskId) => {
    setSelectedTasks(prev => 
      prev.includes(taskId) 
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  const handleSelectAll = () => {
    if (selectedTasks.length === filteredAndSortedTasks.length) {
      setSelectedTasks([]);
    } else {
      setSelectedTasks(filteredAndSortedTasks.map(t => t.id));
    }
  };

  const handleBulkComplete = () => {
    onBulkUpdate(selectedTasks, { completed: true });
    setSelectedTasks([]);
    setShowSelection(false);
  };

  const handleBulkDelete = () => {
    if (window.confirm(`Delete ${selectedTasks.length} selected tasks?`)) {
      onBulkDelete(selectedTasks);
      setSelectedTasks([]);
      setShowSelection(false);
    }
  };

  const toggleSelectionMode = () => {
    if (showSelection) {
      setSelectedTasks([]);
    }
    setShowSelection(!showSelection);
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="card p-4">
            <div className="animate-pulse flex space-x-3">
              <div className="w-5 h-5 bg-gray-200 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="flex space-x-2">
                  <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                  <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (filteredAndSortedTasks.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-primary-100 to-accent-100 rounded-full flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xl">✨</span>
            </div>
          </motion.div>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {Object.keys(filters).length > 0 ? 'No matching tasks' : 'No tasks yet'}
        </h3>
        <p className="text-gray-500">
          {Object.keys(filters).length > 0 
            ? 'Try adjusting your filters or search terms'
            : 'Create your first task to get started with TaskFlow'
          }
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredAndSortedTasks.length > 1 && (
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              icon={showSelection ? 'X' : 'CheckSquare'}
              onClick={toggleSelectionMode}
            >
              {showSelection ? 'Cancel' : 'Select'}
            </Button>
            
            {showSelection && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSelectAll}
              >
                {selectedTasks.length === filteredAndSortedTasks.length ? 'Deselect All' : 'Select All'}
              </Button>
            )}
          </div>

          {showSelection && selectedTasks.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">
                {selectedTasks.length} selected
              </span>
              <Button
                variant="secondary"
                size="sm"
                icon="Check"
                onClick={handleBulkComplete}
              >
                Complete
              </Button>
              <Button
                variant="danger"
                size="sm"
                icon="Trash2"
                onClick={handleBulkDelete}
              >
                Delete
              </Button>
            </div>
          )}
        </div>
      )}

      <AnimatePresence mode="popLayout">
        {filteredAndSortedTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onUpdate={onUpdateTask}
            onDelete={onDeleteTask}
            onSelect={handleSelectTask}
            isSelected={selectedTasks.includes(task.id)}
            showSelection={showSelection}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TaskList;