import { motion } from 'framer-motion';

const Badge = ({ 
  children, 
  variant = 'default', 
  size = 'sm',
  pulse = false,
  className = '' 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-full';
  
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-gradient-to-r from-primary-500 to-primary-600 text-white',
    secondary: 'bg-gradient-to-r from-secondary-500 to-secondary-600 text-white',
    accent: 'bg-gradient-to-r from-accent-500 to-accent-600 text-white',
    success: 'bg-gradient-to-r from-green-500 to-green-600 text-white',
    warning: 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white',
    danger: 'bg-gradient-to-r from-red-500 to-red-600 text-white',
    high: 'priority-high',
    medium: 'priority-medium',
    low: 'priority-low'
  };
  
  const sizes = {
    xs: 'px-2 py-0.5 text-xs',
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-sm'
  };

  const Component = pulse ? motion.span : 'span';
  const animationProps = pulse ? {
    animate: { scale: [1, 1.05, 1] },
    transition: { duration: 2, repeat: Infinity }
  } : {};

  return (
    <Component
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...animationProps}
    >
      {children}
    </Component>
  );
};

export default Badge;