import { styled } from '@mui/material/styles';
import { assets } from '@/config/assets';

export const HowItWorks = styled('div')`
  padding: 71px 0 83px;
  h3 {
    font-weight: 700;
    font-size: var(--font-size-24);
    line-height: 31px;
    color: var(--white);
    margin: 0;
    text-align: center;
  }
  @media screen and (max-width: 690px) {
    padding: 40px 0;
  }

  svg.line {
    margin-top: -17px;
    display: block;
  }
`;

export const PlanCard = styled('div')<{ type: string }>`
  padding: 27px 43px 27px 40px;
  border-radius: 15px;
  width: 843px;
  margin: 0 auto 40px;
  zindex: 2;
  position: relative;
  background: url(${assets}/images/vip-program-cards.png) no-repeat;
  background-size: cover;
  background-position: top;
  & span {
    font-style: normal;
    font-weight: 600;
    font-size: var(--font-size-14);
    line-height: 17px;
    letter-spacing: 0.03em;
    margin: 0;
    color: rgba(163, 145, 226, 0.75);
    display: inline-block;
  }
  & .plan-inner > section:last-child {
    border: 0;
    padding-bottom: 0;
  }
  & .cat-title span {
    margin-left: 11px;
    color: ${({ type }: { type: string }) => {
      if (type === 'bronze') return 'var(--golden)';
      if (type === 'silver') return 'var(--silver)';
      if (type === 'gold') return 'var(--gold)';
      if (type === 'platinum') return 'var(--platinum)';
      if (type === 'diamond') return 'var(--diamond)';
      if (
        ['double_diamond', 'blue_diamond', 'onyx', 'pink_diamond', 'black_diamond'].includes(type)
      )
        return 'var(--d-diamond)';
    }};
  }
  @media screen and (max-width: 1300px) {
    width: 810px;
  }

  @media screen and (max-width: 1100px) {
    margin: 0 auto 40px;
  }

  @media screen and (max-width: 992px) {
    width: 100%;
  }

  @media screen and (max-width: 690px) {
    margin-bottom: 30px;
    padding: 30px 16px;
  }
`;

export const PlanHead = styled('div')`
  border-top: 1px dashed #44306D;
  border-bottom: 1px dashed #44306D;
  padding: 11px 0 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  & .plan-header {
    font-weight: 500;
    line-height: 31px;
    letter-spacing: 0.01em;
    color: var(--white);
  }

  @media screen and (max-width: 690px) {
    padding: 15px 0 20px;
    display: block;
    span:first-of-type,
    span:nth-of-type(2),
    span:last-child, {
      width: 100%;
      text-align: left;
    }
  }
}
`;
export const PlanInfoStart = styled('span')`
  min-width: 100px;
  @media screen and (min-width: 690px) {
    flex: 1;
    text-align: start;
  }
`;
export const PlanInfoCenter = styled('span')`
  min-width: 100px;
  @media screen and (min-width: 690px) {
    flex: 1;
    text-align: center;
  }
  @media screen and (max-width: 690px) {
    text-align: start;
  }
`;
export const PlanInfoEnd = styled('span')`
  min-width: 100px;
  text-align: start;
  @media screen and (min-width: 690px) {
    flex: 1;
    text-align: end;
  }
  @media screen and (max-width: 690px) {
    text-align: start;
  }
`;
export const HeaderText = styled('div')<{ type: string }>`
  color: ${({ type }: { type: string }) => {
    if (type === 'bronze') return 'var(--golden)';
    if (type === 'silver') return 'var(--silver)';
    if (type === 'gold') return 'var(--gold)';
    if (type === 'platinum') return 'var(--platinum)';
    if (type === 'diamond') return 'var(--diamond)';
    if (
      ['doubleDiamond', 'textBlueDiamond', 'onyx', 'pinkDiamond', 'blackDiamondClub'].includes(type)
    )
      return 'var(--d-diamond)';
  }};
  margin: 0 0 22px;
  font-style: normal;
  font-weight: 400;
  font-size: var(--font-size-16);
  line-height: 31px;
  text-align: center;
  letter-spacing: 0.455em;
  text-transform: uppercase;
`;

export const InnerRow = styled('section')`
  border-bottom: 1px solid #9d81ea;
  padding: 30px 0 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &:last-child: {
    border: 0;
    padding-bottom: 0;
  }
  @media screen and (max-width: 690px) {
    padding: 15px 0 20px;
    flex-wrap: wrap;
    align-items: flex-end;
    div.vip-wager-pt {
      width: 60%;
    }

    .vip-wager-pt {
      text-align: left;
    }
  }
  @media screen and (max-width: 400px) {
    .reward,
    div.vip-wager-pt {
      width: 100%;
    }
  }
`;

export const Reward = styled('div')`
  width: 28%;
  text-align: right;
  font-size: var(--font-size-12);
  line-height: 23px;
  font-weight: 500;
  color: var(--soft-blue-100);

  &&& {
    span {
      color: var(--white);
    }
  }

  @media screen and (max-width: 400px) {
    text-align: left;
    width: 100%;
  }
`;

export const InnerIconCol = styled('div')`
  width: 28%;
  text-align: left;
  display: flex;
  align-items: center;
  .vip-sub-icon {
    display: flex;
    justify-content: center;
  }
  .cat-title {
    display: flex;
    align-items: center;
  }

  @media screen and (max-width: 690px) {
    min-width: auto;
    display: flex;
    width: 100%;
    justify-content: flex-start;
    margin-bottom: 16px;
  }
`;

export const WorkFlow = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
  span {
    display: block;
    font-style: normal;
    font-weight: 500;
    font-size: var(--font-size-16);
    line-height: 31px;
    text-align: center;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #7e5cc8;
  }
  @media screen and (max-width: 479px) {
    svg {
      min-height: 137px;
    }
    svg.line {
      display: none;
    }
  }

  @media screen and (max-width: 400px) {
    svg {
      min-height: 110px;
    }
  }

  @media screen and (max-width: 420px) {
    svg {
      min-height: 118px;
    }
  }

  @media screen and (max-width: 1100px) {
    svg {
      max-width: 100%;
      height: auto;
    }
  }

  @media screen and (max-width: 690px) {
    span {
      font-size: 12px;
      line-height: 16px;
    }
  }
`;
