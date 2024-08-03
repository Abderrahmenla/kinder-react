import { styled } from '@mui/material/styles';

export const Label = styled('label')({
  paddingLeft: '14px'
});

export const FormGroupContainer = styled('div')({
  fontWeight: 400,
  marginBottom: '20px',
  fontSize: 'var(--font-size-12)',
  lineHeight: 'var(--l-height-17)',
  color: 'var(--soft-violet)',
  width: '100%'
});

export const FormRow = styled('div')({
  position: 'relative',
  marginTop: '8px'
});

type InputProps = {
  errMsg?: string;
  disabled?: boolean;
};

export const Input = styled('input')<InputProps>(({ errMsg, disabled }) => ({
  background: 'var(--very-dark-violet-300)',
  borderRadius: '15px',
  border: '1px solid',
  borderColor: errMsg ? 'var(--vivid-red)' : 'var(--very-dark-des-violet)',
  padding: '0 14px',
  height: '100%',
  width: '100%',
  opacity: 0,
  overflow: 'hidden',
  position: 'absolute',
  cursor: 'pointer',
  fontSize: 0,
  pointerEvents: disabled ? 'none' : 'auto'
}));

export const Sup = styled('sup')({
  color: 'var(--vivid-red)',
  marginLeft: '4px',
  fontSize: 'var(--font-size-12)',
  position: 'relative',
  top: '4px'
});

export const FormErr = styled('div')({
  '& span': {
    marginTop: '5px',
    color: 'var(--vivid-red)',
    fontSize: 'var(--font-size-10)',
    lineheight: 'var(--l-height-13)',
    fontWeight: 400,
    paddingLeft: '14px'
  }
});

export const FormUplField = styled('div')({
  background: 'var(--very-dark-violet-3)',
  border: '1px solid var(--very-dark-des-violet)',
  borderRadius: '15px',
  height: '48px',
  width: '100%',
  display: 'flex',
  alignItems: 'center',

  '@media screen and (max-width: 600px)': {
    height: 'auto',
    padding: '12px 0px',
    flexWrap: 'wrap'
  }
});

export const FormUplTxt = styled('span')({
  fontSize: '10px',
  lineHeight: '17px',
  color: 'var(--dark-violet)',
  margin: '0 0 0 16px',
  '@media screen and (max-width: 1100px)': {
    fontSize: '10px',
    lineHeight: '14px',
    marginLeft: '12px',
    paddingRight: '12px'
  },
  '@media screen and (max-width: 600px)': {
    fontSize: '12px',
    lineHeight: '17px',
    margin: '10px 13px 0 13px',
    paddingRight: '0px',
    width: '100%'
  }
});
export const FormUplInfo = styled('div')({
  background: 'var(--very-dark-violet-600)',
  borderRadius: '18px',
  height: '36px',
  width: '143px',
  margin: '0 0 0 13px',
  padding: '9px 15px',
  display: 'flex',
  alignItems: 'center',
  '@media screen and (max-width: 1100px)': {
    flexShrink: 0
  },
  '& span': {
    fontSize: '13px',
    lineHeight: '18px',
    color: 'var(--white)'
  }
});

export const FormUplIcon = styled('div')({
  width: '14px',
  height: 'auto',
  marginRight: '8px',
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer'
});

interface FormUplAreaProps {
  hasFile: boolean;
}

export const FormUplArea = styled('div')<FormUplAreaProps>(({ hasFile }) => ({
  display: hasFile ? 'flex' : 'none',
  width: hasFile ? '143px' : 'auto',
  alignItems: 'center',
  background: 'var(--very-dark-violet-600)',
  borderRadius: '18px',
  height: '36px',
  margin: '0 0 0 13px',
  padding: '9px 15px',
  '@media screen and (max-width: 1100px)': {
    flexShrink: 0
  },
  '@media screen and (max-width: 479px)': {
    minWidth: '83%',
    flexShrink: 0
  }
}));

export const FormUplAreaWrap = styled('div')({
  display: 'flex',
  alignItems: 'center'
});
