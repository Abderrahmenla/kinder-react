import Typography from '@/components/Atoms/Typography/Typography';
import styled from '@emotion/styled';

export const BannerContiner = styled('div')<{ imageUrl: string }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;

  @media (min-width: 769px) {
    display: inline-block;
    background-image: url(${(props) => props.imageUrl});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    margin-bottom: 48px;
    border-radius: 16px;
  }
`;
export const BannerTextContainer = styled('div')`
  display: flex;
  flex-direction: column;
  width: 100%;
  order: 2;
  padding: 16px 12px 0px 12px;
  height: 240px;

  @media (min-width: 769px) {
    height: 306px;
    width: 50%;
    order: unset;
    padding: 40px 32px;
  }
`;

export const BannerHeader = styled(Typography)`
  color: var(--text-colors-on-dark-background-white, #fafaff);
  line-height: 36px;
`;

export const BannerBodyText = styled(Typography)`
  color: var(--text-colors-on-dark-background-white, #fafaff);
  line-height: 20px;
  max-width: 334px;
  flex: 1;
`;

export const BannerFooterText = styled(Typography)`
  color: var(--text-colors-on-dark-background-white, #fafaff);
  line-height: 20px;
`;

export const BannerSponsorName = styled(Typography)`
  color: var(--text-colors-on-dark-background-white, #fafaff);
`;
