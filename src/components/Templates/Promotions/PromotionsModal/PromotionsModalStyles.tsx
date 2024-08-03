import styled from '@emotion/styled';
import Link from 'next/link';

export const WrapContainer = styled.div`
  width: 100%;
  max-width: 336px;
  overflow: hidden;
  background: var(--very-dark-violet-5);
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-radius: 6px;
  transition: all 0.4s ease;
  position: relative;
  padding: 8px 22px 16px 22px;
  justify-content: center;
  @media (max-width: 479px) {
    max-width: 100%;
    margin: 0 12px;
  }
`;

export const CloseIconContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  transition: all 0.4s ease;
  & img {
    display: flex;
    width: 24px;
    height: 24px;
    margin: 0;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
  }
  & svg {
    cursor: pointer;
  }
  & svg:hover path {
    transition: all 0.4s ease;
    fill: var(--white);
  }
`;

export const BannerWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 177px;
  & img {
    object-fit: cover;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 6px;
  }
`;

export const PromotionsDetails = styled.div`
  text-align: center;
`;

export const ExpiryDateWrapper = styled.div`
  margin-top: 8px;
  & span {
    font-size: var(--font-size-14);
    line-height: normal;
    font-style: normal;
    font-weight: 600;
    color: var(--soft-blue-100);
    &.expired {
      color: var(--pure-red);
    }
  }
`;

export const ShortDesc = styled.p`
  margin-top: 8px;
  margin-bottom: 12px;
  font-size: var(--font-size-14);
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  color: var(--darker-white);
`;

export const ButtonLink = styled(Link)`
  width: 304px;
  max-width: 100%;
  height: 44px;
  margin: auto;
  display: block;
  margin-top: 24px;
  color: var(--soft-blue-100);
  padding: 12px 47px;
  font-size: var(--font-size-14);
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  text-decoration: none;
  border-radius: 6px;
  border: 1px solid var(--soft-blue-100);
  transition: all 0.4s ease;
  &:hover {
    background-color: var(--soft-blue-100);
    color: var(--white);
  }
`;
