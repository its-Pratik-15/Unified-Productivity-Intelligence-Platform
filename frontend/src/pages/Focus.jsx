import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Timer, Play, Pause, RotateCcw, Coffee, BookOpen, CheckCircle2, Flame, Target, Settings } from 'lucide-react';
import { Card } from '../components/molecules/Card';
import { Button } from '../components/atoms/Button';
import { Modal } from '../components/organisms/Modal';

const SUBJECTS = ['Mathematics', 'Physics', 'Chemistry', 'Computer Science', 'English', 'History'];

const PRESETS = [
  { name: 'Classic', work: 25, break: 5 },
  { name: 'Extended', work: 50, break: 10 },
  { name: 'Short', work: 15, break: 3 },
];

const Focus = () => {
  const [phase, setPhase] = useState('work'); // 'work' | 'break'
  const [workMins, setWorkMins] = useState(25);
  const [breakMins, setBreakMins] = useState(5);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [subject, setSubject] = useState('Mathematics');
  const [totalToday, setTotalToday] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [customWork, setCustomWork] = useState(25);
  const [customBreak, setCustomBreak] = useState(5);
  const intervalRef = useRef(null);

  const total = phase === 'work' ? workMins * 60 : breakMins * 60;
  const progress = ((total - timeLeft) / total) * 100;
  const circumference = 2 * Math.PI * 90;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            clearInterval(intervalRef.current);
            setRunning(false);
            if (phase === 'work') {
              setSessions(prev => [...prev, { subject, time: new Date().toLocaleTimeString(), duration: workMins }]);
              setTotalToday(prev => prev + workMins);
              setPhase('break');
              setTimeLeft(breakMins * 60);
            } else {
              setPhase('work');
              setTimeLeft(workMins * 60);
            }
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [running, phase, subject, workMins, breakMins]);

  const reset = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
    setTimeLeft(phase === 'work' ? workMins * 60 : breakMins * 60);
  };

  const switchPhase = (p) => {
    setPhase(p);
    setRunning(false);
    setTimeLeft(p === 'work' ? workMins * 60 : breakMins * 60);
  };

  const applyPreset = (preset) => {
    setWorkMins(preset.work);
    setBreakMins(preset.break);
    setCustomWork(preset.work);
    setCustomBreak(preset.break);
    setTimeLeft(phase === 'work' ? preset.work * 60 : preset.break * 60);
    setRunning(false);
  };

  const applyCustom = () => {
    if (customWork < 1 || customWork > 120 || customBreak < 1 || customBreak > 60) {
      return;
    }
    setWorkMins(customWork);
    setBreakMins(customBreak);
    setTimeLeft(phase === 'work' ? customWork * 60 : customBreak * 60);
    setRunning(false);
    setShowSettings(false);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <header>
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-orange-100 text-orange-600"><Timer className="w-7 h-7" /></div>
            <div>
              <h1 className="text-3xl font-black text-slate-900">Focus Mode</h1>
              <p className="text-slate-500 font-semibold text-sm">Pomodoro technique for deep study sessions</p>
            </div>
          </div>
          <Button variant="secondary" size="sm" onClick={() => setShowSettings(true)} leftIcon={<Settings className="w-4 h-4" />}>
            Timer Settings
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Timer */}
        <div className="lg:col-span-3">
          <Card>
            {/* Phase tabs */}
            <div className="flex gap-2 mb-8 p-1 bg-slate-100 rounded-xl w-fit">
              {[
                { id: 'work', label: 'Focus', icon: Target },
                { id: 'break', label: 'Break', icon: Coffee }
              ].map(p => (
                <button key={p.id} onClick={() => switchPhase(p.id)}
                  className={`px-5 py-2 rounded-lg text-sm font-black transition-all flex items-center gap-2 ${phase === p.id ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
                  <p.icon className="w-4 h-4" />
                  {p.label}
                </button>
              ))}
            </div>

            {/* Subject selector */}
            <div className="mb-6">
              <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-2">Studying</label>
              <select value={subject} onChange={e => setSubject(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-primary-500/40 text-sm">
                {SUBJECTS.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>

            {/* SVG Ring Timer */}
            <div className="flex flex-col items-center gap-6">
              <div className="relative cursor-pointer group" onClick={() => setShowSettings(true)}>
                <svg width="220" height="220" className="-rotate-90">
                  <circle cx="110" cy="110" r="90" fill="none" stroke="#f1f5f9" strokeWidth="12" />
                  <motion.circle cx="110" cy="110" r="90" fill="none"
                    stroke={phase === 'work' ? '#2563EB' : '#10B981'}
                    strokeWidth="12" strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    transition={{ duration: 1, ease: 'linear' }} />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-5xl font-black text-slate-900 tabular-nums group-hover:text-primary-600 transition-colors">{fmt(timeLeft)}</p>
                  <p className="text-sm font-bold text-slate-400 mt-1 group-hover:text-primary-500 transition-colors">{phase === 'work' ? 'Focus Time' : 'Break Time'}</p>
                  <p className="text-xs text-slate-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">Click to adjust</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="secondary" size="sm" onClick={reset}><RotateCcw className="w-4 h-4" /></Button>
                <Button size="lg" onClick={() => setRunning(!running)}
                  leftIcon={running ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}>
                  {running ? 'Pause' : 'Start Session'}
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Stats + Session History */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-orange-50 rounded-2xl text-center">
                <Flame className="w-6 h-6 text-orange-500 mx-auto mb-1" />
                <p className="text-2xl font-black text-slate-900">{sessions.length}</p>
                <p className="text-xs font-bold text-slate-500">Pomodoros</p>
              </div>
              <div className="p-4 bg-primary-50 rounded-2xl text-center">
                <Timer className="w-6 h-6 text-primary-500 mx-auto mb-1" />
                <p className="text-2xl font-black text-slate-900">{totalToday}m</p>
                <p className="text-xs font-bold text-slate-500">Today</p>
              </div>
            </div>
          </Card>

          <Card title="Session Log">
            <div className="space-y-2 max-h-64 overflow-y-auto no-scrollbar">
              <AnimatePresence>
                {sessions.length === 0 ? (
                  <p className="text-center text-slate-400 text-sm py-6 font-medium">No sessions yet — start your first Pomodoro!</p>
                ) : (
                  [...sessions].reverse().map((s, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                      className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        <p className="text-xs font-bold text-slate-700">{s.subject}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-black text-slate-500">{s.duration}m</p>
                        <p className="text-[10px] text-slate-400">{s.time}</p>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </Card>
        </div>
      </div>

      {/* Timer Settings Modal */}
      <Modal isOpen={showSettings} onClose={() => setShowSettings(false)} title="Timer Settings"
        footer={
          <>
            <Button variant="ghost" onClick={() => setShowSettings(false)}>Cancel</Button>
            <Button onClick={applyCustom}>Apply Settings</Button>
          </>
        }>
        <div className="space-y-6">
          {/* Presets */}
          <div>
            <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-3">Quick Presets</label>
            <div className="grid grid-cols-3 gap-3">
              {PRESETS.map((preset, i) => (
                <button key={i} onClick={() => applyPreset(preset)}
                  className={`p-4 rounded-xl border-2 transition-all hover:border-primary-400 ${workMins === preset.work && breakMins === preset.break
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-slate-200 bg-white'
                    }`}>
                  <p className="font-black text-slate-800 text-sm mb-1">{preset.name}</p>
                  <p className="text-xs text-slate-500 font-medium">{preset.work}m / {preset.break}m</p>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Times */}
          <div>
            <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-3">Custom Duration</label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-2">Focus Time (minutes)</label>
                <input
                  type="number"
                  min="1"
                  max="120"
                  value={customWork}
                  onChange={e => setCustomWork(parseInt(e.target.value) || 1)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-primary-500/40 text-sm"
                />
                <p className="text-xs text-slate-400 mt-1 font-medium">1-120 minutes</p>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-2">Break Time (minutes)</label>
                <input
                  type="number"
                  min="1"
                  max="60"
                  value={customBreak}
                  onChange={e => setCustomBreak(parseInt(e.target.value) || 1)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-primary-500/40 text-sm"
                />
                <p className="text-xs text-slate-400 mt-1 font-medium">1-60 minutes</p>
              </div>
            </div>
          </div>

          {/* Current Settings Display */}
          <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
            <p className="text-xs font-black text-blue-700 mb-2">Current Settings</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-bold text-blue-900">Focus: {workMins} min</span>
              </div>
              <div className="flex items-center gap-2">
                <Coffee className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-bold text-blue-900">Break: {breakMins} min</span>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Focus;
