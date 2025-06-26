import { useState } from 'react';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';
import { parseDateInput } from '@/utils/dateUtils';

const TaskFormField = ({ 
  value, 
  onChange, 
  onSubmit, 
  placeholder = 'Add a new task...',
  loading = false 
}) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('medium');
  const [category, setCategory] = useState('Personal');
  const [dueDate, setDueDate] = useState('');
  const [notes, setNotes] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const taskData = {
      title: title.trim(),
      priority,
      category,
      dueDate: parseDateInput(dueDate),
      notes: notes.trim()
    };

    onSubmit(taskData);
    
    // Reset form
    setTitle('');
    setPriority('medium');
    setCategory('Personal');
    setDueDate('');
    setNotes('');
    setShowAdvanced(false);
  };

  const categories = ['Work', 'Personal', 'Health', 'Learning', 'Home'];
  const priorities = [
    { value: 'high', label: 'High', color: 'text-red-500' },
    { value: 'medium', label: 'Medium', color: 'text-orange-500' },
    { value: 'low', label: 'Low', color: 'text-blue-500' }
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex space-x-2">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={placeholder}
          className="flex-1"
          disabled={loading}
        />
        <Button
          type="submit"
          loading={loading}
          disabled={!title.trim()}
          icon="Plus"
        >
          Add
        </Button>
        <Button
          type="button"
          variant="ghost"
          icon={showAdvanced ? 'ChevronUp' : 'ChevronDown'}
          onClick={() => setShowAdvanced(!showAdvanced)}
        />
      </div>

      {showAdvanced && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Priority
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {priorities.map(p => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <Input
            label="Due Date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            placeholder="Today, Tomorrow, 2024-01-15"
          />

          <div className="md:col-span-3">
            <Input
              label="Notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Additional notes..."
            />
          </div>
        </div>
      )}
    </form>
  );
};

export default TaskFormField;