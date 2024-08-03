import { styled } from '@mui/material/styles';

export const VIPPlayerLevel = styled('div')`
  margin-top: -88px;
  position: relative;
  width: 100%;
  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 110px;
    background: linear-gradient(180deg, rgba(33, 20, 66, 0) 0%, #211442 70.31%);
    top: -24px;
  }
  h5 {
    margin: 0 25px 8px 25px;
    font-size: 12px;
    line-height: 15px;
    color: var(--soft-blue);
    font-weight: 400;
  }
`;

export const VIPBar = styled('div')`
  width: 100%;
  padding: 0 25px;
  position: relative;

  .vip-lvl-row {
    margin-top: 8px;
    display: flex;
    justify-content: space-between;
  }
`;

export const ProgressBar = styled('div')`
  background: var(--dark-violet);
  border-radius: 16px;
  height: 20px;
  overflow: hidden;
  position: relative;
`;

export const ProgressPercent = styled('div')`
  background: linear-gradient(90deg, #9746ff 0%, #0092ff 100%);
  border-radius: 16px;
  height: 100%;
`;

export const PcNumb = styled('div')`
  position: relative;
  margin-top: 7px;
  margin-bottom: 9px;
  span {
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    color: var(--white);
    display: block;
  }
`;

export const VipLevelRow = styled('div')`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  .vip-level {
    width: 120px;
    .vip-icon {
      svg {
        width: 20px;
        height: auto;
      }
      margin-right: 4px;
    }
    span:last-child {
      font-weight: 600;
      font-size: 12px;
      color: var(--pale-violet-100);
    }
    .wg-details {
      span {
        display: block;
        font-weight: 500;
        font-size: 10px;
        line-height: 15px;
        letter-spacing: 0.01em;
        color: rgba(163, 145, 226, 0.79);
      }
    }
  }
  .vip-level:last-child {
    .wg-details {
      span {
        text-align: right;
        color: rgba(163, 145, 226, 0.79) !important;
      }
    }
    .vip-level-details {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  }

  .vip-level-bronze-1.vip-level:last-child span:last-child,
  .vip-level-bronze-2.vip-level:last-child span:last-child,
  .vip-level-bronze-3.vip-level:last-child span:last-child,
  .vip-level-bronze-4.vip-level:last-child span:last-child {
    color: var(--light-golden);
  }
`;

export const VipStatusCardContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: 'var(--very-dark-violet-200)',
  padding: '40px 30px',
  color: 'white',
  width: '100%',
  height: '100%',
  gap: 30,
  borderRadius: '12px',
  '@media screen and (max-width:1100px)': {
    maxWidth: '100%',
    gap: 42
  },
  '@media screen and (max-width:479px)': {
    padding: '5px 18px 5px 5px',
    gap: 24
  }
});

export const VipStatusProgressContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: 'var(--very-dark-violet-200)',
  color: 'white',
  width: '100%',
  height: '100%'
});

export const VipStatusprogressWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  justifyContent: 'flex-start',
  backgroundColor: 'var(--very-dark-violet-200)',
  color: 'white'
});

export const VipStatusDivider = styled('div')({
  borderTop: '1px solid #38275f',
  width: '100%'
});

export const WageredAmount = styled('div')``;
