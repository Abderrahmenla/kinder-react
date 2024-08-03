import { styled } from '@mui/material/styles';
import { GameCard } from '../../Molecules/HomePage';
import Link from 'next/link';

const GameCardContainer = styled('div')`
  width: 100%;
  height: 170px;

  @media (min-width: 1025px) {
    height: 248px;
  }
  @media (max-width: 375px) {
    height: 141px;
  }

  @media (max-width: 280px) {
    height: 105px;
  }
`;

const GameCardLink = styled(Link)`
  text-decoration: none;
`;

type GameCardSectionType = {
  imageSrc: string;
  iconSrc: string;
  text: string;
  href: string;
};

export const GameCardSection = ({ imageSrc, iconSrc, text, href }: GameCardSectionType) => {
  return (
    <GameCardContainer>
      <GameCardLink href={href}>
        <GameCard imageSrc={imageSrc} text={text} iconSrc={iconSrc} />
      </GameCardLink>
    </GameCardContainer>
  );
};
