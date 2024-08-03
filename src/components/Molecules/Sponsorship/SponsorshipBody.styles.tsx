import Typography from '@/components/Atoms/Typography/Typography';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const SponsorBodyContainer = styled('div')<{ $isEven: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;

  @media (min-width: 769px) {
    flex-direction: row;
    min-height: 356px;
    margin-bottom: 48px;
    align-items: center;

    ${(props) => {
      if (props.$isEven) {
        return css`
          min-height: unset;
          max-height: 346px;
          border-radius: 12px;
          background: var(--dark-dark-1, #180c35);
          margin-bottom: 70px;
        `;
      }
      return '';
    }}
  }
`;
export const SponsorBodyTextContainer = styled('div')`
  width: 100%;
  padding: 16px 10px;

  @media (min-width: 769px) {
    padding: 50px;
  }
`;

export const SponsorBodyTitle = styled(Typography)`
  color: var(--text-colors-on-dark-background-white, #fafaff);
  font-weight: 600;
  line-height: 32px;
  margin-bottom: 14px;

  @media (min-width: 769px) {
    max-width: 226px;
  }
`;

export const SponsorBodySubTitle = styled(Typography)`
  color: var(--text-colors-on-dark-background-white, #fafaff);
  line-height: 20px;

  @media (min-width: 769px) {
    max-width: 483px;
  }
`;

export const SponsorBodyMedia = styled('div')<{ $isEven: boolean }>`
  width: 100%;

  @media (min-width: 769px) {
    ${(props) => {
      if (props.$isEven) {
        return css`
          order: 2;
          position: relative;
          top: 56px;
          right: 36px;
        `;
      }
      return '';
    }}
  }
`;

export const Video = styled('video')`
  width: 100%;
  height: 100%;
`;

export const VideoIframe = styled('iframe')`
  width: 100%;
  height: 100%;
  border: none;

  @media (min-width: 768px) {
    min-height: 313px;
  }
`;
