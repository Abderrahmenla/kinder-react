import Image from 'next/image';
import { Box } from '@mui/material';

interface IBonusImage {
  src: string;
}

const BonusImage: React.FC<IBonusImage> = ({ src }) => (
  <Box
    bgcolor="var(--mod-blue-200)"
    display="flex"
    justifyContent="center"
    alignItems="center"
    borderRadius="15px"
    height={122}
    width={87}
    position="relative"
  >
    <Box borderRadius="6px" width="100%" height="100%" position="relative" overflow="hidden">
      <Image alt="Bonus Image" layout="fill" objectFit="cover" src={src} />
    </Box>
  </Box>
);

export default BonusImage;
