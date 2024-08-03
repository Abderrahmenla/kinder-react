import styled from '@emotion/styled';

export const TypographyBase = styled.div<{ color?: string; fontSize?: string }>`
  color: ${({ color }) => color || 'var(--very-dark-des-violet)'};
  font-family: Inter;

  .Heading-h1 {
    font-size: ${({ fontSize }) => fontSize || '3rem'}; // 48px
    font-weight: 600;
  }

  .Heading-h2 {
    font-size: ${({ fontSize }) => fontSize || '2rem'}; // 32px
    font-weight: 600;
  }

  .Heading-h3 {
    font-size: ${({ fontSize }) => fontSize || '1.5rem'}; // 24px
    font-weight: 600;
  }

  .Heading-h4 {
    font-size: ${({ fontSize }) => fontSize || '1rem'}; // 16px
    font-weight: 600;
  }

  .Heading-h5 {
    font-size: ${({ fontSize }) => fontSize || '0.875rem'}; // 14px
    font-weight: 600;
    margin: 0;
  }

  .BodyText-b1 {
    font-size: ${({ fontSize }) => fontSize || '1rem'}; // 16px
  }

  .BodyText-b2 {
    font-size: ${({ fontSize }) => fontSize || '0.875rem'}; // 14px
  }

  .BodyText-b3 {
    font-size: ${({ fontSize }) => fontSize || '0.75rem'}; // 12px
  }

  .Button-b1 {
    font-size: ${({ fontSize }) => fontSize || '0.875rem'}; // 14px
  }

  .Button-b2 {
    font-size: ${({ fontSize }) => fontSize || '0.75rem'}; // 12px
  }

  .Button-b3 {
    font-size: ${({ fontSize }) => fontSize || '.625rem'}; // 10px
  }

  .Input-b1 {
    font-size: ${({ fontSize }) => fontSize || '0.875rem'}; // 14px
  }

  .Input-b2 {
    font-size: ${({ fontSize }) => fontSize || '0.75rem'}; // 12px
  }

  .Paragraph-p1 {
    font-size: ${({ fontSize }) => fontSize || '0.875rem'}; // 14px
  }

  .Paragraph-p2 {
    font-size: ${({ fontSize }) => fontSize || '0.75rem'}; // 12px
  }

  .Blockquote-b1 {
    font-size: ${({ fontSize }) => fontSize || '0.875rem'}; // 14px
    font-style: italic;
    font-weight: 300;
    line-height: normal;
  }

  .Blockquote-b2 {
    font-size: ${({ fontSize }) => fontSize || '1rem'}; //16px
    font-style: italic;
    font-weight: 300;
    line-height: normal;
  }

  .Blockquote-bold1 {
    font-size: ${({ fontSize }) => fontSize || '0.875rem'}; // 14px
    font-style: italic;
    font-weight: 500;
    line-height: normal;
  }

  .Blockquote-bold2 {
    font-size: ${({ fontSize }) => fontSize || '1rem'}; //16px
    font-style: italic;
    font-weight: 500;
    line-height: normal;
  }

  .OrderedList-p1 ol {
    font-size: ${({ fontSize }) => fontSize || '0.875rem'}; // 14px
    font-style: normal;
    font-weight: 300;
    line-height: normal;
    list-style: decimal;
  }

  .OrderedList-b2 ol {
    font-size: ${({ fontSize }) => fontSize || '0.875rem'}; // 14px
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    list-style: decimal;
  }

  .UnorderedList-p1 ul {
    font-size: ${({ fontSize }) => fontSize || '0.875rem'}; // 14px
    font-style: normal;
    font-weight: 300;
    line-height: normal;
    list-style: disc;
  }

  .UnorderedList-b2 ul {
    font-size: ${({ fontSize }) => fontSize || '0.875rem'}; // 14px
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    list-style: disc;
  }
`;
