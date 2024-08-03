import { BlockProps } from '../components/ColorPalette/ColorPalette.style';

export const isNearlyWhite = (
  color: string | string[] | { colors: string[]; degree: number }
): boolean => {
  let actualColor;
  if (typeof color === 'string') {
    actualColor = color;
  } else if (Array.isArray(color)) {
    actualColor = color[0];
  } else {
    actualColor = color.colors[0];
  }

  const r = parseInt(actualColor.slice(1, 3), 16);
  const g = parseInt(actualColor.slice(3, 5), 16);
  const b = parseInt(actualColor.slice(5, 7), 16);
  return r > 240 && g > 240 && b > 240;
};

export const getBackgroundColor = (color: BlockProps['color']) => {
  if (typeof color === 'string') {
    return color;
  }

  if ('colors' in color && 'degree' in color) {
    return `linear-gradient(${color.degree}deg, ${color.colors
      .map((colorItem) =>
        Array.isArray(colorItem) ? `${colorItem[0]} ${colorItem[1]}` : colorItem
      )
      .join(', ')})`;
  }

  if (Array.isArray(color)) {
    return `linear-gradient(45deg, ${color
      .map((colorItem) =>
        Array.isArray(colorItem) ? `${colorItem[0]} ${colorItem[1]}` : colorItem
      )
      .join(', ')})`;
  }

  throw new Error('Invalid color format');
};
