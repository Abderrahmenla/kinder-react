import Typography from '@/components/Atoms/Typography/Typography';
import { styled } from '@mui/material';
import Switch from '@mui/material/Switch';

interface GameSwitcherContainerProps {
  isActive: boolean;
  isFullScreen?: boolean;
}

export const GameSwitcherContainer = styled('div')<GameSwitcherContainerProps>(
  ({ isActive, isFullScreen }) => ({
    display: 'flex',
    width: '140px',
    height: '30px',
    '@media(max-width: 900px)': {
      position: isFullScreen ? 'unset' : 'static',
      marginLeft: 'initial',
      marginBottom: '15px',
      marginTop: '10px',
      width: isFullScreen ? 'initial' : '100%',
      display: 'block'
    },
    '& .MuiSwitch-root': {
      margin: '0 8px'
    },

    '& .MuiFormGroup-root': {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      '& .MuiFormControlLabel-root': {
        margin: 0
      },
      '& p, h3': {
        fontSize: '14px',
        fontWeight: 300
      },
      '& p': {
        color: isActive ? 'var(--pale-violet))' : 'var(--white)'
      },
      '& h3': {
        color: isActive ? 'var(--white)' : 'var(--pale-violet))'
      }
    }
  })
);

export const Label = styled(Typography)(() => ({
  color: 'var(--soft-blue-100)',
  position: 'absolute',
  left: '60px',
  top: '6px',
  width: '90px',
  fontWeight: 600
}));

export const ToggleSwitchLabels = styled('div')<GameSwitcherContainerProps>(({ isActive }) => ({
  '& > div .Paragraph-p1': {
    opacity: 0
  },
  '& > div:first-of-type .Paragraph-p1': {
    opacity: isActive ? 0 : 1
  },
  '& div:last-of-type .Paragraph-p1': {
    opacity: isActive ? 1 : 0
  }
}));

export const MaterialUISwitch = styled(Switch)(() => ({
  width: 55,
  height: 36,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    top: '7px',
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(27px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='13' viewBox='0 0 12 13' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 1V11.5' stroke='%23C8B4FF' stroke-width='2' stroke-linecap='round'%3E%3C/path%3E%3Cpath d='M11 3V9.5' stroke='%23C8B4FF' stroke-width='2' stroke-linecap='round'%3E%3C/path%3E%3Cpath d='M1 3V9.5' stroke='%23C8B4FF' stroke-width='2' stroke-linecap='round'%3E%3C/path%3E%3C/svg%3E")`
      },
      '& + .MuiSwitch-track': {
        opacity: 1
      }
    }
  },
  '& .MuiSwitch-thumb': {
    background: 'linear-gradient(144.54deg, #9746FF 11.37%, #0092FF 118.48%);',
    width: 21,
    height: 21,

    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='13' viewBox='0 0 12 13' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 1V11.5' stroke='%23C8B4FF' stroke-width='2' stroke-linecap='round'%3E%3C/path%3E%3Cpath d='M11 3V9.5' stroke='%23C8B4FF' stroke-width='2' stroke-linecap='round'%3E%3C/path%3E%3Cpath d='M1 3V9.5' stroke='%23C8B4FF' stroke-width='2' stroke-linecap='round'%3E%3C/path%3E%3C/svg%3E")`
    }
  },
  '& .MuiSwitch-track': {
    backgroundColor: 'var(--dark-md-blue-100) !important',
    opacity: 1,
    borderRadius: 20 / 2
  }
}));
