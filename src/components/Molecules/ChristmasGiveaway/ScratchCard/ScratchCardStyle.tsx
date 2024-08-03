import { assets } from '@/config/assets';
import styled from '@emotion/styled';

export const ScratchCardHeaderContainer = styled.div``;

export const ScratchCardBodyContainer = styled.div<{ isCursorChange?: boolean }>`
  display: flex;
  align-items: center;
  margin-top: 20px;
  justify-content: center;
  cursor: ${({ isCursorChange }) =>
    isCursorChange ? 'pointer' : `url(${assets}/images/christmas-giveaway/coinLogo.png), pointer`};
`;

export const ScratchContainer = styled.div`
  width: 100%;
  height: 418px;
  background: url(${assets}/images/christmas-giveaway/scratch-christmas.png),
    radial-gradient(
      81.19% 82.22% at 53.77% 100%,
      rgba(11, 2, 37, 0.34) 0%,
      rgba(25, 7, 36, 0.29) 27.29%,
      rgba(99, 31, 31, 0) 100%
    ),
    linear-gradient(168deg, #7902a6 -15.01%, #49009b -14.99%, #4b0b73 112.21%);
  background-repeat: no-repeat;
  background-size: cover;
`;

export const CloseIconContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  cursor: pointer;
  & img {
    display: flex;
    width: 24px;
    height: 24px;
    margin: 8px;
    margin-bottom: 0px;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
  }
`;

export const ScratchCardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  & span {
    overflow: hidden;
    color: #fafaff;
    margin-left: 10px;
    text-align: center;
    text-overflow: ellipsis;
    /* Headlines/H4 (16px) */
    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px;
  }
  & img {
    width: 24px;
    height: 24px;
  }
`;

export const ScratchRevealButtonContainer = styled.div`
  position: absolute;
  transform: translateX(-50%);
  left: 50%;
  bottom: 60px;
`;
