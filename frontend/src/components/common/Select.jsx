export const Select = ({ label, options, className = '', ...props }) => {
    return (
        <div className="space-y-1">
            {label && (
                <label className="block text-sm font-medium text-[#E2E8F0]">
                    {label}
                </label>
            )}
            <select
                className={`w-full px-3 py-2 bg-[#0F172A] border border-[#334155] rounded-lg text-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent ${className}`}
                {...props}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};
