import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const FilterButton = ({ 
  active = false,
  count,
  icon,
  children,
  onClick,
  ...props 
}) => {
  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Button
        variant={active ? 'primary' : 'ghost'}
        onClick={onClick}
        className={`
          relative transition-all duration-200
          ${active ? 'shadow-glow' : 'hover:bg-gray-100'}
        `}
        {...props}
      >
        <div className="flex items-center space-x-2">
          {icon && <ApperIcon name={icon} size={16} />}
          <span>{children}</span>
          {count !== undefined && count > 0 && (
            <span className={`
              inline-flex items-center justify-center px-2 py-0.5 ml-2 text-xs font-medium rounded-full
              ${active 
                ? 'bg-white/20 text-white' 
                : 'bg-primary-100 text-primary-700'
              }
            `}>
              {count}
            </span>
          )}
        </div>
      </Button>
    </motion.div>
  );
};

export default FilterButton;