import React from 'react';
import { motion } from 'framer-motion';
import { Button, ButtonProps } from './button';

// Use permissive types for framer-motion wrapped components to avoid strict MotionProps conflicts
type DivProps = React.ComponentPropsWithoutRef<'div'> & Record<string, any>;

const MotionDivEl: any = motion.div;

export const MotionDiv: React.FC<DivProps> = ({ children, className, ...props }) => (
  <MotionDivEl
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -8 }}
    transition={{ duration: 0.28, ease: 'easeOut' }}
    className={className}
    {...(props as any)}
  >
    {children}
  </MotionDivEl>
);

type MotionButtonProps = ButtonProps & { pulse?: boolean } & Record<string, any>;

export const MotionButton = React.forwardRef<HTMLButtonElement, MotionButtonProps>(
  ({ className, pulse = false, children, ...props }, ref) => {
    // Wrap the existing Button with framer-motion
    const MotionBtn: any = motion(Button as any);
    const animate = pulse ? { scale: [1, 1.04, 1] } : undefined;
    const transition = pulse ? { duration: 1.6, repeat: Infinity, ease: 'linear' } : { duration: 0.12 };

    return (
      <MotionBtn
        ref={ref}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        animate={animate}
        transition={transition}
        className={className}
        {...props}
      >
        {children}
      </MotionBtn>
    );
  }
);
MotionButton.displayName = 'MotionButton';

export default MotionDiv;
