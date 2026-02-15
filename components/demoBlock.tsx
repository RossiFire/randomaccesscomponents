import { ReactNode } from 'react';
import { cn } from '../lib/utils';
import { GridBackground } from '@/app/(home)/components/beam-bg';

export interface DemoBlockProps {
  /**
   * Title of the demo block
   */
  title?: string;
  
  /**
   * Description of the demo
   */
  description?: string;
  
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
   * Whether to show a border around the demo
   * @defaultValue true
   */
  showBorder?: boolean;
  
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
  title,
  description,
  children,
  className,
  containerClassName,
  showBorder = true,
  background = 'dots',
  disableOverflowHidden = false,
  ref,
}: DemoBlockProps & { ref?: React.RefObject<HTMLDivElement | null>}) {
  return (
    <div className='flex flex-col gap-2'>
      {(title || description) && (
        <div className="">
          {title && (
            <h3 className="text-base font-semibold text-foreground mb-1">
              {title}
            </h3>
          )}
          {description && (
            <p className="text-sm text-muted-foreground mb-0">{description}</p>
          )}
        </div>
      )}
    <div
      className={cn(
        'my-6 rounded-xl shadow-2xl shadow-card',
        showBorder && 'border border-border shadow-sm',
        !disableOverflowHidden && 'overflow-hidden',
        className,
      )}
      ref={ref}
    >
      <div className='relative z-10 size-full overflow-hidden min-h-[200px] '>
        <div
          className={cn(
            'relative p-6 h-fit flex items-center justify-center z-10',
            containerClassName,
          )}
        >
            {children}
        </div>
        <GridBackground className='bg-size-[24px_24px] z-[1]' hideFade={true}/>
      </div>
    </div>
    </div>
  );
}