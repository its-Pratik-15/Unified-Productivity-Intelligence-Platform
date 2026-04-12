import React from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  BookOpen,
  StickyNote,
  BrainCircuit,
  Timer,
  RefreshCw,
  MessageCircle,
  BarChart2,
  Bell,
  Settings,
  ChevronLeft,
  GraduationCap,
} from 'lucide-react';
import { NavItem } from '../molecules/NavItem';
import { Button } from '../atoms/Button';

/**
 * NexaProductivity — Collapsible Sidebar with student-oriented navigation.
 */
export const Sidebar = ({ isCollapsed, onToggle }) => {
  const mainNav = [
    { to: '/', icon: LayoutDashboard, label: 'My Day' },
    { to: '/assignments', icon: BookOpen, label: 'Assignments' },
    { to: '/notes', icon: StickyNote, label: 'Study Notes' },
    { to: '/focus', icon: Timer, label: 'Focus Mode' },
    { to: '/revision', icon: RefreshCw, label: 'Revision' },
    { to: '/analytics', icon: BarChart2, label: 'Analytics' },
    { to: '/reminders', icon: Bell, label: 'Reminders' },
  ];

  return (
    <motion.aside
      animate={{ width: isCollapsed ? 72 : 260 }}
      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      className="fixed left-0 top-0 h-screen bg-white border-r border-slate-200 flex flex-col z-50 overflow-hidden shadow-sm"
    >
      {/* Brand Logo */}
      <div className="h-16 flex items-center px-4 flex-shrink-0 border-b border-slate-100">
        <div className="w-9 h-9 rounded-xl bg-primary-500 flex items-center justify-center flex-shrink-0 shadow-md shadow-primary-500/30">
          <GraduationCap className="w-5 h-5 text-white" />
        </div>
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="ml-3 overflow-hidden"
          >
            <p className="text-base font-black text-slate-800 whitespace-nowrap leading-none">NexaProductivity</p>
            <p className="text-[10px] text-slate-400 font-semibold whitespace-nowrap mt-0.5">Productivity Partner</p>
          </motion.div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 space-y-0.5 no-scrollbar">
        {mainNav.map((item) => (
          <NavItem
            key={item.to}
            {...item}
            isCollapsed={isCollapsed}
          />
        ))}
      </nav>

      {/* Footer */}
      <div className="flex-shrink-0 border-t border-slate-100 p-3 space-y-1">
        <NavItem
          to="/settings"
          icon={Settings}
          label="Settings"
          isCollapsed={isCollapsed}
        />
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className="w-full justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 mt-1"
        >
          <ChevronLeft className={`w-4 h-4 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} />
          {!isCollapsed && <span className="ml-2 text-xs font-semibold">Collapse</span>}
        </Button>
      </div>
    </motion.aside>
  );
};

