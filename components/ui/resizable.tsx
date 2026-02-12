import { GripVertical } from 'lucide-react';
import { Group, Panel, Separator } from 'react-resizable-panels';
import { cn } from '@/lib/utils';

function ResizablePanelGroup({
    className,
    ...props
}: React.ComponentProps<typeof Group>) {
    return (
        <Group
            className={cn('flex h-full w-full', className)}
            {...props}
        />
    );
}

function ResizableHandle({
    className,
    withHandle,
    ...props
}: React.ComponentProps<typeof Separator> & {
    withHandle?: boolean;
}) {
    return (
        <Separator
            className={cn(
                'relative flex w-px items-center justify-center bg-border',
                'after:absolute after:inset-y-0 after:-left-1 after:-right-1',
                className
            )}
            {...props}
        >
            {withHandle && (
                <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border">
                    <GripVertical className="size-2.5" />
                </div>
            )}
        </Separator>
    );
}

const ResizablePanel = Panel;

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
