export const Button = ({
    variant = 'primary',
    size = 'md',
    className = '',
    children,
    ...props
}) => {
    const baseStyles = 'rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center';

    const variants = {
        primary: 'bg-[#4F46E5] hover:bg-[#4338CA] text-white',
        secondary: 'bg-[#06B6D4] hover:bg-[#0891B2] text-white',
        danger: 'bg-[#DC2626] hover:bg-[#B91C1C] text-white',
        ghost: 'bg-[#334155]/30 hover:bg-[#334155]/50 text-[#E2E8F0]',
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-sm',
        lg: 'px-5 py-2.5 text-base',
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};
