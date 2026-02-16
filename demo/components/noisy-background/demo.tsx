"use client";
import { DemoBlock } from "@/components/demo-block";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import useNoisyBackgroundStore from "@/store/noisy-background-store";


const NoisyBackgroundDemo: React.FC = () => {

    const { updateData, active, isAnimationActive, opacity } = useNoisyBackgroundStore();


    return ( 
        <DemoBlock containerClassName="min-h-[400px] flex flex-col gap-4 items-center justify-center">
                <h1 className="text-center">Noisy Background</h1>
                <div className="flex gap-2">
                    <Button onClick={() => updateData({ active: !active })}>
                        Toggle Background: {active ? "On" : "Off"}
                    </Button>
                    <Button onClick={() => updateData({ isAnimationActive: !isAnimationActive })}>
                        Toggle Animation: {isAnimationActive ? "On" : "Off"}
                    </Button>
                </div>
                <div className="w-1/2 mx-auto min-w-[300px] mt-8 flex flex-col items-center justify-center gap-4">
                    <Slider
                        value={[opacity]}
                        onValueChange={(value) => updateData({ opacity: value[0] })}
                        min={0}
                        max={1}
                        step={0.01}
                    />
                    <span className="text-sm text-muted-foreground">Background opacity: <b>{opacity}</b></span>
                </div>
                <span className="text-sm text-muted-foreground italic mt-8">
                    *This properties are set just for demo purposes, the default component doesn't have these.
                </span>
        </DemoBlock>
    );
}
 
export { NoisyBackgroundDemo };