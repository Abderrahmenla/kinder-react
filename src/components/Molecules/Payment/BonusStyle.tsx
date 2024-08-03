import { styled } from '@mui/material/styles';

export const BonusContainer = styled('div')<{ ghost?: boolean }>`
  background-color: ${({ ghost }) => (ghost ? 'var(--very-dark-violet-200)' : '#3C217F')};
  border: ${({ ghost }) => (ghost ? '1px solid #3C2A63' : 'none')};
  border-radius: 15px;
  margin-bottom: 20px;
  margin-top: 10px;
  margin-top: 10px;
  padding: 20px 12px;
`;

export const BonusTitle = styled('div')({
  color: '#fff',
  fontSize: '14px',
  fontWeight: 700,
  marginBottom: '18px'
});

export const BonusButton = styled('div')({
  position: 'absolute',
  background: 'linear-gradient(90deg, var(--yellow) 0%, #FFBD14 99.48%)',
  borderRadius: '24px',
  fontSize: '11px',
  padding: '7px 28px',
  cursor: 'pointer',
  fontWeight: 700
});

export const SuffixContainer = styled('div')({
  backgroundColor: 'var(--very-dark-violet-200)',
  border: '1px solid #3C2A63',
  borderLeft: 'none',
  height: '100%',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '17px',
  borderBottomRightRadius: '15px',
  borderTopRightRadius: '15px'
});
