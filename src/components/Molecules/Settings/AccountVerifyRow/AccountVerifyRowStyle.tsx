import { styled } from '@mui/material/styles';

export const AccountVerifyRow = styled('div')({
  background: 'var(--very-dark-violet-600)',
  borderRadius: '20px',
  margin: '0 0 20px 0'
});

export const AccountVerifyTop = styled('div')(({ isOpen }: { isOpen?: boolean }) => ({
  padding: '11px 19px',
  borderRadius: '20px',
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  border: isOpen ? '1px solid var(--soft-blue-100)' : 'none'
}));
export const AccountVerifyLeftCol = styled('div')({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer'
});

export const AccountStep = styled('div')({
  '& span': {
    fontweight: 300,
    fontSize: '24px',
    lineHeight: '34px',
    color: 'var(--soft-blue-100)',
    cursor: 'pointer'
  }
});

export const AccountStepText = styled('div')({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  '& span': {
    fontweight: 500,
    fontSize: '14px',
    lineHeight: '20px',
    color: 'var(--soft-blue-100)',
    paddingLeft: '16px'
  }
});

export const AccountVerifyRightcol = styled('div')({
  '& img': {
    widht: '16px',
    height: 'auto'
  }
});
