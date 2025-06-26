import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Checkbox from '@/components/atoms/Checkbox';
import Badge from '@/components/atoms/Badge';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import ApperIcon from '@/components/ApperIcon';
import { formatDate, isOverdue } from '@/utils/dateUtils';

const TaskItem = ({ 
  task, 
  onUpdate, 
  onDelete, 
  onSelect,
  isSelected = false,
  showSelection = false 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [showNotes, setShowNotes] = useState(false);

  const handleToggleComplete = () => {
    onUpdate(task.id, { completed: !task.completed });
  };

  const handleSaveEdit = () => {
    if (editTitle.trim() && editTitle !== task.title) {
      onUpdate(task.id, { title: editTitle.trim() });
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditTitle(task.title);
    setIsEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSaveEdit();
    } else if (e.key === 'Escape') {
      handleCancelEdit();
    }
  };

  const priorityVariants = {
    high: 'high',
    medium: 'medium',
    low: 'low'
  };

  const categoryColors = {
    Work: '#5B4CFF',
    Personal: '#FF6B6B',
    Health: '#51CF66',
    Learning: '#339AF0',
    Home: '#4ECDC4'
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      whileHover={{ scale: 1.01 }}
      className={`
        card card-hover p-4 transition-all duration-200
        ${task.completed ? 'opacity-75 bg-gray-50' : ''}
        ${isSelected ? 'ring-2 ring-primary-500 bg-primary-50' : ''}
        ${isOverdue(task.dueDate) && !task.completed ? 'border-l-4 border-red-400' : ''}
      `}
    >
      <div className="flex items-start space-x-3">
        {showSelection && (
          <Checkbox
            checked={isSelected}
            onChange={() => onSelect(task.id)}
            size="sm"
            className="mt-1"
          />
        )}
        
        <Checkbox
          checked={task.completed}
          onChange={handleToggleComplete}
          className="mt-1"
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            {isEditing ? (
              <div className="flex-1 flex items-center space-x-2">
                <Input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  onKeyDown={handleKeyPress}
                  onBlur={handleSaveEdit}
                  className="flex-1"
                  autoFocus
                />
                <Button
                  size="sm"
                  variant="ghost"
                  icon="Check"
                  onClick={handleSaveEdit}
                />
                <Button
                  size="sm"
                  variant="ghost"
                  icon="X"
                  onClick={handleCancelEdit}
                />
              </div>
            ) : (
              <h3 
                className={`
                  font-medium text-gray-900 cursor-pointer hover:text-primary-600 transition-colors
                  ${task.completed ? 'line-through text-gray-500' : ''}
                `}
                onClick={() => setIsEditing(true)}
              >
                {task.title}
              </h3>
            )}

            <div className="flex items-center space-x-2 ml-4">
              <Button
                size="sm"
                variant="ghost"
                icon="Edit2"
                onClick={() => setIsEditing(true)}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              />
              <Button
                size="sm"
                variant="ghost"
                icon="Trash2"
                onClick={() => onDelete(task.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2 mb-2">
            <Badge variant={priorityVariants[task.priority]} size="xs">
              {task.priority}
            </Badge>
            
            <Badge 
              variant="default" 
              size="xs"
              className="text-xs"
              style={{ 
                backgroundColor: `${categoryColors[task.category]}20`,
                color: categoryColors[task.category] 
              }}
            >
              {task.category}
            </Badge>

            {task.dueDate && (
              <div className={`
                flex items-center text-xs
                ${isOverdue(task.dueDate) && !task.completed 
                  ? 'text-red-500 font-medium' 
                  : 'text-gray-500'
                }
              `}>
                <ApperIcon name="Calendar" size={12} className="mr-1" />
                {formatDate(task.dueDate)}
              </div>
            )}
          </div>

          <AnimatePresence>
            {task.notes && (
              <div className="mt-2">
                <Button
                  size="sm"
                  variant="ghost"
                  icon={showNotes ? 'ChevronUp' : 'ChevronDown'}
                  onClick={() => setShowNotes(!showNotes)}
                  className="text-xs text-gray-500 p-0 h-auto"
                >
                  {showNotes ? 'Hide' : 'Show'} notes
                </Button>
                
                {showNotes && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-2 p-3 bg-gray-50 rounded-lg text-sm text-gray-600"
                  >
                    {task.notes}
                  </motion.div>
                )}
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskItem;