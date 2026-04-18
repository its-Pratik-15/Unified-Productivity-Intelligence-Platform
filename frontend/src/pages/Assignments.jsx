import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Filter, BookOpen, CheckCircle2, Circle, ChevronDown, ChevronRight, MoreVertical, Tag } from 'lucide-react';
import { Card } from '../components/molecules/Card';
import { Button } from '../components/atoms/Button';
import { Modal } from '../components/organisms/Modal';
import { Badge } from '../components/atoms/Badge';

const SUBJECTS = ['Mathematics', 'Physics', 'Chemistry', 'Computer Science', 'English', 'History', 'Biology', 'Economics'];
const SUBJECT_COLORS = {
  Mathematics: 'bg-blue-100 text-blue-700 border-blue-200',
  Physics: 'bg-purple-100 text-purple-700 border-purple-200',
  Chemistry: 'bg-green-100 text-green-700 border-green-200',
  'Computer Science': 'bg-orange-100 text-orange-700 border-orange-200',
  English: 'bg-pink-100 text-pink-700 border-pink-200',
  History: 'bg-amber-100 text-amber-700 border-amber-200',
  Biology: 'bg-teal-100 text-teal-700 border-teal-200',
  Economics: 'bg-indigo-100 text-indigo-700 border-indigo-200',
};

const mockAssignments = [
  { id: 1, title: 'Integration by Parts — Problem Set 5', subject: 'Mathematics', chapter: 'Calculus - Ch.7', priority: 'high', due: '2024-04-23', status: 'todo', weight: '15%' },
  { id: 2, title: 'Lab Report: Titration Experiment', subject: 'Chemistry', chapter: 'Acid-Base Reactions', priority: 'medium', due: '2024-04-25', status: 'in-progress', weight: '20%' },
  { id: 3, title: 'Essay: Industrial Revolution Impact', subject: 'History', chapter: 'Modern Europe', priority: 'low', due: '2024-04-28', status: 'todo', weight: '10%' },
  { id: 4, title: 'Quantum Mechanics Problem Sheet', subject: 'Physics', chapter: 'QM - Ch.3', priority: 'high', due: '2024-04-24', status: 'todo', weight: '25%' },
  { id: 5, title: 'Binary Trees Implementation', subject: 'Computer Science', chapter: 'Data Structures', priority: 'medium', due: '2024-04-30', status: 'completed', weight: '30%' },
];

const PRIORITY_STYLES = {
  high: 'bg-red-100 text-red-600',
  medium: 'bg-yellow-100 text-yellow-700',
  low: 'bg-green-100 text-green-700',
};

const Assignments = () => {
  const [assignments, setAssignments] = useState(mockAssignments);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [filterSubject, setFilterSubject] = useState('All');
  const [form, setForm] = useState({ title: '', subject: 'Mathematics', chapter: '', priority: 'medium', due: '', weight: '' });

  const toggle = (id) => setAssignments(prev => prev.map(a =>
    a.id === id ? { ...a, status: a.status === 'completed' ? 'todo' : 'completed' } : a
  ));

  const handleCreate = () => {
    if (!form.title.trim()) return;
    setAssignments(prev => [{ id: Date.now(), ...form, status: 'todo' }, ...prev]);
    setIsModalOpen(false);
    setForm({ title: '', subject: 'Mathematics', chapter: '', priority: 'medium', due: '', weight: '' });
  };

  const filtered = assignments.filter(a =>
    (filterSubject === 'All' || a.subject === filterSubject) &&
    a.title.toLowerCase().includes(search.toLowerCase())
  );

  const completed = filtered.filter(a => a.status === 'completed').length;

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-primary-500/10 text-primary-600"><BookOpen className="w-7 h-7" /></div>
          <div>
            <h1 className="text-3xl font-black text-slate-900">Assignments</h1>
            <p className="text-slate-500 font-semibold text-sm">{completed}/{filtered.length} completed this view</p>
          </div>
        </div>
        <Button onClick={() => setIsModalOpen(true)} leftIcon={<Plus className="w-5 h-5" />} size="lg">Add Assignment</Button>
      </header>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search assignments..."
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500/40 text-sm" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['All', ...SUBJECTS.slice(0, 5)].map(s => (
            <button key={s} onClick={() => setFilterSubject(s)}
              className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all ${filterSubject === s ? 'bg-primary-500 text-white border-primary-500' : 'bg-white text-slate-500 border-slate-200 hover:border-primary-300'}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Assignment List */}
      <Card>
        <div className="divide-y divide-slate-100">
          <AnimatePresence>
            {filtered.length === 0 ? (
              <div className="py-16 text-center text-slate-400 font-semibold">No assignments found.</div>
            ) : (
              filtered.map((a, i) => (
                <motion.div key={a.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }} transition={{ delay: i * 0.04 }}
                  className="flex items-center gap-4 py-4 px-2 hover:bg-slate-50/70 rounded-xl transition-colors group">
                  <button onClick={() => toggle(a.id)} className="flex-shrink-0">
                    {a.status === 'completed'
                      ? <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      : <Circle className="w-5 h-5 text-slate-300 group-hover:text-primary-400 transition-colors" />}
                  </button>
                  <div className="flex-1 min-w-0">
                    <p className={`font-bold text-sm ${a.status === 'completed' ? 'line-through text-slate-400' : 'text-slate-800'}`}>{a.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${SUBJECT_COLORS[a.subject] || 'bg-slate-100 text-slate-600'}`}>{a.subject}</span>
                      {a.chapter && <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1"><Tag className="w-3 h-3" />{a.chapter}</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    {a.weight && <span className="text-xs font-black text-slate-400">{a.weight}</span>}
                    <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-lg ${PRIORITY_STYLES[a.priority]}`}>{a.priority}</span>
                    <span className="text-xs text-slate-400 font-semibold">{new Date(a.due).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </Card>

      {/* Create Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Assignment"
        footer={<><Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button><Button onClick={handleCreate}>Save Assignment</Button></>}>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-1.5">Assignment Title</label>
            <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              placeholder="e.g., Problem Set 5 — Integration" autoFocus
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500/40 text-sm" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-1.5">Subject</label>
              <select value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500/40 text-sm">
                {SUBJECTS.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-1.5">Priority</label>
              <select value={form.priority} onChange={e => setForm(f => ({ ...f, priority: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500/40 text-sm">
                <option value="high">High</option><option value="medium">Medium</option><option value="low">Low</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-1.5">Chapter / Topic</label>
              <input value={form.chapter} onChange={e => setForm(f => ({ ...f, chapter: e.target.value }))}
                placeholder="e.g., Chapter 7 - Calculus"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500/40 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-1.5">Grade Weight</label>
              <input value={form.weight} onChange={e => setForm(f => ({ ...f, weight: e.target.value }))}
                placeholder="e.g., 20%"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500/40 text-sm" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-1.5">Due Date</label>
            <input type="date" value={form.due} onChange={e => setForm(f => ({ ...f, due: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500/40 text-sm" />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Assignments;
