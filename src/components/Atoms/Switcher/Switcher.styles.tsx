import styled from '@emotion/styled';

export const TabSwitcher = styled('div')<{ toggle?: boolean; isVertical?: boolean }>(
  ({ isVertical }) => ({
    borderRadius: '58px',
    position: 'relative',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: isVertical ? 'column' : 'row',
    padding: '4px',
    background: 'var(--very-dark-violet-5)'
  })
);

export const TabButton = styled('div')<{ isActive: boolean; isText?: boolean }>(
  ({ isActive, isText }) => ({
    color: '#fff',
    padding: '6px 0',
    textDecoration: 'none',
    cursor: 'pointer',
    textAlign: 'center',
    display: 'flex',
    height: '36px',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 'auto',
    borderRadius: '58px',
    background: isActive
      ? 'linear-gradient(270deg, #0092FF 0%, #9746FF 100%)'
      : 'var(--very-dark-violet-5)',
    transition: 'gradient-anim 15s ease',

    '& svg': {
      fill: 'var(--soft-blue-100)',
      marginRight: isText ? '10px' : '0px'
    },
    '&.activated': {
      '& svg': {
        fill: 'var(--darker-white)'
      },
      '&:hover': {
        background: 'linear-gradient(270deg, #0092FF 0%, #9746FF 100%)'
      }
    },
    '&:hover': {
      background: 'var(--dark-violet)',
      '& svg': {
        fill: 'var(--darker-white)'
      }
    },
    '&::before': {
      content: `''`,
      visibility: isActive ? 'visible' : 'hidden',
      opacity: isActive ? '1' : '0',
      background: 'linear-gradient(270deg, #0092FF 0%, #9746FF 100%)',
      transition: 'visibility 0.5s, opacity 0.5s linear',
      borderRadius: '58px',
      height: '100%',
      position: 'absolute',
      zIndex: '0'
    }
  })
);

export const ButtonTypography = styled.div`
  color: var(--white);
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  font-size: var(--font-size-14);
  letter-spacing: 0.42px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
