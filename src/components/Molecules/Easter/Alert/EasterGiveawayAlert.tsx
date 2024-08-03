import { ConfirmationAlert } from '@/components/Atoms/ConfirmationAlert';

interface Props {
  onClose: VoidFunction;
  onConfirm: VoidFunction;
  isLoading?: boolean;
  caption: string;
  title: string;
  loaderType?: 'coin' | 'logo';
  IconComponent: React.ReactElement;
}

export const EasterActiveEggConfirmation = ({
  onClose,
  onConfirm,
  isLoading,
  loaderType,
  caption,
  title,
  IconComponent
}: Props) => {
  return (
    <ConfirmationAlert
      isLoading={isLoading || false}
      loaderType={loaderType || 'coin'}
      onClose={onClose}
      onConfirm={onConfirm}
      caption={caption}
      title={title}
      IconComponent={IconComponent}
    />
  );
};
