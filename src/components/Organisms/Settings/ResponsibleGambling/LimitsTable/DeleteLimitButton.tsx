import Image from 'next/image';
import { useCallback } from 'react';
import { assets } from '@/config/assets';

const DeleteLimitButton = ({ onClick }: { onClick: () => void }) => {
  const handleOnClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.preventDefault();
      onClick();
    },
    [onClick]
  );

  return (
    <div className="delete-button" style={{ cursor: 'pointer' }} onClick={handleOnClick}>
      <Image
        alt="Delete icon button"
        src={`${assets}/images/settings/delete.svg`}
        width={13}
        height={15}
        loading="lazy"
      />
    </div>
  );
};

export default DeleteLimitButton;
