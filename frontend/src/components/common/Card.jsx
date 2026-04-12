export const Card = ({ children, className = '', onClick }) => {
    return (
        <div
            className={`bg-[#1E293B]/50 backdrop-blur-sm rounded-lg p-4 border border-[#334155]/30 ${onClick ? 'cursor-pointer hover:border-[#4F46E5]/50 hover:bg-[#1E293B]/70 transition-all' : ''
                } ${className}`}
            onClick={onClick}
        >
            {children}
        </div>
    );
};
