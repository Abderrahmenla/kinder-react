import { styled } from '@mui/material/styles';

export const VipPackages = styled('div')``;

export const TiersListWrapper = styled('div')``;

export const VipPackageSection = styled('div')`
  margin-bottom: 10px;
  background: var(--very-dark-violet-200);
  border-radius: 6px;

  &:last-of-type {
    margin-bottom: 0;
  }

  &.open {
    background: var(--very-dark-violet-600);
    .toggleList {
      display: block;
    }
  }

  .toggleList {
    display: none;
  }
`;

export const VipToggleContainer = styled('div')`
  cursor: pointer;
  padding: 11px 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  img {
    width: auto;
  }
`;

export const VIPRewardTitleContainer = styled('div')`
  display: flex;
  align-items: center;

  img {
    width: 32px;
  }
`;

export const VIPRewardTitle = styled('div')`
  font-weight: 500;
  margin-left: 8px;
`;

export const RewardLabel = styled('div')`
  margin: 0 0 4px;
  line-height: 17px;
`;

export const RewardBonus = styled('div')``;

export const VipRewardDetails = styled('div')``;

export const VipPackSub = styled('div')`
  border-top: 1px solid #1e113c;
  padding: 20px;
  gap: 20px;
  width: 100%;
  align-items: center;
  display: flex;

  img {
    width: 32px;
  }
`;
