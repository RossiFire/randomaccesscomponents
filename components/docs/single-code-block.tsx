import { MultiCodeBlock } from "@/demo";
import { MultiCodeBlockTab } from "./multi-code-block";

function SingleCodeBlock({ children, icon, label, lang }: { children: React.ReactNode, icon: React.ReactNode, label: string, lang: string }) {
    return (
        <MultiCodeBlock>
            <MultiCodeBlockTab value={label} label={label} icon={icon} lang={lang}>
                {children}
            </MultiCodeBlockTab>
        </MultiCodeBlock>
    );
}

export { SingleCodeBlock };