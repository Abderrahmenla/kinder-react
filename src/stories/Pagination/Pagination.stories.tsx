import { Meta, StoryObj } from '@storybook/react';
import { Description, Title, Subtitle, Canvas } from '@storybook/blocks';
import Pagination from '@/components/Atoms/Pagination/Pagination';
import { themes } from '@storybook/theming';

const meta: Meta<typeof Pagination> = {
  component: Pagination,
  title: 'Pagination',
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: 'Pagination Documentation',
    controls: { expanded: true },
    docs: {
      theme: themes.dark,
      page: () => (
        <>
          <Title />
          <Description>
            Pagination component is the component that renders pagination in numbers.
          </Description>
          <Subtitle>Basic Usage</Subtitle>
          <Description>Takes in a number and callback function as arguments.</Description>
          <Canvas />
        </>
      )
    }
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const PaginationWithThreePages: Story = {
  args: {
    pages: 3,
    onClick: () => null
  }
};

export const PaginationWithFivePages: Story = {
  args: {
    pages: 5,
    onClick: () => null
  }
};
