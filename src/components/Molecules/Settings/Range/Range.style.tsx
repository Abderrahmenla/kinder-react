import styled from '@emotion/styled';

export const RangeContainer = styled('div')<{ isActive: boolean; customDefaultBg?: string }>(
  ({ isActive, customDefaultBg }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all .4s',
    cursor: 'pointer',
    borderRadius: '6px',
    background: isActive
      ? 'linear-gradient(270deg, var(--pure-blue) 0%, var(--bluish-violet) 100%)'
      : customDefaultBg ?? 'initial',
    height: '100%',
    width: '100%',

    '& span': {
      lineHeight: 'var(--l-height-16)',
      letterSpacing: 'initial',
      fontWeight: '500',
      textDecoration: 'none'
    }
  })
);
