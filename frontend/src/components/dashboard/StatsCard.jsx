import { Card } from '../common/Card';

export const StatsCard = ({ title, value, icon: Icon, color }) => {
    return (
        <Card>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-[#94A3B8] text-xs font-medium uppercase tracking-wide mb-1">{title}</p>
                    <p className="text-2xl font-bold text-[#E2E8F0]">{value}</p>
                </div>
                <div className={`p-2.5 rounded-lg ${color}`}>
                    <Icon size={20} className="text-white" />
                </div>
            </div>
        </Card>
    );
};
