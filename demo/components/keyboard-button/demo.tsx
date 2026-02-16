import { DemoBlock } from "@/components/demo-block";
import { KeyboardButton } from "@/components/keyboard-button";
import { SearchIcon } from "lucide-react";
import Link from "next/link";

function KeyboardButtonDemo() {
    return (
        <DemoBlock>
            <div className="flex items-center justify-center gap-4">
                <KeyboardButton>
                    Keyboard button
                </KeyboardButton>
                <KeyboardButton variant="icon">
                    <SearchIcon className="size-8" />
                </KeyboardButton>
                <KeyboardButton asChild>
                    <Link href="#" className="no-underline">I&apos;m actually a link</Link>
                </KeyboardButton>
            </div>
        </DemoBlock>
    )
}

export { KeyboardButtonDemo };