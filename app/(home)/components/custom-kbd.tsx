"use client";

import { SnipeButton } from "@/components/snipe-button";
import { useOs } from "@/hooks/use-os";
import { cn } from "@/lib/utils";

interface CustomKbdProps {
    className?: string;
}
 
const CustomKbd: React.FC<CustomKbdProps> = ({ className }) => {


    const simulate = () => {
        const isMac = /Mac|iPod|iPhone|iPad/i.test(navigator.platform);
    
        const keyboardEvent = new KeyboardEvent('keydown', {
          key: 'k',
          code: 'KeyK',
          bubbles: true,
          cancelable: true,
          metaKey: isMac,
          ctrlKey: !isMac,
        });
    
        document.dispatchEvent(keyboardEvent);
      };

    const os = useOs();

    return (
        <SnipeButton 
        className={cn("text-primary border-muted-foreground/50 mb-2 bg-background min-h-0 flex items-center p-1 h-fit rounded-sm border text-xs md:px-2 font-sans font-medium", 
        )}
        onClick={simulate}
        >
            <div>{os === "macos" ? "⌘K" : "Ctrl + K"}</div>
        </SnipeButton>
    );
}
 
export default CustomKbd;