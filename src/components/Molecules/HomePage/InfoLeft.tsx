import Typography from '@/components/Atoms/Typography/Typography';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Image from 'next/image';

type InfoLeftType = { iconSrc: string; text: string; containerHover: boolean };

const InfoleftContainer = styled('div')<{ containerHover: boolean }>`
  display: flex;
  align-items: center;
  gap: 4px;
  top: 0;

  img {
    filter: brightness(2);
  }
  ${({ containerHover }) => {
    return (
      containerHover &&
      css`
        span {
          color: var(--soft-blue-100);
        }
        img {
          filter: brightness(1);
        }
      `
    );
  }};
`;
const Infotext = styled(Typography)`
  font-weight: 600;
  color: var(--white);
`;

export const InfoLeft = ({ iconSrc, text, containerHover }: InfoLeftType) => (
  <InfoleftContainer containerHover={containerHover}>
    <Image width={14} height={14} alt="icon" src={iconSrc} />
    <Infotext size="b2" type="Body">
      {text}
    </Infotext>
  </InfoleftContainer>
);
