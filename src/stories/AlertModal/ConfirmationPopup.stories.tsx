import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import ConfirmationPopup, {
  ConfirmationPopupButtonProps,
  ConfirmationPopupProps
} from '@/components/Atoms/ConfirmationPopup/ConfirmationPopup';
import { css } from '@emotion/react';
const meta: Meta<typeof ConfirmationPopup> = {
  title: 'ConfirmationPopup',
  component: ConfirmationPopup,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true }
  }
};
export default meta;
type Story = StoryObj<typeof meta>;

const cancelButtonStyle = css`
  background: #4f397d !important;
  border: none !important;

  &:hover {
    background: #8e6cff !important;
  }
`;

const sampleButtons: ConfirmationPopupButtonProps[] = [
  {
    label: 'Cancel',
    callback: () => null,
    buttonStyle: cancelButtonStyle,
    buttonVariant: 'Secondary'
  },
  {
    label: 'Confirm',
    callback: () => null,
    buttonVariant: 'Primary'
  }
];

export const WarningPopup: Story = (args: ConfirmationPopupProps) => (
  <ConfirmationPopup {...args} />
);
WarningPopup.args = {
  type: 'warning',
  title: 'Are you sure?',
  subtitle:
    'This action is irreversible. Once it is done, you will not be able to login for the specified duration',
  buttons: sampleButtons
};

export const SuccessPopup: Story = (args: ConfirmationPopupProps) => (
  <ConfirmationPopup {...args} />
);
SuccessPopup.args = {
  type: 'success',
  title: 'Successful',
  subtitle:
    'This action is irreversible. Once it is done, you will not be able to login for the specified duration',
  buttons: sampleButtons
};

export const ErrorPopup: Story = (args: ConfirmationPopupProps) => <ConfirmationPopup {...args} />;
ErrorPopup.args = {
  type: 'error',
  title: 'Error Message',
  subtitle:
    'This action is irreversible. Once it is done, you will not be able to login for the specified duration',
  buttons: sampleButtons
};
