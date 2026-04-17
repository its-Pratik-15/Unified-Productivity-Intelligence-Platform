import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart2, TrendingUp, Clock, Target, Award, AlertTriangle, ArrowUpRight } from 'lucide-react';
import { Card } from '../components/molecules/Card';
import { DonutChart } from '../components/charts/DonutChart';

const SUBJECT_COLORS_BAR = {
  Mathematics: '#3B82F6',
  Physics: '#8B5CF6',
  Chemistry: '#10B981',
  'Computer Science': '#F97316',
  English: '#EC4899',
  History: '#F59E0B',
};

const subjectData = [
  { subject: 'Mathematics', hours: 12, completion: 78, strength: 'medium', sessions: 18 },
  { subject: 'Physics', hours: 8, completion: 55, strength: 'weak', sessions: 12 },
  { subject: 'Chemistry', hours: 10, completion: 70, strength: 'strong', sessions: 15 },
  { subject: 'Computer Science', hours: 15, completion: 90, strength: 'strong', sessions: 22 },
  { subject: 'English', hours: 6, completion: 60, strength: 'medium', sessions: 9 },
  { subject: 'History', hours: 5, completion: 45, strength: 'weak', sessions: 7 },
];

const weeklyData = [
  { day: 'Mon', hours: 3.5 }, { day: 'Tue', hours: 2 }, { day: 'Wed', hours: 4 },
  { day: 'Thu', hours: 1.5 }, { day: 'Fri', hours: 3 }, { day: 'Sat', hours: 5 }, { day: 'Sun', hours: 2.5 },
];

const maxHours = Math.max(...weeklyData.map(d => d.hours));

const streakData = Array.from({ length: 35 }, (_, i) => ({
  active: Math.random() > 0.35,
  intensity: Math.floor(Math.random() * 4),
}));

const STRENGTH_CONFIG = {
  strong: { color: 'text-emerald-600 bg-emerald-50', label: 'Strong', icon: TrendingUp },
  medium: { color: 'text-amber-600 bg-amber-50', label: 'Growing', icon: ArrowUpRight },
  weak: { color: 'text-red-600 bg-red-50', label: 'Needs Work', icon: AlertTriangle },
};

