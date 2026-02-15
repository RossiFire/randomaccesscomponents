import { ReactNode } from 'react';
import { cn } from '../lib/utils';
import { GridBackground } from '@/app/(home)/components/beam-bg';

export interface DemoBlockProps {
  /**
   * The demo component to render
   */
  children: ReactNode;
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  
  /**
   * Background style for the demo area
   * @defaultValue 'default'
   */
  background?: 'default' | 'dots' | 'grid' | 'none';
  
  /**
   * Whether to disable overflow-hidden on the outer container
   * Useful when you need sticky positioning or other overflow behaviors
   * @defaultValue false
   */
  disableOverflowHidden?: boolean;
}

export function DemoBlock({
  children,
  className,
  containerClassName,
  disableOverflowHidden = false,
  ref,
}: DemoBlockProps & { ref?: React.RefObject<HTMLDivElement | null>}) {
  return (
    <div
      className={cn(
        'my-6 rounded-xl shadow-card border border-border shadow-sm relative h-full flex items-center justify-center z-10 min-h-[200px]',
        !disableOverflowHidden && 'overflow-hidden',
        className
      )}
      ref={ref}
    >
      <div className={cn('relative z-10 size-full overflow-hidden h-fit p-6', containerClassName)}>
        {children}
      </div>
      <GridBackground className='bg-size-[24px_24px] z-[1]' hideFade={true}/>
    </div>
  );
}