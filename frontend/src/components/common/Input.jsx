export const Input = ({ label, error, className = '', ...props }) => {
    return (
        <div className="space-y-1">
            {label && (
                <label className="block text-sm font-medium text-[#E2E8F0]">
                    {label}
                </label>
            )}
            <input
                className={`w-full px-3 py-2 bg-[#0F172A] border ${error ? 'border-red-500' : 'border-[#334155]'
                    } rounded-lg text-[#E2E8F0] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent ${className}`}
                {...props}
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
    );
};
