import { CheckCircle2, Circle, ChevronRight, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { formatDate } from '../../utils/format';

export const TaskItem = ({ task, onStatusChange, level = 0 }) => {
    const [expanded, setExpanded] = useState(false);
    const hasChildren = task.children && task.children.length > 0;

    const priorityColors = {
        low: 'bg-[#10B981]/20 text-[#34D399]',
        medium: 'bg-[#F59E0B]/20 text-[#FBBF24]',
        high: 'bg-[#DC2626]/20 text-[#F87171]',
    };

    const statusColors = {
        pending: 'text-[#94A3B8]',
        'in-progress': 'text-[#3B82F6]',
        completed: 'text-[#10B981]',
    };

    return (
        <div className={level > 0 ? 'ml-6 mt-2' : ''}>
            <div className="flex items-center space-x-3 p-3 bg-[#1E293B]/50 rounded-lg border border-[#334155]/30 hover:border-[#4F46E5]/50 transition-all">
                {hasChildren && (
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="text-[#94A3B8] hover:text-[#E2E8F0]"
                    >
                        {expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </button>
                )}
                <button
                    onClick={() =>
                        onStatusChange(
                            task.id,
                            task.status === 'completed' ? 'pending' : 'completed'
                        )
                    }
                    className={statusColors[task.status]}
                >
                    {task.status === 'completed' ? (
                        <CheckCircle2 size={20} />
                    ) : (
                        <Circle size={20} />
                    )}
                </button>
                <div className="flex-1">
                    <p
                        className={`text-[#E2E8F0] text-sm font-medium ${task.status === 'completed' ? 'line-through text-[#94A3B8]' : ''
                            }`}
                    >
                        {task.title}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${priorityColors[task.priority]}`}>
                            {task.priority}
                        </span>
                        {task.dueDate && (
                            <span className="text-xs text-[#94A3B8]">
                                Due: {formatDate(task.dueDate)}
                            </span>
                        )}
                    </div>
                </div>
            </div>
            {expanded && hasChildren && (
                <div className="mt-2 space-y-2">
                    {task.children.map((child) => (
                        <TaskItem
                            key={child.id}
                            task={child}
                            onStatusChange={onStatusChange}
                            level={level + 1}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};
