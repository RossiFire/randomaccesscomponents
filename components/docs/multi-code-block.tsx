import {
    Children,
    isValidElement,
    type ReactElement,
    type ReactNode,
} from 'react';
import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '../tabs';
import { type CodeBlockProps } from '../codeblock';

export interface MultiCodeBlockItem {
    /**
     * Unique tab value.
     */
    value: string;
    /**
     * Visible tab label.
     * Falls back to `value` when not provided.
     */
    label?: string;
    /**
     * Optional icon shown near tab label.
     */
    icon?: ReactNode;
    /**
     * Code language for syntax highlighting.
     */
    lang: string;
    /**
     * Raw code string.
     */
    code: string;
    /**
     * Extra props forwarded to the underlying CodeBlock.
     */
    codeblock?: CodeBlockProps;
}

interface MultiCodeBlockProps {
    blocks?: MultiCodeBlockItem[];
    groupId?: string;
    defaultValue?: string;
    children?: ReactNode;
}

interface MultiCodeBlockTabProps extends Omit<MultiCodeBlockItem, 'code'> {
    children: ReactNode;
}

function MultiCodeBlockTab(_props: MultiCodeBlockTabProps) {
    return null;
}

MultiCodeBlockTab.displayName = 'MultiCodeBlock.Tab';

type MultiCodeBlockComponent = ((props: MultiCodeBlockProps) => ReactElement | null) & {
    Tab: typeof MultiCodeBlockTab;
};

function MultiCodeBlock({
    blocks,
    groupId,
    defaultValue,
    children,
}: MultiCodeBlockProps) {
    const resolvedBlocks = blocks ?? resolveBlocksFromChildren(children);

    if (resolvedBlocks.length === 0) {
        return null;
    }

    return (
        <Tabs groupId={groupId} defaultValue={defaultValue ?? resolvedBlocks[0]?.value}>
            <TabsList>
                {resolvedBlocks.map((block) => (
                    <TabsTrigger value={block.value} key={block.value}>
                        {block.icon}
                        {block.label ?? block.value}
                    </TabsTrigger>
                ))}
            </TabsList>
            {resolvedBlocks.map((block) => (
                <TabsContent value={block.value} key={block.value}>
                    <DynamicCodeBlock
                        lang={block.lang}
                        code={block.code}
                        codeblock={block.codeblock}
                    />
                </TabsContent>
            ))}
        </Tabs>
    );
}

function resolveBlocksFromChildren(children: ReactNode): MultiCodeBlockItem[] {
    return Children.toArray(children)
        .filter((child): child is ReactElement<MultiCodeBlockTabProps> => {
            return isValidElement(child) && child.type === MultiCodeBlockTab;
        })
        .map((child) => ({
            value: child.props.value,
            label: child.props.label,
            icon: child.props.icon,
            lang: child.props.lang,
            code: getTextFromNode(child.props.children),
            codeblock: child.props.codeblock,
        }));
}

function getTextFromNode(node: ReactNode): string {
    if (typeof node === 'string' || typeof node === 'number') {
        return String(node);
    }

    if (Array.isArray(node)) {
        return node.map((entry) => getTextFromNode(entry)).join('');
    }

    if (isValidElement<{ children?: ReactNode }>(node)) {
        return getTextFromNode(node.props.children);
    }

    return '';
}

const CompoundMultiCodeBlock = MultiCodeBlock as MultiCodeBlockComponent;
CompoundMultiCodeBlock.Tab = MultiCodeBlockTab;

export { MultiCodeBlockTab };
export default CompoundMultiCodeBlock;