const Analytics = () => {
  const [period, setPeriod] = useState('week');
  const totalHours = subjectData.reduce((s, d) => s + d.hours, 0);
  const avgCompletion = Math.round(subjectData.reduce((s, d) => s + d.completion, 0) / subjectData.length);
  const weakSubjects = subjectData.filter(d => d.strength === 'weak');

  // Prepare data for donut chart
  const donutData = subjectData.map(s => ({
    label: s.subject,
    value: s.hours,
    color: SUBJECT_COLORS_BAR[s.subject]
  }));

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-indigo-100 text-indigo-600"><BarChart2 className="w-7 h-7" /></div>
          <div>
            <h1 className="text-3xl font-black text-slate-900">Performance Analytics</h1>
            <p className="text-slate-500 font-semibold text-sm">Track your study habits and progress</p>
          </div>
        </div>
        <div className="flex gap-2 p-1 bg-slate-100 rounded-xl">
          {['week', 'month'].map(p => (
            <button key={p} onClick={() => setPeriod(p)}
              className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${period === p ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>
              {p === 'week' ? 'This Week' : 'This Month'}
            </button>
          ))}
        </div>
      </header>

      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Study Time', value: `${totalHours}h`, icon: Clock, color: 'text-primary-500', bg: 'bg-primary-50' },
          { label: 'Avg Completion', value: `${avgCompletion}%`, icon: Target, color: 'text-emerald-500', bg: 'bg-emerald-50' },
          { label: 'Study Streak', value: '7 days', icon: TrendingUp, color: 'text-orange-500', bg: 'bg-orange-50' },
          { label: 'Best Subject', value: 'CS', icon: Award, color: 'text-violet-500', bg: 'bg-violet-50' },
        ].map((kpi, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
            <Card className="p-5 h-full">
              <div className="flex items-center gap-4 h-full">
                <div className={`p-3 rounded-2xl ${kpi.bg} shrink-0`}>
                  <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
                </div>
                <div className="flex-1 text-center min-w-0">
                  <p className="text-3xl font-black text-slate-900 mb-1 truncate">{kpi.value}</p>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider leading-tight">{kpi.label}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Bar Chart */}
        <div className="lg:col-span-2">
          <Card title="Daily Study Hours" subtitle="This week's study session breakdown">
            <div className="flex items-end gap-3 h-40 mt-4">
              {weeklyData.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <p className="text-xs font-black text-slate-400">{d.hours}h</p>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(d.hours / maxHours) * 100}%` }}
                    transition={{ delay: i * 0.08, duration: 0.5 }}
                    className="w-full rounded-t-xl bg-primary-500 hover:bg-primary-600 transition-colors cursor-pointer min-h-[4px]"
                    style={{ maxHeight: '100%' }}
                  />
                  <p className="text-[10px] font-bold text-slate-400">{d.day}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Insights */}
        <Card>
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <BarChart2 className="w-5 h-5 text-indigo-600" />
              <h3 className="text-xl font-bold text-slate-900">Study Insights</h3>
            </div>
            <p className="text-sm text-slate-500">Key observations from your data</p>
          </div>
          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
              <p className="text-xs font-black text-amber-700 mb-1 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" /> Attention Needed
              </p>
              <p className="text-xs text-amber-600 font-medium leading-relaxed">
                Physics exam is in <strong>3 days</strong> but you've only spent 8h on it. Allocate 2h/day to close the gap.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
              <p className="text-xs font-black text-emerald-700 mb-1 flex items-center gap-1">
                <Award className="w-3 h-3" /> Great Progress
              </p>
              <p className="text-xs text-emerald-600 font-medium leading-relaxed">
                CS is your strongest subject at 90% completion. Keep up the momentum!
              </p>
            </div>
            <div className="p-3 rounded-xl bg-blue-50 border border-blue-200">
              <p className="text-xs font-black text-blue-700 mb-1 flex items-center gap-1">
                <Target className="w-3 h-3" /> Study Tip
              </p>
              <p className="text-xs text-blue-600 font-medium leading-relaxed">
                Your peak study hours are 9–11 AM. Schedule your hardest subjects during this time.
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Study Hours Distribution - Donut Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="Study Hours by Subject" subtitle="Time distribution across all subjects">
          <div className="py-4">
            <DonutChart data={donutData} width={240} height={240} innerRadius={0.65} />
          </div>
        </Card>

        {/* Subject Breakdown */}
        <div className="lg:col-span-2">
          <Card title="Subject Performance" subtitle="Completion rate and time spent per subject">
            <div className="space-y-4 mt-2">
              {subjectData.map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
                  className="flex items-center gap-4">
                  <div className="w-28 shrink-0">
                    <p className="text-xs font-bold text-slate-700 truncate">{s.subject}</p>
                    <p className="text-[10px] text-slate-400 font-medium">{s.hours}h · {s.sessions} sessions</p>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-[10px] font-black text-slate-400">{s.completion}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2.5">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${s.completion}%` }}
                        transition={{ delay: i * 0.1, duration: 0.6 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: SUBJECT_COLORS_BAR[s.subject] }} />
                    </div>
                  </div>
                  <span className={`text-[10px] font-black px-2 py-1 rounded-lg shrink-0 flex items-center gap-1 ${STRENGTH_CONFIG[s.strength].color}`}>
                    {React.createElement(STRENGTH_CONFIG[s.strength].icon, { className: "w-3 h-3" })}
                    {STRENGTH_CONFIG[s.strength].label}
                  </span>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Streak Calendar */}
      <Card title="Study Streak" subtitle="Last 35 days — GitHub-style activity grid">
        <div className="flex flex-wrap gap-1.5 mt-3">
          {streakData.map((d, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.01 }}
              className={`w-5 h-5 rounded-sm cursor-pointer transition-transform hover:scale-125 ${!d.active ? 'bg-slate-100' :
                d.intensity === 0 ? 'bg-primary-200' :
                  d.intensity === 1 ? 'bg-primary-300' :
                    d.intensity === 2 ? 'bg-primary-500' : 'bg-primary-700'
                }`}
              title={d.active ? `${d.intensity + 1}h studied` : 'No study'}
            />
          ))}
        </div>
        <div className="flex items-center gap-2 mt-3">
          <p className="text-[10px] text-slate-400 font-bold">Less</p>
          {['bg-slate-100', 'bg-primary-200', 'bg-primary-300', 'bg-primary-500', 'bg-primary-700'].map((c, i) => (
            <div key={i} className={`w-4 h-4 rounded-sm ${c}`} />
          ))}
          <p className="text-[10px] text-slate-400 font-bold">More</p>
        </div>
      </Card>
    </div>
  );
};

export default Analytics;
