import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import * as React from 'react';
import {
  Markee,
  MarkeeContent,
  MarkeeFade,
  MarkeeItem,
  MarkeeSpacer,
} from '@/components/markee';

const SAMPLE_ITEMS = [
  'React',
  'Next.js',
  'TypeScript',
  'Tailwind CSS',
  'Storybook',
  'Vite',
];

/**
 * A performant, accessible marquee component built with React compound components.
 *
 * Features customizable animation speed, easing options, pause on hover,
 * directional control, and optional fade effects. Fully responsive and WCAG compliant.
 *
 * ### Component Reference
 *
 * - `<Markee>` — Root container
 * - `<MarkeeContent>` — Scrolling wrapper with controls
 * - `<MarkeeItem>` — Individual item
 * - `<MarkeeSpacer>` — Spacer or custom divider between items
 * - `<MarkeeFade>` — Gradient fade overlay on left/right edges
 */
const meta = {
  title: 'Components/Markee',
  component: MarkeeContent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'inline-radio',
      options: ['left', 'right'],
      description: 'Direction of the scrolling animation',
      table: { defaultValue: { summary: 'left' } },
    },
    duration: {
      control: { type: 'number', min: 1, max: 60 },
      description: 'Animation duration in seconds. Higher = slower',
      table: { defaultValue: { summary: '10' } },
    },
    pauseOnHover: {
      control: 'boolean',
      description: 'Pause animation when the marquee is hovered',
      table: { defaultValue: { summary: 'false' } },
    },
    paused: {
      control: 'boolean',
      description: 'Whether the animation is paused',
      table: { defaultValue: { summary: 'false' } },
    },
    ease: {
      control: 'select',
      options: ['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out'],
      description: 'CSS animation timing function',
      table: { defaultValue: { summary: 'linear' } },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '600px', width: '100%' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MarkeeContent>;

export default meta;

type Story = StoryObj<typeof meta>;

const renderItems = () =>
  <>
    <MarkeeItem className="text-sm font-medium whitespace-nowrap">
      React
    </MarkeeItem>
    <MarkeeSpacer />
    <MarkeeItem className="text-sm font-medium whitespace-nowrap">
      Next.js
    </MarkeeItem>
    <MarkeeSpacer />
    <MarkeeItem className="text-sm font-medium whitespace-nowrap">
      TypeScript
    </MarkeeItem>
    <MarkeeSpacer />
    <MarkeeItem className="text-sm font-medium whitespace-nowrap">
      Tailwind CSS
    </MarkeeItem>
    <MarkeeSpacer />
    <MarkeeItem className="text-sm font-medium whitespace-nowrap">
      Storybook
    </MarkeeItem>
    <MarkeeSpacer />
    <MarkeeItem className="text-sm font-medium whitespace-nowrap">
      Vite
    </MarkeeItem>
  </>

/**
 * The default marquee scrolling left with fade effects on both edges.
 * Use the controls panel to experiment with duration, easing, direction, and pause behavior.
 */
export const Default: Story = {
  args: {
    duration: 10,
    direction: 'left',
    ease: 'linear',
    pauseOnHover: false,
    paused: false,
  },
  render: (args) => (
    <Markee className="w-full">
      <MarkeeContent {...args}>
        {renderItems()}
      </MarkeeContent>
    </Markee>
  ),
};


/**
 * `MarkeeSpacer` accepts children, allowing custom dividers or icons between items.
 */
export const CustomSpacerContent: Story = {
  args: {
    duration: 12,
  },
  render: (args) => (
    <Markee className="w-full items-center">
      <MarkeeContent {...args}>
        {SAMPLE_ITEMS.map((item, i) => (
          <React.Fragment key={i}>
            <MarkeeItem className="text-sm font-medium whitespace-nowrap">
              {item}
            </MarkeeItem>
            <MarkeeSpacer className="px-4 flex justify-center">
              ✦
            </MarkeeSpacer>
          </React.Fragment>
        ))}
      </MarkeeContent>
    </Markee>
  ),
};

/**
 * `MarkeeFade` lets you add customizable fade effects on the edges of the marquee.
 */
export const WithFadeEffects: Story = {
  args: {
    duration: 12,
  },
  render: (args) => (
    <Markee className="w-full">
      <MarkeeFade position="left" className='from-white' />
      <MarkeeContent {...args}>{renderItems()}</MarkeeContent>
      <MarkeeFade position="right" className='from-white ' />
    </Markee>
  ),
};

const BADGE_IMAGES = [
  { src: '/assets/badges/react_logo.png', alt: 'React' },
  { src: '/assets/badges/nextjs_logo.png', alt: 'Next.js' },
  { src: '/assets/badges/typescript_logo.png', alt: 'TypeScript' },
  { src: '/assets/badges/tailwind_logo.png', alt: 'Tailwind CSS' },
  { src: '/assets/badges/gsap_logo.png', alt: 'GSAP' },
  { src: '/assets/badges/css_logo.png', alt: 'CSS' },
];

/**
 * Marquee with icons, useful for showcasing technologies or sponsors.
 */
export const WithIcons: Story = {
  args: {
    duration: 12,
  },
  render: (args) => (
    <Markee className="w-full">
      <MarkeeFade position="left" className="from-white" />
      <MarkeeContent {...args}>
        {BADGE_IMAGES.map((badge, i) => (
          <React.Fragment key={i}>
            <MarkeeItem className="flex items-center gap-2 whitespace-nowrap">
              <img
                src={badge.src}
                alt={badge.alt}
                className="size-8 object-contain"
                loading="lazy"
              />
            </MarkeeItem>
            <MarkeeSpacer className='w-8' />
          </React.Fragment>
        ))}
      </MarkeeContent>
      <MarkeeFade position="right" className="from-white" />
    </Markee>
  ),
};
