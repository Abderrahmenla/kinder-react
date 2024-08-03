import { Box, Typography } from '@mui/material';
import {
  AlertContainer,
  AlertContentContainer,
  ConfirmationButton,
  ConfirmationText
} from './Alert.styles';
import XIcon from '@/components/Atoms/XIcon';
import { useLoader } from '@/hooks/useLoader';
import { Dialog } from './Dialog/Dialog';

interface Props {
  title: string;
  onClose: VoidFunction;
  onConfirm: VoidFunction;
  IconComponent: React.ReactNode;
  isLoading: boolean;
  caption?: string;
  loaderType: 'coin' | 'logo';
}

export const ConfirmationAlert = ({
  title,
  onClose,
  onConfirm,
  IconComponent,
  isLoading,
  loaderType,
  caption
}: Props) => {
  const { loadingWrapper } = useLoader(loaderType);

  const CloseButton = (
    <Box display="flex" justifyContent="flex-end" width={'100%'}>
      <div style={{ cursor: 'pointer' }} onClick={onClose}>
        <XIcon onClick={onClose} />
      </div>
    </Box>
  );

  const ConfirmationContent = (
    <>
      <AlertContentContainer>
        {CloseButton}
        {IconComponent}
        <Box marginTop={2}>
          <Typography
            fontSize={16}
            color="#FAFAFF"
            fontWeight={'600'}
            lineHeight={'20px'}
            fontFamily="Inter"
          >
            {title}
          </Typography>
        </Box>

        {caption && (
          <Box marginTop={1}>
            <ConfirmationText>{caption}</ConfirmationText>
          </Box>
        )}
        <Box
          marginTop={4}
          width={'100%'}
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
        >
          <ConfirmationButton onClick={onClose} isCancel={true}>
            <span
              style={{
                fontFamily: 'Inter'
              }}
            >
              Cancel
            </span>
          </ConfirmationButton>
          <Box marginLeft={2}>
            <ConfirmationButton onClick={onConfirm}>
              <span
                style={{
                  fontFamily: 'Inter'
                }}
              >
                Confirm
              </span>
            </ConfirmationButton>
          </Box>
        </Box>
      </AlertContentContainer>
    </>
  );

  return (
    <>
      <Dialog
        disableHeader
        open={true}
        maxWidth="336px"
        bodyContent={() => (
          <AlertContainer>{isLoading ? loadingWrapper : ConfirmationContent}</AlertContainer>
        )}
      />
    </>
  );
};
