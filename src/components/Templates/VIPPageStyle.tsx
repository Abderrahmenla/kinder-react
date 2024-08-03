import { CSSProperties } from 'react';
import styled from '@emotion/styled';

export const VIPBodyStyle: CSSProperties = {
  maxHeight: '75vh',
  padding: '0'
};

export const ButtonContainer = styled('div')({
  '& a': {
    padding: '12px 0',
    width: '101px',
    color: 'var(--white)',
    fontSize: 'var(--font-size-14)',
    lineHeight: 'var(--l-height-15)',
    letterSpacing: 'var(--lt-spacing)',
    fontWeight: 400,
    textDecoration: 'none',
    transition: 'background 0.4s, color .4s',
    cursor: 'pointer',
    position: 'relative',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export const ModalTabContent = styled('div')`
  display: block;
  padding: 16px 12px;

  img {
    width: 100%;
    height: auto;
  }
`;

export const VIPMoreLinkRow = styled('div')`
  text-align: center;
  background: var(--very-dark-violet-200);
  border-top: solid 1px var(--very-dark-violet);
  padding: 12px 18px;
  display: flex;
  justify-content: center;

  a {
    line-height: 20px;
    text-decoration-color: var(--pure-blue);
    text-decoration-thickness: 2px;

    span {
      font-size: 14px;
      color: var(--pure-blue);
      font-weight: 500;
    }
  }
`;
export const VIPModalSection = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  '> div': {
    borderRadius: '0',
    overflow: 'hidden'
  },
  '@media screen and (max-width:600px)': {
    width: '100%',
    overflow: 'auto',
    justifyContent: 'flex-start',
    scrollbarWidth: 'thin'
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'var(--mod-blue-100)',
    borderRadius: '5px'
  },

  '&::-webkit-scrollbar': {
    height: '4px'
  },
  '&::-webkit-scrollbar-track': {
    background: 'var(--very-dark-violet-300)',
    margin: 0
  }
});

export const ModalWrapper = styled('div')<{ size?: string }>(({ size }) => ({
  width: size === 'md' ? '468px' : '420px',
  overflow: 'hidden',
  background: 'var(--very-dark-violet-200)',
  borderRadius: '15px',
  transition: 'all .4s ease',
  maxHeight: '82vh',
  overflowY: 'auto',
  position: 'relative',
  '@media(max-width: 600px)': {
    width: '100%',
    margin: 'auto 20px'
  }
}));
