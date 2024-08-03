import { DropDown } from '@/components/Atoms/DropDown';
import Typography from '@/components/Atoms/Typography/Typography';
import { styled } from '@mui/material/styles';

export const ContentInnerWrapper = styled('div')`
  @media screen and (min-width: 768px) {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
`;

export const InfoFrameWrapper = styled('div')`
  display: flex;
  width: 100%;
`;

export const LeftColumn = styled('div')`
  background: var(--very-dark-violet-300);
  min-width: 202px;
  height: fit-content;
`;

export const RightColumn = styled('div')<{ isMobile: boolean; isProfile: boolean }>`
  width: 100%;
  padding: ${({ isMobile, isProfile }) => (isProfile ? '0' : isMobile ? '12px' : '16px')};
  max-width: 998px;
  border-radius: 6px;
  background: ${({ isProfile }) => (isProfile ? 'none' : 'var(--very-dark-violet-300)')};
  flex: 1;
  padding-bottom: ${({ isProfile }) => (isProfile ? '0' : '16px')};
  height: fit-content;
`;

export const SettingsContainer = styled('div')<{
  isMobile: boolean;
  isResponsibleGambling: boolean;
}>`
  padding: ${({ isMobile, isResponsibleGambling }) =>
    isMobile && isResponsibleGambling ? '10px' : '12px'};
  background: ${({ isMobile, isResponsibleGambling }) =>
    isMobile && isResponsibleGambling ? 'var(--very-dark-violet)' : 'var(--very-dark-violet-300)'};

  ul {
    background: none;
    display: flex;
    flex-direction: column;
    gap: 2px;
    border-radius: 6px;

    li {
      background: var(--very-dark-violet-200);
      &:first-of-type {
        border-radius: 6px 6px 0px 0px;
      }
    }
  }

  @media (min-width: 768px) {
    background: var(--very-dark-violet-300);
  }
`;
export const SettingsMobileHeader = styled('div')<{ isPageOpen: boolean }>`
  background: var(--very-dark-violet-3);
  display: flex;
  gap: 8px;
  padding: ${({ isPageOpen }) => (isPageOpen ? '4px 12px' : '12px 24px')};
  align-items: center;
`;

export const SettingsHeaderTitle = styled(Typography)`
  span {
    color: var(--darker-white);
    font-weight: 500;
    line-height: normal;
  }
`;

export const DropDownLabel = styled(Typography)`
  span {
    color: var(--darker-white);
    line-height: normal;
  }
`;

export const SettingsDropdownLabel = styled('div')`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const SettingsDropdown = styled(DropDown)`
  img:first-of-type {
    filter: brightness(2);
  }
  p {
    font-size: 14px;
    font-weight: 400;
    line-height: normal;
  }
`;

export const settingsDropDownStyle = {
  width: '100%',
  minWidth: '195px',
  borderRadius: '6px',
  background: 'var(--very-dark-violet-5)',
  padding: '0px 8px',
  height: '40px'
};

export const settingsItemDropdownStyle: React.CSSProperties = {
  position: 'absolute',
  background: 'var(--very-dark-des-violet)',
  borderRadius: '6px',
  zIndex: '1',
  minWidth: '195px',
  left: 'unset'
};

export const ImageContainer = styled('div')`
  cursor: pointer;
`;
