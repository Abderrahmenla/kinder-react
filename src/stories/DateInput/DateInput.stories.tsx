import { Meta, StoryObj } from '@storybook/react';
import { Description, Title, Subtitle, Canvas } from '@storybook/blocks';
import { themes } from '@storybook/theming';
import DateInput from '@/components/Atoms/DateInput';

import '../../../public/assets/styles/globals.css';

const meta: Meta<typeof DateInput> = {
  component: DateInput,
  title: 'Date Input',
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: 'Date Input Documentation',
    docs: {
      theme: themes.dark,
      page: () => (
        <>
          <Title />
          <Description>
            DateInput component is the component for taking date input from user.
          </Description>
          <Subtitle>Basic Usage</Subtitle>
          <Description>
            Currently, date input component supports the default date picker
          </Description>
          <Canvas />
        </>
      )
    }
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultDateInput: Story = {
  args: {
    label: 'Date of Birth'
  }
};

export const DateInputWithError: Story = {
  args: {
    label: 'Date of Birth',
    errorMsg: 'This is an invalid date'
  }
};
