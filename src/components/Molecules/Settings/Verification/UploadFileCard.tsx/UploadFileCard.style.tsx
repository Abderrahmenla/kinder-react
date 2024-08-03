import Typography from '@/components/Atoms/Typography/Typography';
import styled from '@emotion/styled';

export const UploadFileCardName = styled(Typography)`
  color: var(--darker-white);
  line-height: 1;
  max-width: 100px;
  text-overflow: ellipsis;
  overflow: hidden;

  @media (min-width: 768px) {
    max-width: 150px;
  }
`;
export const UploadFileCardStatus = styled(Typography)`
  color: var(--yellow-4);
  line-height: 1;
`;

export const UploadFileCardContainer = styled('div')`
  display: flex;
  gap: 12px;
  border-radius: 8px;
  background: var(--very-dark-violet-200);
  padding: 15px 16px;
  width: auto;
  flex-direction: row;
`;

export const UploadFileCardLabel = styled('div')`
  min-width: 200px;
  display: flex;
  text-wrap: nowrap;
  gap: 4px;
  flex: 1;

  @media (max-width: 280px) {
    min-width: 100px;
  }
`;

export const UploadFileCardRemove = styled('div')`
  line-height: 1;
  position: relative;
  top: 2px;
  cursor: pointer;

  @media (min-width: 768px) {
    margin-left: 201px;
  }
`;
