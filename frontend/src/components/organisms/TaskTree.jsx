import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  ChevronDown, 
  MoreVertical, 
  Plus,
  Circle,
  CheckCircle2
} from 'lucide-react';
import { Badge } from '../atoms/Badge';
import { Button } from '../atoms/Button';

/**
 * Recursive Task Node component for nested task structures.
 */
const TaskNode = ({ task, onToggleStatus, onAddSubtask }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const hasChildren = task.children && task.children.length > 0;

  return (
    <div className="group">
      <div className="flex items-center gap-2 py-2 px-3 rounded-xl hover:bg-surface-800/50 transition-colors">
        {/* Expand/Collapse Icon */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`p-1 rounded-lg transition-opacity ${hasChildren ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
          {isExpanded ? (
            <ChevronDown className="w-4 h-4 text-surface-500" />
          ) : (
            <ChevronRight className="w-4 h-4 text-surface-500" />
          )}
        </button>

        {/* Status Checkbox */}
        <button 
          onClick={() => onToggleStatus(task.id)}
          className="p-1 text-surface-600 hover:text-primary-500 transition-colors"
        >
          {task.status === 'completed' ? (
            <CheckCircle2 className="w-5 h-5 text-accent-emerald" />
          ) : (
            <Circle className="w-5 h-5" />
          )}
        </button>

        {/* Task Info */}
        <div className="flex-1 min-w-0">
          <h4 className={`text-sm font-bold truncate ${task.status === 'completed' ? 'text-surface-600 line-through' : 'text-surface-100'}`}>
            {task.title}
          </h4>
        </div>

        {/* Badges & Actions */}
        <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <Badge variant={task.priority === 'high' ? 'danger' : 'primary'}>
            {task.priority}
          </Badge>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onAddSubtask(task.id)}
            className="p-1"
          >
            <Plus className="w-4 h-4" />
          </Button>
          
          <Button variant="ghost" size="sm" className="p-1">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Render Children Recursively */}
      <AnimatePresence initial={false}>
        {isExpanded && hasChildren && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="ml-6 pl-4 border-l border-surface-800 space-y-1 overflow-hidden"
          >
            {task.children.map((child) => (
              <TaskNode 
                key={child.id} 
                task={child} 
                onToggleStatus={onToggleStatus}
                onAddSubtask={onAddSubtask}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/**
 * TaskTree organism for managing nested tasks.
 */
export const TaskTree = ({ tasks, onToggleStatus, onAddSubtask }) => {
  return (
    <div className="space-y-1">
      {tasks.length === 0 ? (
        <div className="text-center py-12 px-4">
          <p className="text-surface-500 italic">No tasks found. Start by creating one!</p>
        </div>
      ) : (
        tasks.map((task) => (
          <TaskNode 
            key={task.id} 
            task={task} 
            onToggleStatus={onToggleStatus}
            onAddSubtask={onAddSubtask}
          />
        ))
      )}
    </div>
  );
};
