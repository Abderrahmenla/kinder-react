import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Typography, { TypographyProps } from '@/components/Atoms/Typography/Typography';

const meta: Meta<typeof Typography> = {
  title: 'Typography',
  component: Typography,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        component:
          '<p>The Typography component is a versatile text rendering tool that provides full control over text appearance. It enables the creation of various text styles, such as Headings, Body Text, and Paragraphs, allowing customization to meet specific design needs.<br/><br/><b>Usage Guidelines</b></p><h5>Headings:</h5> <ul> <li>To create headings, choose the "type" control and select "Heading."</li> <li>Further customize your Headings by specifying the appropriate size, ranging from h1 to h5.</li> </ul> <h5>Body Text:</h5> <ul> <li>For body text size select either b1 which will be used for default sizing or b2 for a smaller size.</li> <li>b1 is to be used as default, to change size to b2 include the size props</li> </ul> <h5>Paragraphs:</h5> <ul> <li>To craft well-structured paragraphs, set the "type" to "Paragraph."</li> <li>Tailor the paragraphs text size by opting for p1 or p2 as needed.</li> </ul><h5>Blockquotes:</h5><ul><li>To use Blockquotes, use type="Blockquote" and the "size" prop with values like "blockquote-b1" , "blockquote-b2" ,"blockquote-bold1" or "blockquote-bold2" to apply blockquote styles.</li></ul>' +
          '<h5>Ordered Lists:</h5><ul><li>For ordered lists, use type="OrderedList" and the "size" prop with values like "ordered-list-p1" or "ordered-list-b2" to apply list styles.</li></ul>' +
          '<h5>Unordered Lists:</h5><ul><li>For unordered lists, use type="UnorderedList" and the "size" prop with values like "unordered-list-p1" or "unordered-list-b2" to apply list styles.</li></ul>'
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Heading: Story = (args: TypographyProps) => <Typography {...args} />;

Heading.args = {
  children: 'Lorem ipsum dolor sit',
  type: 'Heading',
  size: 'h1'
};

export const BodyText: Story = (args: TypographyProps) => <Typography {...args} />;
BodyText.args = {
  children: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque',
  type: 'Body',
  size: 'b1'
};

export const Paragraph: Story = (args: TypographyProps) => <Typography {...args} />;

Paragraph.args = {
  children:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  type: 'Paragraph',
  size: 'p1'
};

export const Blockquote: Story = (args: TypographyProps) => <Typography {...args} />;
Blockquote.args = {
  children:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  type: 'Blockquote',
  size: 'blockquote-b1'
};

export const OrderedList: Story = (args: TypographyProps) => <Typography {...args} />;
OrderedList.args = {
  children: '<ol><li>List item 1</li><li>List item 2</li><li>List item 3</li></ol>',
  type: 'OrderedList',
  size: 'ordered-list-p1'
};

export const UnorderedList: Story = (args: TypographyProps) => <Typography {...args} />;
UnorderedList.args = {
  children: '<ul><li>List item A</li><li>List item B</li><li>List item C</li></ul>',
  type: 'UnorderedList',
  size: 'unordered-list-p1'
};
