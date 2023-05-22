import type { Meta, StoryObj } from '@storybook/react';

import {LinkButton} from 'cjbsDSTM';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof LinkButton> = {
  title: 'Example/Button',
  component: LinkButton,
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' }
  },
};

export default meta;
type Story = StoryObj<typeof LinkButton>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Text: Story = {
  args: {
    // pathName: '',
    buttonName: 'Link',
  },
};

export const ContainedButton: Story = {
  args: {
    buttonName: 'Contained',
  },
};
