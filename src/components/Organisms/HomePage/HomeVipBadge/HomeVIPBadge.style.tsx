import styled from '@emotion/styled';
import RewardWrapper from '../../Rewards/RewardWrapper';

export const HomeVIPBadgeContainer = styled('div')`
  display: flex;
  width: 100%;
  max-height: 146px;
  justify-content: center;
  padding-bottom: 12px;
  background: var(--very-dark-violet-300);
  border-radius: 6px;
`;

export const VIPBadgeContainer = styled('div')`
  width: 100%;
  display: flex;
  margin: 12px 12px 0px;
  justify-content: start;

  > div {
    padding: 0px;
    gap: 16px;
    width: 100%;
    max-width: 328px;
  }
  .circular-progressbar {
    width: 70%;
    flex: unset;
    line-height: 1;
  }

  .progressbar-details {
    width: 100%;
    flex: unset;
    padding: unset;
    text-wrap: nowrap;
  }

  @media (min-width: 768px) {
    justify-content: end;

    .circular-progressbar {
      height: auto;
    }

    > div {
      width: auto;
    }
  }
`;

export const VIPBadgeBanner = styled('div')`
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  width: 50%;
  justify-content: flex-end;
  margin-right: 40px;

  img {
    filter: grayscale(1);
    opacity: 0.1;
  }
`;

export const VIPBadge = styled(RewardWrapper)`
  height: auto;
  padding: unset;
  background: none;
  border: none;
  max-height: 146px;
  svg {
    width: 100%;
    height: 100%;
  }
`;
