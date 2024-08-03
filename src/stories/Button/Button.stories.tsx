import React from 'react';
import Button, { ButtonProps } from '@/components/Atoms/Button/Button';
import { Meta, StoryObj } from '@storybook/react';
import ButtonImagePlaceholder from '@/components/Atoms/ButtonImagePlaceholder';
const meta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true }
  }
};
export default meta;
type Story = StoryObj<typeof meta>;
export const Primary: Story = (args: ButtonProps) => <Button {...args} />;
Primary.args = {
  children: 'Primary Button',
  variant: 'Primary',
  handleClick: () => alert('Button Clicked'),
  imageOnly: false,
  icon: <ButtonImagePlaceholder />
};
export const Secondary: Story = (args: ButtonProps) => <Button {...args} />;
Secondary.args = {
  children: 'Secondary Button',
  variant: 'Secondary',
  size: 'Medium',
  handleClick: () => alert('Button Clicked')
};
export const Tertiary: Story = (args: ButtonProps) => <Button {...args} />;
Tertiary.args = {
  children: 'Text Button',
  variant: 'Text',
  size: 'Large',
  handleClick: () => alert('Button Clicked'),
  showIcon: false
};
