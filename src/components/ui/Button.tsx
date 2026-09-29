import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import { cn } from '../../utils/cn';
import { ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'secondary' | 'glass';
  withArrow?: boolean;
  children: ReactNode;
}

export const Button = ({
  className,
  variant = 'primary',
  withArrow,
  children,
  ...props
}: ButtonProps) => {
  const variants = {
    primary:
      'bg-primary text-[#071A0A] shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/30',
    secondary:
      'bg-transparent border border-primary/60 text-primary hover:bg-white/[0.06] hover:border-primary',
    glass:
      'glass text-primary hover:bg-white/[0.1] hover:border-white/[0.2]',
  };

  return (
    <motion.button
      whileHover={{ y: -2, scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={cn(
        'relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full font-sans text-sm font-medium tracking-wider transition-all duration-300 cursor-pointer select-none',
        variants[variant],
        className,
      )}
      {...props}
    >
      <span>{children}</span>
      {withArrow && (
        <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </motion.button>
  );
};
