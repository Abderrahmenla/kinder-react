import React from 'react';
import Switcher, { TabSwitcherProps } from '@/components/Atoms/Switcher/Switcher';
import { Meta, StoryObj } from '@storybook/react';
import { themes } from '@storybook/theming';
import SwitcherImagePlaceholder from '@/components/Atoms/SwitcherImagePlaceholder';

interface TabSwitcherPropsStorybook extends TabSwitcherProps {
  icon?: React.ReactNode;
}

const meta: Meta<typeof Switcher> = {
  component: Switcher,
  title: 'Switcher',
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
    componentSubtitle: 'Switcher Documentation',
    docs: {
      theme: themes.dark,
      description: {
        component:
          '<p>The <b>Switcher</b> component is a versatile tool for creating toggle switches with various options.<br><br><b>Usage Guidelines</b></p><ul><li><b>options:</b> Use this prop to set the text option for the switcher</li><li><b>icons:</b> To add an SVG icons to the options, provide the source of the SVG path component using this prop</li><li><b>handleToggle:</b> You can provide a callback function to handle the toggle action. It receives a boolean argument representing the current state of the toggle switch. You may use it to customize the behavior when the switcher is toggled.</li></ul>'
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const SwitcherBasic: Story = (args: TabSwitcherProps) => (
  <Switcher {...args} tabSwitcherStyles={{ height: '50px' }} />
);
SwitcherBasic.args = {
  options: [{ title: 'Option 1' }, { title: 'Option 2' }, { title: 'Option 3' }],
  handleToggle: (index) => alert(`Option ${index + 1} Selected`)
};

export const SwitcherBasicWithIcon: Story = (args: TabSwitcherPropsStorybook) => (
  <Switcher {...args} tabSwitcherStyles={{ height: '50px' }} />
);
SwitcherBasicWithIcon.args = {
  options: [{ title: 'Option 1' }, { title: 'Option 2' }, { title: 'Option 3' }],
  handleToggle: (index) => alert(`Selected Choice ${index + 1}`),
  icons: [
    <SwitcherImagePlaceholder key="icon1" />,
    <SwitcherImagePlaceholder key="icon2" />,
    <SwitcherImagePlaceholder key="icon3" />
  ]
};
