import React, { FunctionComponent, MouseEventHandler } from 'react';
import { CardContainer, LogoLabel } from './CurrencyCardStyle';

interface CurrencyCardProps {
  label: string;
  logoComponent: FunctionComponent;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

const CurrencyCard: React.FC<CurrencyCardProps> = ({
  label,
  logoComponent: LogoComponent,
  onClick
}) => {
  return (
    <CardContainer onClick={onClick}>
      <LogoComponent />
      <LogoLabel>{label}</LogoLabel>
    </CardContainer>
  );
};

export default CurrencyCard;
