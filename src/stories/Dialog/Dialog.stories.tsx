import { Meta, StoryObj } from '@storybook/react';
import { Description, Title, Subtitle, Canvas } from '@storybook/blocks';
import { themes } from '@storybook/theming';
import { Dialog } from '@/components/Atoms/Dialog/Dialog';
import { assets } from '@/config/assets';
import Image from 'next/image';
import { DialogFooterContent } from './DialogStory.styles';

const meta: Meta<typeof Dialog> = {
  component: Dialog,
  title: 'Dialog',
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: 'Dialog Documentation',
    docs: {
      theme: themes.dark,
      page: () => (
        <>
          <Title>Dialog</Title>
          <Description>Dialog component is used for showing app dialogs.</Description>
          <Subtitle>Basic Usage</Subtitle>
          <Description>
            This Dialog component supports different content types and can be styled accordingly.
          </Description>
          <Canvas />
        </>
      )
    }
  }
};

const headerContent = () => {
  return (
    <>
      <Image
        src={`${assets}/images/placeholder-input.svg`}
        alt="placeholder"
        width={16}
        height={16}
      />
      <span>Headline</span>
    </>
  );
};
const bodyContent = () => <span>Unleashing Innovation: Transforming Ideas into Impact.</span>;
const footerContent = () => (
  <DialogFooterContent>
    <Image
      src={`${assets}/images/information_icon.svg`}
      alt="information-icon"
      width={20}
      height={20}
    />
    <span>Show more information about our Bonus Program...</span>
  </DialogFooterContent>
);

export default meta;

type DialogStory = StoryObj<typeof Dialog>;

export const DefaultDialog: DialogStory = {
  args: {
    headerContent: () => headerContent(),
    bodyContent: () => bodyContent(),
    onClose: () => alert('Dialog closed'),
    open: true,
    headerDivider: true,
    maxWidth: 475
  }
};

export const DialogWithoutDivider: DialogStory = {
  args: {
    headerContent: () => headerContent(),
    bodyContent: () => bodyContent(),
    onClose: () => alert('Dialog closed'),
    open: true
  }
};

export const DialogWithoutHeader: DialogStory = {
  args: {
    bodyContent: () => bodyContent(),
    onClose: () => alert('Dialog closed'),
    open: true
  }
};

export const DialogWithFooter: DialogStory = {
  args: {
    headerContent: () => headerContent(),
    bodyContent: () => bodyContent(),
    footerContent: () => footerContent(),
    onClose: () => alert('Dialog closed'),
    open: true,
    headerDivider: true
  }
};
