const IconButton = ({ icon: Icon, onClick, label, variant = 'ghost', size = 'md' }) => {
  const sizes = {
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-3',
  };

  const variants = {
    ghost: 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700',
    primary: 'text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20',
  };

  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={`rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 ${sizes[size]} ${variants[variant]}`}
    >
      <Icon size={20} />
    </button>
  );
};

export default IconButton;
