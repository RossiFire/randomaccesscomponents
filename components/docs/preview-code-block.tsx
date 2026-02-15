import { Code, Eye } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../tabs";

/**
 * Tabbed preview + code block.
 *
 * @param preview - Live React component rendered in the "Preview" tab.
 * @param children - Code block (typically from MDX) rendered in the "Code" tab.
 */
export function PreviewCodeBlock({ preview, children }: { preview: React.ReactNode; children: React.ReactNode }) {
    return (
        <Tabs defaultValue="preview">
            <TabsList>
                <TabsTrigger value="preview">
                    <Eye />
                    Preview
                </TabsTrigger>
                <TabsTrigger value="code">
                    <Code />
                    Code
                </TabsTrigger>
            </TabsList>
            <TabsContent value="preview" className="p-0">
                {preview}
            </TabsContent>
            <TabsContent value="code">
                {children}
            </TabsContent>
        </Tabs>
    );
}
