import { Meta, StoryObj } from '@storybook/react';
import { Description, Title, Subtitle, Canvas } from '@storybook/blocks';
import { themes } from '@storybook/theming';
import Checkbox from '@/components/Atoms/Checkbox';

import '../../../public/assets/styles/globals.css';

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
  title: 'Checkbox',
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: 'Checkbox Documentation',
    docs: {
      theme: themes.dark,
      page: () => (
        <>
          <Title />
          <Description>
            Checkbox component is the component for taking an input type of checkbox.
          </Description>
          <Subtitle>Basic Usage</Subtitle>
          <Description>Currently, there is only the default checkbox provided</Description>
          <Canvas />
        </>
      )
    }
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultCheckbox: Story = {
  args: {
    label: 'This is checkbox label'
  }
};

export const CheckedState: Story = {
  args: {
    label: 'This is checkbox with checked state',
    checked: true
  }
};

export const CheckboxWithError: Story = {
  args: {
    label: 'I have read and accept rules',
    errorMsg: 'errorMessage'
  }
};
