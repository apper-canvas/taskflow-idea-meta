import { motion } from 'framer-motion';
import ProgressRing from '@/components/molecules/ProgressRing';
import Badge from '@/components/atoms/Badge';
import ApperIcon from '@/components/ApperIcon';
import { getTaskStats } from '@/utils/taskUtils';

const StatsWidget = ({ tasks = [] }) => {
  const stats = getTaskStats(tasks);

  const statCards = [
    {
      label: 'Total Tasks',
      value: stats.total,
      icon: 'List',
      color: 'text-gray-600',
      bgColor: 'bg-gray-100'
    },
    {
      label: 'Completed',
      value: stats.completed,
      icon: 'CheckCircle',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      label: 'Active',
      value: stats.active,
      icon: 'Circle',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      label: 'Overdue',
      value: stats.overdue,
      icon: 'AlertCircle',
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-6 text-center"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Daily Progress
        </h3>
        
        <div className="flex justify-center mb-4">
          <ProgressRing
            progress={stats.completionRate}
            size={80}
            strokeWidth={6}
            color="#5B4CFF"
          />
        </div>
        
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900 mb-1">
            {stats.completed}/{stats.total}
          </p>
          <p className="text-sm text-gray-600">
            Tasks completed today
          </p>
        </div>

        {stats.today > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 p-3 bg-gradient-to-r from-primary-50 to-accent-50 rounded-lg"
          >
            <div className="flex items-center justify-center text-primary-700">
              <ApperIcon name="Target" size={16} className="mr-2" />
              <span className="text-sm font-medium">
                {stats.today} tasks due today
              </span>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="card p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 mb-1">
                  {stat.label}
                </p>
                <p className="text-lg font-semibold text-gray-900">
                  {stat.value}
                </p>
              </div>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <ApperIcon 
                  name={stat.icon} 
                  size={16} 
                  className={stat.color} 
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card p-4"
      >
        <h4 className="text-sm font-medium text-gray-700 mb-3">
          Quick Stats
        </h4>
        <div className="space-y-2">
          {stats.completionRate === 100 && stats.total > 0 && (
            <Badge variant="success" className="w-full justify-center">
              🎉 All tasks completed!
            </Badge>
          )}
          {stats.overdue > 0 && (
            <Badge variant="danger" className="w-full justify-center">
              ⚠️ {stats.overdue} overdue tasks
            </Badge>
          )}
          {stats.today > 0 && (
            <Badge variant="warning" className="w-full justify-center">
              📅 {stats.today} due today
            </Badge>
          )}
          {stats.total === 0 && (
            <Badge variant="default" className="w-full justify-center">
              ✨ Ready to get started!
            </Badge>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default StatsWidget;