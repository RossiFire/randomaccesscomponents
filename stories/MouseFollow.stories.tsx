import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import * as React from 'react';
import {
  MouseFollowContent,
  MouseFollowItem,
} from '@/demo/components/follow-mouse/mouse-follow';
import { Canvas } from '@react-three/fiber';
import { MouseModel } from '@/components/threed-mouse';

const EMOJIS = [
  '🤡', '🤔', '🤨', '🤓', '🤯', '🤠', '👹', '💀',
  '👺', '👻', '👽', '👾', '🤖', '🎃', '👿', '💩',
];

/**
 * A performant, customisable mouse-follow component built with React compound components.
 *
 * Wrap any element with `<MouseFollowContent>` and place a `<MouseFollowItem>` inside
 * to make content track the cursor. Supports `asChild` via Radix Slot, custom offsets,
 * and any renderable content — from labels to 3D models.
 *
 * ### Compound Components
 *
 * - `<MouseFollowContent>` — Tracking area (supports `asChild`)
 * - `<MouseFollowItem>` — Element that follows the cursor
 */
const meta = {
  title: 'Components/Mouse Follow',
  component: MouseFollowContent,
  parameters: {
    layout: 'centered',
    docs: {
      story: {
        inline: false,
        height: '300px',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    asChild: {
      control: 'boolean',
      description:
        'Merge props onto the child element instead of rendering a wrapper `<div>`',
      table: { defaultValue: { summary: 'false' } },
    },
  },
} satisfies Meta<typeof MouseFollowContent>;

export default meta;

type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Shared card shell used by every story
// ---------------------------------------------------------------------------

const CardShell = ({
  title,
  description,
  children,
  ...rest
}: {
  title: string;
  description: string;
  children?: React.ReactNode;
} & React.ComponentProps<'div'>) => (
  <div
    className="flex cursor-pointer flex-col w-72 gap-4 bg-gradient-to-br from-white to-neutral-100 border border-neutral-200 rounded-lg p-5 shadow-sm"
    {...rest}
  >
    <span className="text-base font-semibold text-neutral-900">{title}</span>
    <span className="text-sm text-neutral-500">{description}</span>
    {children}
  </div>
);

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

/**
 * Wraps a card with `MouseFollowContent` using `asChild`. A small label follows
 * the cursor while it is inside the card.
 */
export const Default: Story = {
  render: (args) => (
    <MouseFollowContent {...args}>
      <CardShell
        title="Projects"
        description="Hover this card to see the mouse follow effect"
      >
        <MouseFollowItem offsetX={50} offsetY={30}>
          Discover
        </MouseFollowItem>
      </CardShell>
    </MouseFollowContent>
  ),
};

/**
 * The follow item can contain **any** renderable content. Here a random emoji
 * is picked each time the cursor leaves the card — demonstrating dynamic,
 * stateful content inside `MouseFollowItem`.
 */
export const CustomDynamicContent: Story = {
  render: function Render(args) {
    const [emoji, setEmoji] = React.useState(
      () => EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
    );

    const cycleEmoji = () =>
      setEmoji(EMOJIS[Math.floor(Math.random() * EMOJIS.length)]);

    return (
      <MouseFollowContent {...args}>
        <CardShell
          title="Dynamic"
          description="Enter and leave the card — the emoji changes every time"
          onMouseLeave={cycleEmoji}
        >
          <MouseFollowItem offsetX={25} offsetY={25}>
            <span className="text-2xl select-none">{emoji}</span>
          </MouseFollowItem>
        </CardShell>
      </MouseFollowContent>
    );
  },
};

/**
 * A 3D model rendered inside a `<Canvas>` (react-three-fiber) that follows the
 * cursor.
 *
 * > **Tip:** If you're working with Model visibility, see the _Techbook_ section in the docs for why `opacity` is
 * > preferred over `scale-0` when embedding 3D content.
 */
export const With3DModel: Story = {
  render: (args) => (
    <MouseFollowContent {...args}>
      <CardShell
        title="3D Model"
        description="A rotating 3D mouse model follows the cursor"
      >
        <MouseFollowItem offsetX={10} offsetY={20}>
          <div className="size-20 rounded-full mx-auto overflow-hidden pointer-events-none touch-none">
            <Canvas
              style={{ pointerEvents: 'none' }}
              className="w-full h-full"
              gl={{
                alpha: true,
                antialias: true,
                preserveDrawingBuffer: false,
              }}
              camera={{
                position: [0, 0, 500],
                fov: 50,
                near: 1,
                far: 4000,
              }}
            >
              <React.Suspense fallback={null}>
                <ambientLight intensity={1.5} />
                <pointLight position={[5, 5, 5]} intensity={1} />
                <pointLight position={[-5, -5, -5]} intensity={0.5} />
                <MouseModel
                  position={[90, -80, 100]}
                  scale={0.2}
                  rotation={[-1.9, -0.6, -2.7]}
                />
              </React.Suspense>
            </Canvas>
          </div>
        </MouseFollowItem>
      </CardShell>
    </MouseFollowContent>
  ),
};
