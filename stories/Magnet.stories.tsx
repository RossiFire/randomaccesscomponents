import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Magnet from '@/demo/components/magnet/magnet';

/**
 * A wrapper component that adds a magnetic attraction effect to its children,
 * powered by Framer Motion springs.
 *
 * Hover over the element and the content will follow the cursor with a spring
 * animation. Supports adjustable strength via `magnetMultiplier` and can be
 * toggled on/off with `isActive`.
 */
const meta = {
  title: 'Components/Magnet',
  component: Magnet,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: { table: { disable: true } },
    magnetMultiplier: {
      control: { type: 'number', min: 0, max: 5, step: 0.1 },
      description: 'Multiplier for the magnetic pull strength',
      table: { defaultValue: { summary: '1' } },
    },
    isActive: {
      control: 'boolean',
      description: 'Toggle the magnetic effect on or off',
      table: { defaultValue: { summary: 'true' } },
    },
  },
} satisfies Meta<typeof Magnet>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * A card with a magnetic hover effect. Move the cursor over the card
 * and it will follow with a spring animation.
 */
export const Default: Story = {
  args: {
    isActive: true,
    magnetMultiplier: 1,
    children: (
      <div className="flex flex-col gap-3 w-64 rounded-lg border border-neutral-200 bg-gradient-to-br from-white to-neutral-100 p-5 shadow-sm cursor-pointer select-none">
        <span className="text-base font-semibold text-black">
          Magnetic Card
        </span>
        <span className="text-sm text-neutral-600">
          Hover me — I follow your cursor
        </span>
      </div>
    ),
  },
};
