import { useState } from 'react';
import { motion } from 'framer-motion';
import SearchBar from '@/components/molecules/SearchBar';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const Header = ({ 
  searchQuery, 
  onSearchChange, 
  onAddTask,
  sortBy,
  onSortChange 
}) => {
  const [showSortMenu, setShowSortMenu] = useState(false);

  const sortOptions = [
    { value: 'priority', label: 'Priority', icon: 'AlertTriangle' },
    { value: 'dueDate', label: 'Due Date', icon: 'Calendar' },
    { value: 'created', label: 'Created', icon: 'Clock' },
    { value: 'category', label: 'Category', icon: 'Tag' }
  ];

  const currentSort = sortOptions.find(option => option.value === sortBy);

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-3"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl flex items-center justify-center">
              <ApperIcon name="CheckSquare" size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold font-display bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                TaskFlow
              </h1>
              <p className="text-xs text-gray-500">
                Efficient Task Management
              </p>
            </div>
          </motion.div>
        </div>

        <div className="flex items-center space-x-4 flex-1 max-w-2xl mx-8">
          <SearchBar
            value={searchQuery}
            onChange={onSearchChange}
            className="flex-1"
          />
        </div>

        <div className="flex items-center space-x-3">
          <div className="relative">
            <Button
              variant="ghost"
              icon="ArrowUpDown"
              onClick={() => setShowSortMenu(!showSortMenu)}
            >
              Sort: {currentSort?.label}
            </Button>

            {showSortMenu && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-large border border-gray-200 py-2 z-50"
              >
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      onSortChange(option.value);
                      setShowSortMenu(false);
                    }}
                    className={`
                      w-full px-4 py-2 text-left flex items-center space-x-2 hover:bg-gray-50 transition-colors
                      ${sortBy === option.value ? 'bg-primary-50 text-primary-700' : 'text-gray-700'}
                    `}
                  >
                    <ApperIcon name={option.icon} size={16} />
                    <span>{option.label}</span>
                    {sortBy === option.value && (
                      <ApperIcon name="Check" size={16} className="ml-auto" />
                    )}
                  </button>
                ))}
              </motion.div>
            )}
          </div>

          <Button
            icon="Plus"
            onClick={onAddTask}
            className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700"
          >
            Add Task
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;