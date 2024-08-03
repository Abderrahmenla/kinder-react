import { Meta, StoryObj } from '@storybook/react';
import { Description, Title, Subtitle, Canvas } from '@storybook/blocks';
import Tabs from '@/components/Atoms/Tabs/Tabs';

const meta: Meta<typeof Tabs> = {
  component: Tabs,
  title: 'Tabs',
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: 'Tabs Documentation',
    controls: { expanded: true },
    docs: {
      page: () => (
        <>
          <Title />
          <Description>Tabs component is the component to render tab buttons.</Description>
          <Subtitle>Basic Usage</Subtitle>
          <Description>
            Takes in an array of object, a callback function, and a customize styling for the
            buttons as arguments.
          </Description>
          <Canvas />
        </>
      )
    }
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const TabWithTwoButtons: Story = {
  args: {
    tabOptions: [
      {
        label: 'Tab 1',
        isActive: true,
        name: 'tab_1'
      },
      {
        label: 'Tab 2',
        isActive: false,
        name: 'tab_2'
      }
    ],
    tabOnclickHandler: (tabName: string) => alert(`${tabName} Clicked`)
  }
};

export const TabWithThreeButtons: Story = {
  args: {
    tabOptions: [
      {
        label: 'Tab 1',
        isActive: true,
        name: 'tab_1'
      },
      {
        label: 'Tab 2',
        isActive: false,
        name: 'tab_2'
      },
      {
        label: 'Tab 3',
        isActive: false,
        name: 'tab_2'
      }
    ],
    tabOnclickHandler: (tabName: string) => alert(`${tabName} Clicked`)
  }
};
