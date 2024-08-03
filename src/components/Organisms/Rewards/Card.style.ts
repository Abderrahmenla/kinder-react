import Typography from '@/components/Atoms/Typography/Typography';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

export const AwardWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column'
});
export const Awards = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '12px'
});
export const MoneyInAccount = styled('span')({
  fontWeight: '600',
  fontSize: '14px',
  lineHeight: 'normal',
  color: 'var(--white)',
  display: 'block',
  fontStyle: 'normal'
});
export const MoneyForNextStep = styled('span')({
  fontWeight: '500',
  fontSize: 'var(--font-size-10)',
  lineHeight: 'var(--l-height-15)',
  color: 'rgba(163, 145, 226, 0.79)',
  display: 'block',
  textAlign: 'end'
});
export const RightBannerSide = styled('div')({
  width: '328px',
  position: 'relative',
  '@media screen and (max-width:1100px)': {
    width: '34%'
  }
});
export const ProgressInfo = styled('div')({
  width: '340px',
  margin: '10px 0 0 0',
  '@media screen and (max-width:900px)': {
    width: '88%'
  },
  '@media screen and (max-width:600px)': {
    width: '100%'
  }
});
export const ProgressBarContainer = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 20px;
  position: relative;
`;
export const ProgressBarBackground = styled('div')`
  height: 6px;
  width: 195px;
  background: var(--very-dark-violet-2);
  border-radius: 16px;
`;

export interface ProgressBarProps {
  percentage: number;
}

export const ProgressBar = styled('div')<ProgressBarProps>`
  height: 100%;
  background: linear-gradient(90deg, #9746ff 0%, #0092ff 100%);
  width: ${(props) => props.percentage}%;
  border-radius: 16px;
`;

export const FirstTimeDepositMainTitle = styled('span')({
  color: 'rgba(163, 145, 226, 0.50)',
  textAlign: 'center',
  fontSize: '10px',
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: 'normal',
  letterSpacing: '2px',
  textTransform: 'uppercase',
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '20px',
  marginTop: '25px'
});

export const FirstTimeDepositCardContainer = styled('div')({
  display: 'flex',
  gap: '19px',
  background: 'var(--very-dark-violet-300)',
  padding: '8px 8px',
  borderRadius: '6px',
  marginBottom: '20px',
  width: '344px',
  minHeight: '186px',
  margin: 'auto',
  position: 'relative'
});

export const FirstTimeDepositDetailContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column'
});

export const FirstTimeDepositSubTitle = styled('div')({
  color: 'var(--white)',
  fontSize: '13px',
  fontStyle: 'normal',
  fontWeight: '500',
  lineHeight: '16px',
  marginTop: '10px',
  marginBottom: '5px'
});

export const FirstTimeDepositDescription = styled('div')({
  color: 'var(--soft-blue-100)',
  fontSize: '12px',
  lineHeight: '16px',
  fontStyle: 'normal'
});

export const NoThanksButton = styled('button')({
  borderRadius: '15px',
  background: 'var(--light-violet-2)',
  width: '100%',
  textTransform: 'uppercase',
  color: '#FFF',
  border: 'none',
  padding: '19px 0',
  marginTop: '20px',
  fontWeight: 700,
  letterSpacing: '0.36px'
});

export const InfoLink = styled('span')({
  color: 'var(--soft-blue-100)',
  fontSize: '10px',
  lineHeight: '14px',
  textDecoration: 'none'
});
export const CloseIconContainer = styled('span')`
  position: absolute;
  right: 14px;
  top: 8px;
  cursor: pointer;
  opacity: 0.8;
  transition: opacity 0.3s ease;
  &:hover {
    opacity: 1;
  }
`;

export const BonusTypographyAvailable = styled(Typography)`
  color: var(--soft-blue-100);
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
  font-family: 'Inter';
`;

export const CardTypographyHeader = styled('div')`
  color: var(--white);
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-bottom: 5px;
`;

export const CardTypographyDescription = styled('div')`
  color: var(--soft-blue-100);
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 14.52px;
`;

export const CelebrationSection = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '6px',
  marginTop: '10px',
  alignItems: 'center',
  gap: theme.spacing(0.5)
}));

export const CelebrationIcon = styled('span')({
  fontSize: '24px'
});

export const CelebrationText = styled('span')({
  color: 'var(--white)',
  textAlign: 'center',
  fontWeight: 700,
  fontSize: '18px'
});

export const ActionSection = styled('div')(({ theme }) => ({
  width: '344px',
  margin: 'auto',
  marginTop: theme.spacing(4)
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: '15px',
  background: 'var(--light-violet-2)',
  textTransform: 'uppercase',
  color: 'var(--white)',
  border: 'none',
  padding: theme.spacing(2.375, 0),
  marginTop: theme.spacing(4.375),
  fontWeight: 700,
  letterSpacing: '0.36px',
  fontSize: '12px',
  width: '344px'
}));

export const InfoSection = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: theme.spacing(0.75),
  marginTop: theme.spacing(2.5),
  color: 'var(--soft-blue-100)'
}));

export const WagerSubText = styled('span')({
  color: 'var(--soft-blue-100)',
  fontFamily: 'Inter',
  fontSize: '14px',
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: 'normal',
  marginBottom: '4px'
});
