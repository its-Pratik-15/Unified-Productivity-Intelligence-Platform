import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen, Clock, Flame,
  CalendarCheck, RefreshCw, Timer, TrendingUp
} from 'lucide-react';
import { Card } from '../components/molecules/Card';
import { Button } from '../components/atoms/Button';
import { CheckCircle2 } from 'lucide-react';
import api from '../utils/api';

const COLORS = {
  Mathematics: 'bg-blue-100 text-blue-700',
  Physics: 'bg-purple-100 text-purple-700',
  Chemistry: 'bg-green-100 text-green-700',
  'Computer Science': 'bg-orange-100 text-orange-700',
  English: 'bg-pink-100 text-pink-700',
  History: 'bg-amber-100 text-amber-700',
  Biology: 'bg-teal-100 text-teal-700',
  General: 'bg-slate-100 text-slate-600',
};

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const userId = 'test-user-001'; // Replace with actual user ID from auth

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await api.get(`/dashboard/${userId}`);
      if (response.data.success) {
        setDashboardData(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDueDate = (dueDate) => {
    if (!dueDate) return 'No due date';
    const date = new Date(dueDate);
    const now = new Date();
    const diffDays = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays < 0) return 'Overdue';
    return `In ${diffDays} days`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500">Unable to load dashboard data</p>
      </div>
    );
  }

  const { stats, upcomingDeadlines, todayPlan, revisionDue } = dashboardData;

  const statsDisplay = [
    { label: 'Pending Assignments', value: stats.pendingAssignments, icon: BookOpen, color: 'text-primary-500', bg: 'bg-primary-500/10', trend: `${upcomingDeadlines.filter(d => d.urgent).length} due soon` },
    { label: 'Study Streak', value: `${stats.streak}d`, icon: Flame, color: 'text-orange-500', bg: 'bg-orange-100', trend: stats.streak > 0 ? 'Keep it up!' : 'Start today!' },
    { label: 'Exams This Week', value: stats.examsThisWeek, icon: CalendarCheck, color: 'text-accent-rose', bg: 'bg-red-50', trend: stats.examsThisWeek > 0 ? 'Stay prepared' : 'No exams' },
    { label: "Today's Score", value: `${stats.studyScore}%`, icon: TrendingUp, color: 'text-accent-emerald', bg: 'bg-emerald-50', trend: `${stats.todayHours}h studied` },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-primary-500 uppercase tracking-widest mb-1">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            My Day <Clock className="w-7 h-7 text-primary-500" />
          </h1>
          <p className="text-slate-500 mt-1 font-medium">Stay focused. Every session counts.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" leftIcon={<Timer className="w-4 h-4" />}>Start Focus</Button>
        </div>
      </header>

      {/* Stats */}
      <motion.div variants={container} initial="hidden" animate="show"
        className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {statsDisplay.map((stat, i) => (
          <motion.div key={i} variants={item}>
            <Card className="hover:scale-[1.02] transition-transform cursor-pointer">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{stat.label}</p>
                  <h2 className="text-3xl font-black text-slate-900">{stat.value}</h2>
                  <p className={`text-xs font-bold mt-1 ${stat.color}`}>{stat.trend}</p>
                </div>
                <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Study Plan */}
        <div className="lg:col-span-2">
          <Card title="Today's Study Plan" subtitle="Organize your study sessions for maximum productivity">
            <div className="space-y-3">
              {todayPlan.map((session, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 p-3 rounded-xl border border-slate-100 hover:border-primary-200 hover:bg-primary-50/30 transition-all cursor-pointer group">
                  <div className="text-center min-w-[52px]">
                    <p className="text-xs font-black text-slate-400">{session.time}</p>
                    <p className="text-[10px] text-slate-400 font-semibold">{session.duration}</p>
                  </div>
                  <div className="w-px h-10 bg-slate-200" />
                  <div className="flex-1">
                    <p className="font-bold text-slate-800 text-sm group-hover:text-primary-600 transition-colors">{session.task}</p>
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${COLORS[session.subject] || 'bg-slate-100 text-slate-600'}`}>
                    {session.subject}
                  </span>
                </motion.div>
              ))}
            </div>
            <Button variant="ghost" size="sm" className="w-full mt-4">
              View All Sessions
            </Button>
          </Card>
        </div>

        {/* Upcoming Deadlines */}
        <div className="space-y-5">
          <Card title="Upcoming Deadlines" subtitle="Assignments & exams">
            <div className="space-y-3">
              {upcomingDeadlines.length === 0 ? (
                <p className="text-center text-slate-400 py-6">No upcoming deadlines</p>
              ) : (
                upcomingDeadlines.map((d, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group">
                    <div>
                      <p className="font-bold text-sm text-slate-800 group-hover:text-primary-600">{d.title}</p>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full mt-1 inline-block ${COLORS[d.subject] || 'bg-slate-100 text-slate-600'}`}>
                        {d.subject}
                      </span>
                    </div>
                    <span className={`text-xs font-black px-2 py-1 rounded-lg ${d.urgent ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-500'}`}>
                      {formatDueDate(d.dueDate)}
                    </span>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* Revision Due */}
      <Card title="Revision Due Today" subtitle="Spaced repetition — these topics need attention">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {revisionDue.length === 0 ? (
            <div className="col-span-3 text-center text-slate-400 py-6">
              No topics need revision today
            </div>
          ) : (
            revisionDue.map((r, i) => (
              <motion.div key={i} whileHover={{ scale: 1.02 }}
                className="p-4 rounded-2xl border-2 border-dashed border-orange-200 bg-orange-50/50 cursor-pointer group">
                <div className="flex justify-between items-start mb-2">
                  <p className="font-black text-slate-800 text-sm">{r.topic}</p>
                  <RefreshCw className="w-4 h-4 text-orange-400 group-hover:text-orange-600 transition-colors" />
                </div>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${COLORS[r.subject] || 'bg-slate-100 text-slate-600'}`}>
                  {r.subject}
                </span>
                <p className="text-xs text-slate-400 mt-2 font-medium">Last studied {r.lastStudied}</p>
                <Button size="sm" variant="secondary" className="w-full mt-3 text-xs flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Mark Revised
                </Button>
              </motion.div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
