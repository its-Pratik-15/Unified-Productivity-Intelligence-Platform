import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell,
  Mail,
  Plus,
  Clock,
  Calendar,
  Trash2,
  BookOpen,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { Card } from '../components/molecules/Card';
import { Button } from '../components/atoms/Button';
import { Modal } from '../components/organisms/Modal';
import { Badge } from '../components/atoms/Badge';
import { toast } from 'sonner';

const SUBJECTS = ['Mathematics', 'Physics', 'Chemistry', 'Computer Science', 'English', 'History', 'Biology', 'Economics'];

const mockReminders = [
  { id: 1, type: 'task', title: 'Integration Assignment Due', subject: 'Mathematics', date: '2024-04-23', time: '23:59', notifyBefore: '1 day', status: 'active' },
  { id: 2, type: 'custom', title: 'Study Group Meeting', subject: null, date: '2024-04-24', time: '15:00', notifyBefore: '2 hours', status: 'active' },
  { id: 3, type: 'task', title: 'Physics Lab Report', subject: 'Physics', date: '2024-04-25', time: '18:00', notifyBefore: '1 day', status: 'active' },
  { id: 4, type: 'custom', title: 'Library Book Return', subject: null, date: '2024-04-26', time: '17:00', notifyBefore: '1 day', status: 'active' },
];

const Notifications = () => {
  const [reminders, setReminders] = useState(mockReminders);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    type: 'custom',
    title: '',
    subject: 'Mathematics',
    date: '',
    time: '',
    notifyBefore: '1 day',
    email: ''
  });

  const handleCreate = () => {
    if (!form.title || !form.date || !form.time || !form.email) {
      return toast.error('Please fill in all required fields');
    }

    const newReminder = {
      id: Date.now(),
      ...form,
      status: 'active'
    };

    setReminders(prev => [newReminder, ...prev]);
    toast.success('Reminder created! Email notification will be sent.');
    setIsModalOpen(false);
    setForm({ type: 'custom', title: '', subject: 'Mathematics', date: '', time: '', notifyBefore: '1 day', email: '' });
  };

  const deleteReminder = (id) => {
    setReminders(prev => prev.filter(r => r.id !== id));
    toast.success('Reminder deleted');
  };

  const upcomingReminders = reminders.filter(r => new Date(r.date) >= new Date());
  const pastReminders = reminders.filter(r => new Date(r.date) < new Date());

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-primary-500/10 text-primary-600">
            <Bell className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-900">Reminders</h1>
            <p className="text-slate-500 font-semibold text-sm">Get email notifications for deadlines and custom events</p>
          </div>
        </div>
        <Button onClick={() => setIsModalOpen(true)} leftIcon={<Plus className="w-5 h-5" />} size="lg">
          Create Reminder
        </Button>
      </header>

      {/* Email Notification Info */}
      <Card className="bg-blue-50 border-blue-200">
        <div className="flex items-start gap-3">
          <Mail className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-blue-900 text-sm">Email Notifications Enabled</p>
            <p className="text-blue-700 text-xs mt-1">You'll receive email reminders based on your notification preferences. Make sure to check your inbox!</p>
          </div>
        </div>
      </Card>

      {/* Upcoming Reminders */}
      <div>
        <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary-500" />
          Upcoming Reminders ({upcomingReminders.length})
        </h2>
        <div className="space-y-3">
          <AnimatePresence>
            {upcomingReminders.length === 0 ? (
              <Card className="text-center py-12">
                <AlertCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-400 font-semibold">No upcoming reminders</p>
              </Card>
            ) : (
              upcomingReminders.map((reminder, i) => (
                <motion.div key={reminder.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }} transition={{ delay: i * 0.05 }}>
                  <Card className="hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div className={`p-3 rounded-xl ${reminder.type === 'task' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}>
                          {reminder.type === 'task' ? <BookOpen className="w-5 h-5" /> : <Calendar className="w-5 h-5" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-bold text-slate-800">{reminder.title}</h3>
                            {reminder.subject && (
                              <Badge variant="default" className="text-xs">{reminder.subject}</Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(reminder.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {reminder.time}
                            </span>
                            <span className="flex items-center gap-1">
                              <Mail className="w-3 h-3" />
                              Notify {reminder.notifyBefore} before
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => deleteReminder(reminder.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Past Reminders */}
      {pastReminders.length > 0 && (
        <div>
          <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-slate-400" />
            Past Reminders ({pastReminders.length})
          </h2>
          <div className="space-y-3">
            {pastReminders.map((reminder, i) => (
              <motion.div key={reminder.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Card className="opacity-60">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="p-3 rounded-xl bg-slate-100 text-slate-400">
                        {reminder.type === 'task' ? <BookOpen className="w-5 h-5" /> : <Calendar className="w-5 h-5" />}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-slate-600 line-through">{reminder.title}</h3>
                        <p className="text-xs text-slate-400 font-medium mt-1">
                          {new Date(reminder.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} at {reminder.time}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => deleteReminder(reminder.id)}
                      className="text-slate-400 hover:text-red-500">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Create Reminder Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create Reminder"
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={handleCreate}>Create Reminder</Button>
          </>
        }>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-1.5">Reminder Type</label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'custom', label: 'Custom Event', icon: Calendar },
                { id: 'task', label: 'Task Deadline', icon: BookOpen }
              ].map(type => (
                <button key={type.id} onClick={() => setForm(f => ({ ...f, type: type.id }))}
                  className={`p-3 rounded-xl border-2 transition-all flex items-center gap-2 ${form.type === type.id
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-primary-300'
                    }`}>
                  <type.icon className="w-4 h-4" />
                  <span className="text-sm font-bold">{type.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-1.5">Title</label>
            <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              placeholder="e.g., Submit Assignment, Study Session"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500/40 text-sm" />
          </div>

          {form.type === 'task' && (
            <div>
              <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-1.5">Subject</label>
              <select value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500/40 text-sm">
                {SUBJECTS.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-1.5">Date</label>
              <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500/40 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-1.5">Time</label>
              <input type="time" value={form.time} onChange={e => setForm(f => ({ ...f, time: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500/40 text-sm" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-1.5">Notify Before</label>
            <select value={form.notifyBefore} onChange={e => setForm(f => ({ ...f, notifyBefore: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500/40 text-sm">
              <option value="15 minutes">15 minutes before</option>
              <option value="30 minutes">30 minutes before</option>
              <option value="1 hour">1 hour before</option>
              <option value="2 hours">2 hours before</option>
              <option value="1 day">1 day before</option>
              <option value="2 days">2 days before</option>
              <option value="1 week">1 week before</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-1.5">Email Address</label>
            <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              placeholder="your.email@example.com"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500/40 text-sm" />
            <p className="text-xs text-slate-400 mt-1 font-medium">Email notification will be sent to this address</p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Notifications;
