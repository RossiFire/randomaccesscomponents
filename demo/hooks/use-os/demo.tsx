"use client";
import { DemoBlock } from "@/components/demo-block";
import { useOs } from "@/hooks/use-os";

const UseOsDemo: React.FC = () => {

    const os = useOs();
    return ( 
        <DemoBlock>
        <div className="text-center space-y-4">
          <div className="text-sm text-muted-foreground">
            Current OS
          </div>
          <p className="text-lg font-semibold text-foreground">
            {os}
          </p>
          <p className="text-sm text-muted-foreground mt-8">
            Open on other operating systems to see different values
          </p>
        </div>
      </DemoBlock>
     );
}
 
export { UseOsDemo };