import { ReactElement } from 'react';
import { Tooltip } from '@mui/material';
import ClipboardIcon from '@/components/Atoms/Icons/ClipboardIcon';
import { useTranslations } from '@/hooks/useTranslations';
import { ClipboardIconWrapper } from './BetHistory.styles';

const CustomTooltip = ({
  isCopied,
  children
}: {
  isCopied: boolean;
  children: ReactElement<any, any>;
}) => {
  const { t } = useTranslations();

  return (
    <Tooltip
      title={isCopied ? t('copiedToClipboard') : t('clickToCopy')}
      placement="right"
      arrow
      PopperProps={{
        sx: {
          '& .MuiTooltip-tooltip': {
            color: 'var(--white)',
            backgroundColor: 'var(--very-dark-violet-50)',
            borderRadius: 2,
            bottom: 3,
            height: 43,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 12
          },
          '& .MuiTooltip-arrow': {
            '&::before': {
              backgroundColor: 'var(--very-dark-violet-50)'
            }
          }
        }
      }}
    >
      {children}
    </Tooltip>
  );
};

const CopyToCliboardButton = ({
  onClick,
  isCopied
}: {
  onClick: () => void;
  isCopied: boolean;
}) => {
  return (
    <CustomTooltip isCopied={isCopied}>
      <ClipboardIconWrapper onClick={onClick}>
        <ClipboardIcon
          width="16"
          height="16"
          fill={isCopied ? 'var(--mod-blue-200)' : 'var(--light-silver)'}
        />
      </ClipboardIconWrapper>
    </CustomTooltip>
  );
};

export default CopyToCliboardButton;
