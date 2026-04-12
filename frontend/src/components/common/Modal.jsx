import { useEffect } from 'react';
import { X } from 'lucide-react';

export const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const sizes = {
        sm: 'max-w-md',
        md: 'max-w-2xl',
        lg: 'max-w-4xl',
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />
            <div className={`relative bg-[#1E293B] rounded-lg shadow-xl w-full ${sizes[size]}`}>
                <div className="flex items-center justify-between p-4 border-b border-[#334155]">
                    <h2 className="text-xl font-semibold text-[#E2E8F0]">{title}</h2>
                    <button
                        onClick={onClose}
                        className="text-[#94A3B8] hover:text-[#E2E8F0] transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>
                <div className="p-4">{children}</div>
            </div>
        </div>
    );
};
