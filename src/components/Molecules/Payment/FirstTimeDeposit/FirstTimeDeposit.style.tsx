import Typography from '@/components/Atoms/Typography/Typography';
import styled from '@emotion/styled';
import Image from 'next/image';

export const FirstDepositModalContainer = styled('div')`
  display: flex;
  background: var(--very-dark-violet-200);
  position: absolute;
  border-radius: 15px;
  max-height: 630px;
`;

export const FirstDepositModalContent = styled('div')`
  width: 360px;
  padding: 16px;

  @media screen and (max-width: 280px) {
    width: 100%;
    height: 100%;
  }
`;

export const FirstDepositMediaContent = styled('div')`
  width: 360px;
  max-height: 630px;
`;

export const FirstDepositModalAction = styled('div')`
  display: flex;
  margin-bottom: 16px;
`;

export const FirstDepositModalHeader = styled(Typography)`
  color: var(--white);
  font-weight: 600;
  flex: 1;
  h5 {
    margin: unset;
  }
`;

export const FirstDepositImage = styled(Image)`
  border-radius: 15px 0px 0px 15px;
`;

export const CloseDiv = styled('div')`
  cursor: pointer;
`;
