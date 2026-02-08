const Logo = ({ size = 'md' }) => {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-16 h-16',
  };

  const dotSizes = {
    sm: { outer: 'inset-[4px]', inner: 'inset-[8px]', flame: 'w-1.5 h-1.5' },
    md: { outer: 'inset-[6px]', inner: 'inset-[11px]', flame: 'w-2.5 h-2.5' },
    lg: { outer: 'inset-[12px]', inner: 'inset-[22px]', flame: 'w-5 h-5' },
  };

  return (
    <div className={`relative ${sizes[size]}`}>
      {/* Outer circle - target */}
      <div className="absolute inset-0 rounded-full border-2 border-indigo-600 dark:border-indigo-400"></div>
      {/* Middle circle */}
      <div className={`absolute ${dotSizes[size].outer} rounded-full border-2 border-indigo-500 dark:border-indigo-500`}></div>
      {/* Center dot */}
      <div className={`absolute ${dotSizes[size].inner} rounded-full bg-indigo-600 dark:bg-indigo-400`}></div>
      {/* Flame accent */}
      <div className={`absolute -top-0.5 -right-0.5 ${dotSizes[size].flame} bg-orange-500 rounded-full`}></div>
    </div>
  );
};

export default Logo;
