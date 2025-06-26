import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/organisms/Header';
import FilterBar from '@/components/organisms/FilterBar';
import TaskList from '@/components/organisms/TaskList';
import TaskFormField from '@/components/molecules/TaskFormField';
import StatsWidget from '@/components/organisms/StatsWidget';
import Button from '@/components/atoms/Button';
import { useTasks } from '@/hooks/useTasks';
import { useCategories } from '@/hooks/useCategories';

const TaskManager = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState('priority');
  const [showAddForm, setShowAddForm] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const {
    tasks,
    loading: tasksLoading,
    error: tasksError,
    createTask,
    updateTask,
    deleteTask,
    bulkUpdateTasks,
    bulkDeleteTasks
  } = useTasks();

  const {
    categories,
    loading: categoriesLoading
  } = useCategories();

  // Update filters to include search
  const activeFilters = {
    ...filters,
    search: searchQuery
  };

  const handleCreateTask = async (taskData) => {
    try {
      await createTask(taskData);
      setShowAddForm(false);
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.metaKey || e.ctrlKey) {
        switch (e.key) {
          case 'k':
            e.preventDefault();
            document.querySelector('input[placeholder*="Search"]')?.focus();
            break;
          case 'n':
            e.preventDefault();
            setShowAddForm(true);
            break;
          case 'b':
            e.preventDefault();
            setSidebarOpen(!sidebarOpen);
            break;
        }
      }
      if (e.key === 'Escape') {
        setShowAddForm(false);
        setSearchQuery('');
        setFilters({});
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [sidebarOpen]);

  if (tasksError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <span className="text-2xl">⚠️</span>
          </div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-600 mb-4">{tasksError}</p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onAddTask={() => setShowAddForm(true)}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      <div className="flex">
        {/* Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.aside
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              className="w-80 bg-white border-r border-gray-200 h-screen overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Filters & Stats
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    icon="X"
                    onClick={() => setSidebarOpen(false)}
                    className="lg:hidden"
                  />
                </div>

                <div className="space-y-8">
                  <StatsWidget tasks={tasks} />
                  <FilterBar
                    tasks={tasks}
                    filters={filters}
                    onFilterChange={setFilters}
                    categories={categories}
                  />
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto p-6">
            {!sidebarOpen && (
              <div className="mb-6">
                <Button
                  variant="ghost"
                  icon="Menu"
                  onClick={() => setSidebarOpen(true)}
                >
                  Show Filters
                </Button>
              </div>
            )}

            {/* Add Task Form */}
            <AnimatePresence>
              {showAddForm && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="card p-6 mb-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Add New Task
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      icon="X"
                      onClick={() => setShowAddForm(false)}
                    />
                  </div>
                  <TaskFormField
                    onSubmit={handleCreateTask}
                    loading={tasksLoading}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Tasks Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {filters.view === 'completed' ? 'Completed Tasks' :
                   filters.view === 'today' ? 'Today\'s Tasks' :
                   filters.view === 'overdue' ? 'Overdue Tasks' :
                   filters.view === 'active' ? 'Active Tasks' :
                   'All Tasks'}
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  {searchQuery && `Search results for "${searchQuery}"`}
                  {filters.category && ` in ${filters.category}`}
                  {filters.priority && ` with ${filters.priority} priority`}
                </p>
              </div>

              {!showAddForm && (
                <Button
                  icon="Plus"
                  onClick={() => setShowAddForm(true)}
                  className="bg-gradient-to-r from-primary-500 to-primary-600"
                >
                  Add Task
                </Button>
              )}
            </div>

            {/* Task List */}
            <TaskList
              tasks={tasks}
              filters={activeFilters}
              sortBy={sortBy}
              onUpdateTask={updateTask}
              onDeleteTask={deleteTask}
              onBulkUpdate={bulkUpdateTasks}
              onBulkDelete={bulkDeleteTasks}
              loading={tasksLoading}
            />
          </div>
        </main>
      </div>

      {/* Keyboard Shortcuts Help */}
      <div className="fixed bottom-4 right-4 opacity-50 hover:opacity-100 transition-opacity">
        <div className="bg-white rounded-lg shadow-soft border border-gray-200 p-3 text-xs text-gray-600">
          <div className="font-medium mb-1">Keyboard Shortcuts:</div>
          <div>⌘K - Search</div>
          <div>⌘N - New Task</div>
          <div>⌘B - Toggle Sidebar</div>
          <div>ESC - Clear/Close</div>
        </div>
      </div>
    </div>
  );
};

export default TaskManager;