import { useState } from 'react';
import { motion } from 'framer-motion';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';

const SearchBar = ({ 
  value = '', 
  onChange, 
  onClear,
  placeholder = 'Search tasks...',
  className = '' 
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = () => {
    onChange('');
    onClear?.();
  };

  return (
    <motion.div 
      className={`relative ${className}`}
      animate={{ scale: isFocused ? 1.02 : 1 }}
      transition={{ duration: 0.2 }}
    >
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        icon="Search"
        iconPosition="left"
        className="pr-10"
      />
      {value && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <Button
            variant="ghost"
            size="sm"
            icon="X"
            onClick={handleClear}
            className="p-1 hover:bg-gray-200 rounded-full"
          />
        </div>
      )}
    </motion.div>
  );
};

export default SearchBar;