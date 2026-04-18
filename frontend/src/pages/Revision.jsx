import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Star, CheckCircle2, AlertCircle, Clock, Plus, Brain } from 'lucide-react';
import { Card } from '../components/molecules/Card';
import { Button } from '../components/atoms/Button';
import { Modal } from '../components/organisms/Modal';

const SUBJECT_COLORS = {
  Mathematics: 'bg-blue-100 text-blue-700',
  Physics: 'bg-purple-100 text-purple-700',
  Chemistry: 'bg-green-100 text-green-700',
  'Computer Science': 'bg-orange-100 text-orange-700',
  English: 'bg-pink-100 text-pink-700',
  History: 'bg-amber-100 text-amber-700',
};
const SUBJECTS = Object.keys(SUBJECT_COLORS);

const getNextRevision = (confidence, lastRevised) => {
  const intervals = [1, 3, 7, 14, 30]; // SM-2 simplified
  const days = intervals[Math.min(confidence, 4)];
  const next = new Date(lastRevised);
  next.setDate(next.getDate() + days);
  return next;
};

const getDueStatus = (nextRevision) => {
  const now = new Date();
  const diff = Math.ceil((nextRevision - now) / (1000 * 60 * 60 * 24));
  if (diff <= 0) return { label: 'Due Now', color: 'bg-red-100 text-red-600', icon: 'red' };
  if (diff <= 2) return { label: `Due in ${diff}d`, color: 'bg-orange-100 text-orange-600', icon: 'orange' };
  return { label: `In ${diff}d`, color: 'bg-emerald-100 text-emerald-600', icon: 'green' };
};

const initTopics = [
  { id: 1, topic: 'Differentiation Rules', subject: 'Mathematics', confidence: 2, lastRevised: new Date(Date.now() - 6 * 86400000) },
  { id: 2, topic: "Newton's Laws of Motion", subject: 'Physics', confidence: 1, lastRevised: new Date(Date.now() - 8 * 86400000) },
  { id: 3, topic: 'Organic Chemistry Mechanisms', subject: 'Chemistry', confidence: 3, lastRevised: new Date(Date.now() - 5 * 86400000) },
  { id: 4, topic: 'Binary Search Trees', subject: 'Computer Science', confidence: 4, lastRevised: new Date(Date.now() - 14 * 86400000) },
  { id: 5, topic: 'Essay Structure & Techniques', subject: 'English', confidence: 3, lastRevised: new Date(Date.now() - 7 * 86400000) },
  { id: 6, topic: 'World War II Causes', subject: 'History', confidence: 2, lastRevised: new Date(Date.now() - 10 * 86400000) },
];

const Revision = () => {
  const [topics, setTopics] = useState(initTopics);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({ topic: '', subject: 'Mathematics', confidence: 3 });
  const [filter, setFilter] = useState('all');

  const markRevised = (id) => {
    setTopics(prev => prev.map(t => t.id === id ? { ...t, lastRevised: new Date(), confidence: Math.min(t.confidence + 1, 4) } : t));
  };
  const setConfidence = (id, val) => setTopics(prev => prev.map(t => t.id === id ? { ...t, confidence: val } : t));

  const addTopic = () => {
    if (!form.topic.trim()) return;
    setTopics(prev => [...prev, { id: Date.now(), ...form, lastRevised: new Date(Date.now() - 86400000 * 6) }]);
    setIsModalOpen(false);
    setForm({ topic: '', subject: 'Mathematics', confidence: 3 });
  };

  const withStatus = topics.map(t => ({ ...t, next: getNextRevision(t.confidence, t.lastRevised), status: getDueStatus(getNextRevision(t.confidence, t.lastRevised)) }));

  const filtered = filter === 'all' ? withStatus : filter === 'due'
    ? withStatus.filter(t => t.status.icon === 'red')
    : withStatus.filter(t => t.status.icon !== 'red');

  const dueNow = withStatus.filter(t => t.status.icon === 'red').length;

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-emerald-100 text-emerald-600"><RefreshCw className="w-7 h-7" /></div>
          <div>
            <h1 className="text-3xl font-black text-slate-900">Smart Revision</h1>
            <p className="text-slate-500 font-semibold text-sm">Spaced repetition to remember everything you study</p>
          </div>
        </div>
        <Button onClick={() => setIsModalOpen(true)} leftIcon={<Plus className="w-4 h-4" />}>Add Topic</Button>
      </header>

      {/* Stats Bar */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Due Now', value: dueNow, color: 'bg-red-50 border-red-200 text-red-600' },
          { label: 'Total Topics', value: topics.length, color: 'bg-slate-50 border-slate-200 text-slate-600' },
          { label: 'Well Learned', value: topics.filter(t => t.confidence >= 4).length, color: 'bg-emerald-50 border-emerald-200 text-emerald-600' },
        ].map((s, i) => (
          <div key={i} className={`p-4 rounded-2xl border ${s.color} text-center`}>
            <p className="text-3xl font-black">{s.value}</p>
            <p className="text-xs font-bold uppercase tracking-wider mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        {[
          { id: 'all', label: 'All Topics' },
          { id: 'due', label: `Due Now (${dueNow})`, icon: AlertCircle },
          { id: 'scheduled', label: 'Scheduled', icon: CheckCircle2 }
        ].map(f => (
          <button key={f.id} onClick={() => setFilter(f.id)}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all border flex items-center gap-1.5 ${filter === f.id ? 'bg-primary-500 text-white border-primary-500' : 'bg-white text-slate-500 border-slate-200 hover:border-primary-300'}`}>
            {f.icon && <f.icon className="w-3 h-3" />}
            {f.label}
          </button>
        ))}
      </div>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((t, i) => (
          <motion.div key={t.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="h-full group">
              <div className="flex justify-between items-start mb-3">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${SUBJECT_COLORS[t.subject] || 'bg-slate-100 text-slate-600'}`}>{t.subject}</span>
                <span className={`text-[10px] font-black px-2 py-1 rounded-lg ${t.status.color}`}>{t.status.label}</span>
              </div>
              <h3 className="font-black text-slate-800 mb-3 leading-tight">{t.topic}</h3>

              {/* Confidence Stars */}
              <div className="mb-4">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Confidence</p>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(s => (
                    <button key={s} onClick={() => setConfidence(t.id, s)}
                      className={`transition-colors ${s <= t.confidence + 1 ? 'text-amber-400' : 'text-slate-200'} hover:text-amber-300`}>
                      <Star className="w-5 h-5 fill-current" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Next: {t.next.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </p>
                <Button size="sm" variant="secondary" onClick={() => markRevised(t.id)} className="text-xs h-8 px-3 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Revised
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Topic for Revision"
        footer={<><Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button><Button onClick={addTopic}>Add Topic</Button></>}>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-1.5">Topic Name</label>
            <input value={form.topic} onChange={e => setForm(f => ({ ...f, topic: e.target.value }))} autoFocus
              placeholder="e.g., Integration by Parts"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500/40 text-sm" />
          </div>
          <div>
            <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-1.5">Subject</label>
            <select value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-primary-500/40 text-sm">
              {SUBJECTS.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-1.5">Initial Confidence (1–5)</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map(n => (
                <button key={n} onClick={() => setForm(f => ({ ...f, confidence: n }))}
                  className={`w-10 h-10 rounded-xl font-black text-sm border transition-all ${form.confidence === n ? 'bg-primary-500 text-white border-primary-500' : 'bg-slate-50 text-slate-500 border-slate-200 hover:border-primary-300'}`}>
                  {n}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Revision;
