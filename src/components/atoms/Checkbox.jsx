import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Checkbox = ({ 
  checked, 
  onChange, 
  disabled = false, 
  size = 'md',
  className = '',
  ...props 
}) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };
  
  const iconSizes = {
    sm: 12,
    md: 14,
    lg: 16
  };

  return (
    <motion.button
      type="button"
      role="checkbox"
      aria-checked={checked}
      whileHover={{ scale: disabled ? 1 : 1.1 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      className={`
        ${sizes[size]} rounded-full border-2 flex items-center justify-center
        transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500
        ${checked 
          ? 'bg-gradient-to-r from-accent-500 to-accent-600 border-accent-500 text-white shadow-soft' 
          : 'border-gray-300 hover:border-gray-400 bg-white'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      onClick={() => !disabled && onChange?.(!checked)}
      disabled={disabled}
      {...props}
    >
      <motion.div
        initial={false}
        animate={checked ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.15 }}
      >
        <ApperIcon name="Check" size={iconSizes[size]} className="text-white" />
      </motion.div>
    </motion.button>
  );
};

export default Checkbox;