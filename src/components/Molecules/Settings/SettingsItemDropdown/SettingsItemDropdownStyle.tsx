import { styled } from '@mui/material/styles';

const Label = styled('label')({
  paddingLeft: '14px'
});

const FormGroupContainer = styled('div')({
  fontWeight: 400,
  marginBottom: '20px',
  marginTop: '30px',
  fontSize: 'var(--font-size-12)',
  lineHeight: 'var(--l-height-17)',
  color: 'var(--soft-violet)',
  display: 'none',
  '@media screen and (max-width: 768px)': {
    display: 'block'
  }
});

const FormRow = styled('div')({
  position: 'relative',
  marginTop: '8px'
});

const Sup = styled('sup')({
  color: 'var(--vivid-red)',
  marginLeft: '4px',
  fontSize: 'var(--font-size-12)',
  position: 'relative',
  top: '4px'
});

const FormErr = styled('div')({
  '& span': {
    marginTop: '5px',
    color: 'var(--vivid-red)',
    fontSize: 'var(--font-size-10)',
    lineheight: 'var(--l-height-13)',
    fontWeight: 400,
    paddingLeft: '14px'
  }
});

const FormCurrencySelection = styled('div')<{ isListVisible: boolean }>(({ isListVisible }) => ({
  cursor: 'pointer',
  transition: 'border-radius .3s',
  background: 'var(--very-dark-violet-5)',
  border: '1px solid var(--soft-blue-100)',
  borderRadius: isListVisible ? '15px 15px 0 0' : '15px',
  borderBottom: isListVisible ? 'none' : '1px solid var(--soft-blue-100)',
  padding: '0 14px',
  height: '42px',
  letterSpacing: '0.03em',
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
}));

const FormCurrencySelectionLeft = styled('div')({
  width: 'calc(100% - 2vw)',
  '& span': {
    fontWeight: 600,
    fontSize: 'var(--font-size-12)',
    lineHeight: 'var(--l-height-16)',
    color: 'var(--white)',
    textTransform: 'uppercase',
    display: 'block'
  }
});
const FormCurrencySelectionRight = styled('div')({
  width: '17px',
  height: '11px',
  cursor: 'pointer',
  justifyContent: 'center',
  alignItems: 'center',
  display: 'flex'
});

const FormCurrencyList = styled('div')<{ isVisible: boolean }>(({ isVisible }) => ({
  display: isVisible ? 'block' : 'none',
  paddingTop: '0px',
  paddingBottom: '5px',
  marginTop: '0px',
  marginBottom: '0px',
  background: 'var(--very-dark-violet-300)',
  border: '1px solid var(--soft-blue-100)',
  borderRadius: '0 0 15px 15px',
  borderTop: 'none',
  overflowY: 'scroll'
}));

const FormCurrencyListOption = styled('div')({
  width: '100%',
  '& a': {
    padding: '7px 14px',
    transition: 'background .4s ease',
    display: 'block',
    cursor: 'pointer',
    fontWeight: 500,
    fontSize: 'var(--font-size-12)',
    lineHeight: 'var(--l-height-16)',
    color: 'var(--soft-blue-100)',
    textTransform: 'uppercase',
    textDecoration: 'none'
  },
  '& a.active': {
    background: 'var(--very-dark-des-violet)'
  },
  '& a:hover': {
    background: 'var(--very-dark-des-violet)'
  }
});

export {
  FormCurrencyList,
  FormCurrencyListOption,
  FormGroupContainer,
  FormCurrencySelection,
  FormCurrencySelectionLeft,
  FormCurrencySelectionRight,
  FormErr,
  Sup,
  FormRow,
  Label
};
