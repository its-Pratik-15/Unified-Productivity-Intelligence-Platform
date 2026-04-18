import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Link2, 
  MessageCircle, 
  GitBranch, 
  Cloud, 
  ExternalLink,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Mail,
  MessageSquare
} from 'lucide-react';
import { Card } from '../components/molecules/Card';
import { Button } from '../components/atoms/Button';
import { toast } from 'sonner';

const Integrations = () => {
  const [connected, setConnected] = useState([]);

  const handleConnect = (id) => {
    if (connected.includes(id)) {
      setConnected(prev => prev.filter(item => item !== id));
      toast.info(`Disconnected from ${id.toUpperCase()}`);
    } else {
      setConnected(prev => [...prev, id]);
      toast.success(`Successfully adapted and connected to ${id.toUpperCase()}!`);
    }
  };

  const apps = [
    { id: 'slack', name: 'Slack', icon: MessageCircle, description: 'Post updates and alerts to your workspace.', color: '#4A154B' },
    { id: 'email', name: 'Email (Resend)', icon: Mail, description: 'Deliver high-performance transactional emails.', color: '#000000' },
    { id: 'sms', name: 'SMS (Twilio)', icon: MessageSquare, description: 'Send real-time text alerts to mobile devices.', color: '#F22F46' },
    { id: 'github', name: 'GitHub', icon: GitBranch, description: 'Sync your tasks with pull requests and issues.', color: '#181717' },
    { id: 'aws', name: 'AWS Cloud', icon: Cloud, description: 'Automated infrastructure status reporting.', color: '#232F3E' },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <header className="flex items-center gap-4">
        <div className="p-3 rounded-2xl bg-accent-purple text-white shadow-lg shadow-purple-500/20">
          <Link2 className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-3xl font-black text-surface-100 tracking-tight">API Integrations</h1>
          <p className="text-surface-500 font-medium">Using the Adapter Pattern to unify third-party services.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {apps.map((app) => (
          <Card key={app.id} className="relative group overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <ExternalLink className="w-5 h-5 text-surface-400" />
            </div>
            
            <div className="flex flex-col items-center text-center space-y-4">
              <div 
                className="w-16 h-16 rounded-3xl flex items-center justify-center text-white shadow-xl transition-transform group-hover:scale-110"
                style={{ backgroundColor: app.color }}
              >
                <app.icon className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-surface-100">{app.name}</h3>
                <p className="text-sm text-surface-500 mt-2 font-medium leading-relaxed">
                  {app.description}
                </p>
              </div>

              <Button 
                variant={connected.includes(app.id) ? 'secondary' : 'primary'}
                onClick={() => handleConnect(app.id)}
                className="w-full mt-4"
                leftIcon={connected.includes(app.id) ? <CheckCircle2 className="w-5 h-5" /> : <Zap className="w-5 h-5" />}
              >
                {connected.includes(app.id) ? 'Connected' : 'Connect Now'}
              </Button>
            </div>
          </Card>
        ))}
      </div>

    </div>
  );
};

export default Integrations;
