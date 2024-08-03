import styled from '@emotion/styled';

export const SelfExclusionContainer = styled('div')({
  boxSizing: 'border-box',
  height: 'fit-content',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  background: 'var(--very-dark-violet-3)',
  borderRadius: '6px',
  padding: '16px 16px 16px 22px',
  gap: '16px',

  // DrawerComponent appears at 769px
  '@media screen and (min-width: 769px)': {
    padding: '16px',
    width: '514px',
    gap: '21px' // should be 16px but SectionDescription overlaps the height of SelfExclusionHeader
  }
});

export const SelfExclusionHeader = styled('div')({
  width: '100%',
  minHeight: '82px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',

  // DrawerComponent appears at 769px
  '@media screen and (min-width: 769px)': {
    gap: '8px'
  }
});
