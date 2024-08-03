import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { CustomToast, CustomToastProps } from '@/components/Atoms/CustomToast/CustomToast';
const meta: Meta<typeof CustomToast> = {
  title: 'CustomToast',
  component: CustomToast,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true }
  }
};
export default meta;
type Story = StoryObj<typeof meta>;
export const SuccessToastMessage: Story = (args: CustomToastProps) => <CustomToast {...args} />;
SuccessToastMessage.args = {
  type: 'success',
  message: 'Login Successful',
  persist: true
};
export const ErrorToastMessage: Story = (args: CustomToastProps) => <CustomToast {...args} />;
ErrorToastMessage.args = {
  type: 'error',
  message: 'Invalid Code!',
  persist: true
};
export const WarningToastMessage: Story = (args: CustomToastProps) => <CustomToast {...args} />;
WarningToastMessage.args = {
  type: 'warning',
  message: 'Warning!',
  persist: true
};
