import { Meta, StoryObj } from '@storybook/react';
import { Description, Title, Subtitle, Canvas } from '@storybook/blocks';
import { themes } from '@storybook/theming';
import { assets } from '@/config/assets';
import Input from '@/components/Atoms/Input';

const meta: Meta<typeof Input> = {
  component: Input,
  title: 'Input',
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: 'Input Documentation',
    docs: {
      theme: themes.dark,
      page: () => (
        <>
          <Title />
          <Description>
            Input component is the component for taking text input from user.
          </Description>
          <Subtitle>Basic Usage</Subtitle>
          <Description>
            Currently, input component supports text, number and password types, which default is
            text.
          </Description>
          <Canvas />
        </>
      )
    }
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultInput: Story = {
  args: {
    value: 'Default Input'
  }
};

export const DefaultInputWithPlaceholder: Story = {
  args: {
    placeholder: 'This is a placeholder'
  }
};

export const InputWithLabel: Story = {
  args: {
    label: 'Label'
  }
};

export const InputWithIcon: Story = {
  args: {
    icon: `${assets}/images/placeholder-input.svg`
  }
};

export const TogglePasswordInput: Story = (args: any) => {
  return <Input {...args} type="password" />;
};

TogglePasswordInput.args = {
  placeholder: 'Enter your password'
};

TogglePasswordInput.storyName = 'Toggle Password Input';

export const ErrorInput: Story = {
  args: {
    value: 'Error Input',
    errorMsg: 'This is an error message',
    icon: `${assets}/images/placeholder-input.svg`
  }
};

export const ValidatedInput: Story = {
  args: {
    value: 'Validated Input',
    validated: true,
    icon: `${assets}/images/placeholder-input.svg`
  }
};
