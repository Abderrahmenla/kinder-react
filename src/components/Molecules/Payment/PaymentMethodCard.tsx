import { styled } from '@mui/material/styles';

const PaymentMethodCard = styled('div')<{ narrow?: boolean; active?: boolean }>`
  background: var(--very-dark-violet-20);
  border: ${(props) =>
    props.active ? '1px solid var(--pure-blue)' : '1px solid var(--very-dark-violet-20)'};
  border-radius: 18px;
  height: ${(props) => (props.narrow ? '52px' : '100px')};
  transition: all 0.3s linear;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: #fff;
  font-size: 12px;
  font-weight: 500;
  row-gap: 12px;
  &:hover {
    background: var(--very-dark-violet-2);
    border: 1px solid var(--soft-blue-100);
    cursor: pointer;
  }
`;

export default PaymentMethodCard;
