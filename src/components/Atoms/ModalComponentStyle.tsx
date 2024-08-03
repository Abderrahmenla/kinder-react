import { styled } from '@mui/material/styles';
import { useEffect } from 'react';

export interface ModalContainerProps {
  open: boolean;
  notCentered?: boolean;
  isMobile?: boolean;
  isGameModal?: boolean;
}

export const ModalContainer = styled('div')<ModalContainerProps>(
  ({ open, notCentered, isMobile, isGameModal }) => {
    useEffect(() => {
      if (open) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
      return () => {
        document.body.style.overflow = '';
      };
    }, [open]);

    return {
      display: open ? 'flex' : 'none',
      opacity: open ? 1 : 0,
      justifyContent: 'center',
      alignItems: notCentered ? 'flex-start' : 'center',
      position: 'fixed',
      width: '100%',
      height: '100%',
      top: isMobile ? -2 : 0,
      left: 0,
      right: 0,
      bottom: 0,
      margin: 0,
      overflow: 'none',
      transition: 'all .4s ease',
      zIndex: isGameModal ? (open ? 999 : -1) : open ? 1003 : -1,
      padding: '1vw',
      '.wallet-modal-section': {
        '@media screen and (max-width: 768px)': {
          paddingLeft: 0,
          paddingRight: 0
        }
      }
    };
  }
);

export const ModalContainerSearch = styled('div')<ModalContainerProps>(
  ({ open, notCentered, isMobile }) => {
    useEffect(() => {
      if (open) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
      return () => {
        document.body.style.overflow = '';
      };
    }, [open]);

    return {
      display: open ? 'flex' : 'none',
      opacity: open ? 1 : 0,
      justifyContent: 'center',
      alignItems: notCentered ? 'flex-start' : 'center',
      position: 'fixed',
      width: '100%',
      height: '100%',
      top: isMobile ? -2 : 0,
      left: 0,
      right: 0,
      bottom: 0,
      margin: 0,
      overflow: 'none',
      transition: 'all .4s ease',
      zIndex: open ? 1002 : -1,
      padding: '1vw',
      '.wallet-modal-section': {
        '@media screen and (max-width: 768px)': {
          paddingLeft: 0,
          paddingRight: 0
        }
      }
    };
  }
);

export const WrapContainer = styled('div')<{ size?: string; open?: boolean }>(({ size }) => ({
  maxWidth: size === 'md' ? '300px' : '360px', // maximum width based on size prop
  width: '100%',
  overflow: 'hidden',
  background: '#211442',
  display: 'flex',
  flexDirection: 'column',
  height: '600px',
  borderRadius: '12px',
  transition: 'all .4s ease',
  position: 'relative',
  // Media queries for larger screens
  '@media (min-width: 768px)': {
    width: size === 'md' ? '300px' : '360px' // fixed width for larger screens
  }
}));

export const ModalWrapContainer = styled('div')<{ size?: string; open?: boolean; width?: string }>(
  ({ size, width }) => ({
    width: width ? width : size === 'md' ? '468px' : '420px',
    // overflow: 'hidden',
    maxHeight: '85vh',
    background: 'var(--very-dark-violet-200)',
    transition: 'all .4s ease',
    overflowY: 'auto',
    position: 'relative',
    '&.wallet-modal': {
      '@media screen and (max-width: 768px)': {
        height: '100%',
        maxHeight: '100%'
      }
    },
    '&::-webkit-scrollbar-thumb': {
      background: 'transparent'
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent'
    }
    // '&::-webkit-scrollbar': {
    //   width: '0px'
    // }
  })
);

export const ModalSection = styled('div')<{
  noDivider?: boolean;
  inline?: boolean;
  notPadded?: boolean;
}>`
  display: ${(props) => (props.inline ? 'flex' : 'block')};
  justify-content: center;
  padding: ${(props) => (props.notPadded ? 'unset' : '20px 32px')};
  border-top: ${(props) => (props.noDivider ? 'none' : '1px solid #3C2A63')};
`;

export const ModalTop = styled('div')({});

export const ModalContent = styled('div')({});

export const ModalHeaderContainer = styled('div')({
  background: '#211442',
  color: '#fff',
  display: 'flex',
  minHeight: '44px',
  flexDirection: 'row',
  alignItems: 'center',
  padding: '0 12px',
  justifyContent: 'space-between',
  borderRadius: '6px 6px 0px 0px',
  borderBottom: '1px solid  #180C35',
  fontSize: '14px',

  '@media screen and (max-width: 768px)': {
    fontSize: '12px'
  },

  '@media screen and (max-width: 480px)': {
    fontSize: '10px'
  }
});

export const ModalHeaderLabel = styled('div')`
  font-weight: 600;
  font-size: 14px;
  line-height: 16px;
  display: flex;
  align-items: center;
  color: #fff;

  & img {
    width: 14px;
    height: 14px;
  }

  & span {
    margin-left: 10px;
  }

  @media screen and (max-width: 768px) {
    font-size: 12px;
    line-height: 14px;

    & img {
      width: 12px;
      height: 12px;
    }

    & span {
      margin-left: 7px;
    }
  }

  @media screen and (max-width: 480px) {
    font-size: 10px;
    line-height: 12px;

    & img {
      width: 10px;
      height: 10px;
    }

    & span {
      margin-left: 6px;
    }
  }
`;

export const CloseIconContainer = styled('div')<{ isGameModal?: boolean }>(({ isGameModal }) => ({
  position: 'absolute',
  padding: '20px',
  right: 0,
  cursor: 'pointer',
  transition: '.3s opacity',
  top: isGameModal ? '100px' : '50%',
  zIndex: 1,
  transform: 'translatey(-50%)',
  [`&:hover`]: {
    opacity: 0.7,
    transition: '.3s opacity'
  }
}));

export const CloseIconContainerHeader = styled('div')({
  display: 'flex',
  cursor: 'pointer',
  svg: {
    width: '24px',
    height: '24px'
  },

  '@media screen and (max-width: 768px)': {
    svg: {
      width: '20px',
      height: '20px'
    }
  },

  '@media screen and (max-width: 480px)': {
    svg: {
      width: '18px',
      height: '18px'
    }
  },

  '@media screen and (max-width: 300px)': {
    svg: {
      width: '16px',
      height: '16px'
    }
  },

  opacity: '0.8',
  transition: 'opacity 0.3s ease',
  '&:hover': {
    opacity: '1'
  }
});

export const ModalFooter = styled('div')({
  position: 'fixed',
  color: 'white',
  backgroundColor: 'var(--very-dark-violet-200)',
  width: '360px',
  zIndex: 1010,
  bottom: 55
});

export const SwitcherContainer = styled('div')({
  marginLeft: '8px',
  marginRight: '8px'
});
