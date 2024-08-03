import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import BaseButtonIcon, {
  BaseButtonIconProps
} from '@/components/Atoms/BaseButtonIcon/BaseButtonIcon';
import ButtonImagePlaceholder from '@/components/Atoms/ButtonImagePlaceholder';

const meta: Meta<typeof BaseButtonIcon> = {
  title: 'Base Button Icon',
  component: BaseButtonIcon,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Large: Story = (args: BaseButtonIconProps) => <BaseButtonIcon {...args} />;
Large.args = {
  size: 'Large',
  children: <ButtonImagePlaceholder />
};

export const Medium: Story = (args: BaseButtonIconProps) => <BaseButtonIcon {...args} />;
Medium.args = {
  size: 'Medium',
  children: <ButtonImagePlaceholder />
};

export const Small: Story = (args: BaseButtonIconProps) => <BaseButtonIcon {...args} />;
Small.args = {
  size: 'Small',
  children: <ButtonImagePlaceholder />
};
