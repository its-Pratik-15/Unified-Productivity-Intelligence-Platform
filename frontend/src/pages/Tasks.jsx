import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Filter, 
  ListTodo,
  CheckCircle2
} from 'lucide-react';
import { useTasks } from '../hooks/useTasks';
import { TaskTree } from '../components/organisms/TaskTree';
import { Card } from '../components/molecules/Card';
import { Button } from '../components/atoms/Button';
import { Modal } from '../components/organisms/Modal';

/**
 * Tasks page with recursive tree management and modal interactions.
 */
const Tasks = () => {
  const { taskTree, isLoading, updateTask } = useTasks();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleToggleStatus = (id) => {
    // In a real app, this would hit the API
    updateTask(id, { status: 'completed' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-primary-500/10 text-primary-600 shadow-sm">
            <ListTodo className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-surface-100 tracking-tight">Task Management</h1>
            <p className="text-surface-600 mt-1 font-semibold">Organize and track your project progress.</p>
          </div>
        </div>
        <Button 
          onClick={() => setIsModalOpen(true)}
          leftIcon={<Plus className="w-5 h-5" />}
          size="lg"
          className="shadow-xl"
        >
          Create New Task
        </Button>
      </header>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-surface-800 text-surface-100 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all shadow-sm"
          />
        </div>
        <Button variant="secondary" leftIcon={<Filter className="w-5 h-5" />}>
          Filter
        </Button>
      </div>

      {/* Task Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Column: Task List */}
        <div className="lg:col-span-3">
          <Card className="min-h-[600px] p-0 overflow-hidden" title="Your Tasks">
            {isLoading ? (
              <div className="p-6 space-y-4">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="h-12 bg-surface-50 animate-pulse rounded-xl border border-surface-800" />
                ))}
              </div>
            ) : (
              <div className="p-4">
                <TaskTree 
                  tasks={taskTree} 
                  onToggleStatus={handleToggleStatus}
                  onAddSubtask={(parentId) => {
                    console.log('Add subtask to', parentId);
                    setIsModalOpen(true);
                  }}
                />
              </div>
            )}
          </Card>
        </div>

        {/* Right Column: Quick Stats / Summary */}
        <div className="space-y-6">
          <Card title="Project Summary">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-surface-600 text-sm font-bold uppercase tracking-wider">Total Tasks</span>
                <span className="text-surface-100 font-black text-xl">24</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-surface-600 text-sm font-bold uppercase tracking-wider">Completed</span>
                <span className="text-accent-emerald font-black text-xl">18</span>
              </div>
              <div className="w-full bg-surface-50 h-3 rounded-full mt-4 border border-surface-800">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '75%' }}
                  className="bg-primary-500 h-full rounded-full shadow-[0_0_12px_rgba(37,99,235,0.4)]" 
                />
              </div>
              <p className="text-xs text-surface-600 text-center mt-3 font-bold">75% Completion Rate</p>
            </div>
          </Card>

          <Card title="Priority Filter">
            <div className="space-y-3">
              {['High Priority', 'Medium Priority', 'Low Priority'].map((p, i) => (
                <label key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface-50 border border-transparent hover:border-surface-800 cursor-pointer transition-all group">
                  <input type="checkbox" className="w-5 h-5 rounded border-surface-800 bg-white text-primary-500 focus:ring-primary-500/50" />
                  <span className="text-sm text-surface-600 font-bold group-hover:text-surface-100">{p}</span>
                </label>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Create Task Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Task"
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsModalOpen(false)}>Create Task</Button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-surface-600 uppercase tracking-wider mb-1.5">Task Title</label>
            <input 
              type="text" 
              placeholder="What needs to be done?"
              className="w-full px-4 py-3 rounded-xl bg-surface-50 border border-surface-800 text-surface-100 focus:ring-2 focus:ring-primary-500/50 focus:outline-none transition-all" 
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-surface-600 uppercase tracking-wider mb-1.5">Priority</label>
              <select className="w-full px-4 py-3 rounded-xl bg-surface-50 border border-surface-800 text-surface-100 focus:ring-2 focus:ring-primary-500/50 focus:outline-none appearance-none cursor-pointer">
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-surface-600 uppercase tracking-wider mb-1.5">Due Date</label>
              <input 
                type="date" 
                className="w-full px-4 py-3 rounded-xl bg-surface-50 border border-surface-800 text-surface-100 focus:ring-2 focus:ring-primary-500/50 focus:outline-none cursor-pointer" 
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Tasks;
