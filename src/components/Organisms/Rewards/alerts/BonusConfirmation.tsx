import { ConfirmationAlert } from '@/components/Atoms/ConfirmationAlert';
import ConfirmationIcon from '@/components/Atoms/ConfirmationIcon';

interface Props {
  onClose: VoidFunction;
  onConfirm: VoidFunction;
  isLoading?: boolean;
  loaderType?: 'coin' | 'logo';
  caption?: string | null;
}

export const BonusConfirmation = ({
  onClose,
  onConfirm,
  isLoading,
  loaderType,
  caption
}: Props) => {
  return (
    <ConfirmationAlert
      isLoading={isLoading || false}
      loaderType={loaderType || 'coin'}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Are you sure?"
      caption={caption ?? ''}
      IconComponent={<ConfirmationIcon />}
    />
  );
};
