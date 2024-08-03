import React from 'react';
import { TypographyBase } from './Typography.styles';

export interface TypographyProps {
  children: React.ReactNode;
  size:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'b1'
    | 'b2'
    | 'b3'
    | 'p1'
    | 'p2'
    | 'button-b1'
    | 'button-b2'
    | 'button-b3'
    | 'input-b1'
    | 'input-b2'
    | 'blockquote-b1'
    | 'blockquote-b2'
    | 'blockquote-bold1'
    | 'blockquote-bold2'
    | 'ordered-list-p1'
    | 'ordered-list-b2'
    | 'unordered-list-p1'
    | 'unordered-list-b2';
  type?:
    | 'Heading'
    | 'Body'
    | 'Button'
    | 'Input'
    | 'Paragraph'
    | 'Blockquote'
    | 'OrderedList'
    | 'UnorderedList';
  color?: string;
  fontSize?: string;
  className?: string;
  dataTestId?: string;
}

const tagMappings: Record<string, string> = {
  // Headings
  h1: 'Heading-h1',
  h2: 'Heading-h2',
  h3: 'Heading-h3',
  h4: 'Heading-h4',
  h5: 'Heading-h5',
  // Body text
  b1: 'BodyText-b1',
  b2: 'BodyText-b2',
  b3: 'BodyText-b3',
  // Buttons
  'button-b1': 'Button-b1',
  'button-b2': 'Button-b2',
  'button-b3': 'Button-b3',
  // Inputs
  'input-b1': 'Input-b1',
  'input-b2': 'Input-b2',
  // Paragraphs
  p1: 'Paragraph-p1',
  p2: 'Paragraph-p2',
  // Blockquote
  'blockquote-b1': 'Blockquote-b1',
  'blockquote-b2': 'Blockquote-b2',
  'blockquote-bold1': 'Blockquote-bold1',
  'blockquote-bold2': 'Blockquote-bold2',
  // Ordered List
  'ordered-list-p1': 'OrderedList-p1',
  'ordered-list-b2': 'OrderedList-b2',
  // Unordered List
  'unordered-list-p1': 'UnorderedList-p1',
  'unordered-list-b2': 'UnorderedList-b2'
};

const Typography: React.FC<TypographyProps> = ({
  children,
  size = 'b1',
  className,
  dataTestId,
  color,
  fontSize
}) => {
  const tag = tagMappings[size];

  const renderContent = () => {
    switch (size) {
      case 'h1':
        return <h1 className={tag}>{children}</h1>;
      case 'h2':
        return <h2 className={tag}>{children}</h2>;
      case 'h3':
        return <h3 className={tag}>{children}</h3>;
      case 'h4':
        return <h4 className={tag}>{children}</h4>;
      case 'h5':
        return <h5 className={tag}>{children}</h5>;
      case 'b1':
        return <span className={tag}>{children}</span>;
      case 'b2':
        return <span className={tag}>{children}</span>;
      case 'b3':
        return <span className={tag}>{children}</span>;
      case 'button-b1':
        return <button className={tag}>{children}</button>;
      case 'button-b2':
        return <button className={tag}>{children}</button>;
      case 'button-b3':
        return <button className={tag}>{children}</button>;
      case 'input-b1':
        return <span className={tag}>{children}</span>;
      case 'input-b2':
        return <span className={tag}>{children}</span>;
      case 'p1':
        return <p className={tag}>{children}</p>;
      case 'p2':
        return <p className={tag}>{children}</p>;
      case 'blockquote-b1':
      case 'blockquote-b2':
      case 'blockquote-bold1':
      case 'blockquote-bold2':
        return <blockquote className={tag}>{children}</blockquote>;
      case 'ordered-list-p1':
      case 'ordered-list-b2':
      case 'unordered-list-p1':
      case 'unordered-list-b2':
        return children ? (
          <div className={tag} dangerouslySetInnerHTML={{ __html: children }} />
        ) : null;

      default:
        return null;
    }
  };

  return (
    <TypographyBase
      fontSize={fontSize}
      color={color}
      data-testid={dataTestId}
      className={className}
    >
      {renderContent()}
    </TypographyBase>
  );
};

export default Typography;
