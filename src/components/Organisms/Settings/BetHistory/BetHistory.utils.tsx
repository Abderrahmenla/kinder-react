import { SerializedStyles, css } from '@emotion/react';

export interface GetBetResultProps {
  status: string;
  win: number;
  stake: number;
}

export const getBetResult = ({ status, win, stake }: GetBetResultProps): number => {
  switch (status) {
    case 'win':
      return win;
    case 'lose':
      return stake - win;
    default:
      return 0;
  }
};

export const combineStyles = (...styles: (SerializedStyles | undefined)[]): SerializedStyles => {
  const validStyles = styles.filter((style) => style) as SerializedStyles[];

  return css`
    ${validStyles
      .map((style) => style.styles.trim())
      .filter(Boolean)
      .join('\n')}
  `;
};
