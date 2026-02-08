const Skeleton = ({ className = '', variant = 'default' }) => {
  const variants = {
    default: 'h-4 w-full',
    circle: 'h-12 w-12 rounded-full',
    card: 'h-32 w-full',
  };

  return (
    <div
      className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${variants[variant]} ${className}`}
    />
  );
};

export default Skeleton;
