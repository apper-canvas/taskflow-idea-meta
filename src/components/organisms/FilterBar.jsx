import { motion } from 'framer-motion';
import FilterButton from '@/components/molecules/FilterButton';
import { getTaskStats } from '@/utils/taskUtils';

const FilterBar = ({ 
  tasks = [],
  filters,
  onFilterChange,
  categories = []
}) => {
  const stats = getTaskStats(tasks);

  const viewFilters = [
    { key: 'all', label: 'All Tasks', icon: 'List', count: stats.total },
    { key: 'active', label: 'Active', icon: 'Circle', count: stats.active },
    { key: 'completed', label: 'Completed', icon: 'CheckCircle', count: stats.completed },
    { key: 'today', label: 'Today', icon: 'Calendar', count: stats.today },
    { key: 'overdue', label: 'Overdue', icon: 'AlertCircle', count: stats.overdue }
  ];

  const priorityFilters = [
    { key: 'high', label: 'High Priority', icon: 'AlertTriangle' },
    { key: 'medium', label: 'Medium Priority', icon: 'Minus' },
    { key: 'low', label: 'Low Priority', icon: 'ArrowDown' }
  ];

  return (
    <div className="space-y-6">
      {/* View Filters */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Views</h3>
        <div className="space-y-1">
          {viewFilters.map((filter) => (
            <FilterButton
              key={filter.key}
              active={filters.view === filter.key || (!filters.view && filter.key === 'all')}
              count={filter.count}
              icon={filter.icon}
              onClick={() => onFilterChange({ 
                ...filters, 
                view: filter.key === 'all' ? '' : filter.key 
              })}
              className="w-full justify-start"
            >
              {filter.label}
            </FilterButton>
          ))}
        </div>
      </div>

      {/* Priority Filters */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Priority</h3>
        <div className="space-y-1">
          <FilterButton
            active={!filters.priority}
            icon="Layers"
            onClick={() => onFilterChange({ ...filters, priority: '' })}
            className="w-full justify-start"
          >
            All Priorities
          </FilterButton>
          {priorityFilters.map((filter) => (
            <FilterButton
              key={filter.key}
              active={filters.priority === filter.key}
              icon={filter.icon}
              onClick={() => onFilterChange({ 
                ...filters, 
                priority: filters.priority === filter.key ? '' : filter.key 
              })}
              className="w-full justify-start"
            >
              {filter.label}
            </FilterButton>
          ))}
        </div>
      </div>

      {/* Category Filters */}
      {categories.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Categories</h3>
          <div className="space-y-1">
            <FilterButton
              active={!filters.category}
              icon="Grid"
              onClick={() => onFilterChange({ ...filters, category: '' })}
              className="w-full justify-start"
            >
              All Categories
            </FilterButton>
            {categories.map((category) => (
              <FilterButton
                key={category.id}
                active={filters.category === category.name}
                count={category.taskCount}
                onClick={() => onFilterChange({ 
                  ...filters, 
                  category: filters.category === category.name ? '' : category.name 
                })}
                className="w-full justify-start"
              >
                <div className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: category.color }}
                  />
                  {category.name}
                </div>
              </FilterButton>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;