import React from 'react';
import {
  ColorItem,
  ColorList,
  PaletteContainer,
  StyledBlock
} from '../../stories/components/ColorPalette/ColorPalette.style';

interface ColorProps {
  title: string;
  colors: { [key: string]: string | string[] | any };
}

const ColorBlock: React.FC<{
  color: string | (string | [string, string])[] | any;
  name: string;
}> = ({ color, name }) => (
  <StyledBlock color={color}>
    <h2>{name}</h2>
    <h3>
      {Array.isArray(color)
        ? color
            .map((colorItem) =>
              Array.isArray(colorItem) ? `${colorItem[0]} ${colorItem[1]}` : colorItem
            )
            .join(', ')
        : typeof color === 'object'
        ? color.colors
            .map((colorItem: any) =>
              Array.isArray(colorItem) ? `${colorItem[0]} ${colorItem[1]}` : colorItem
            )
            .join(', ')
        : color}
    </h3>
  </StyledBlock>
);

export const ColorPalette: React.FC<ColorProps> = ({ title, colors }) => (
  <PaletteContainer>
    <h2>{title}</h2>
    <ColorList>
      {Object.entries(colors).map(([key, color]) => (
        <ColorItem key={key}>
          <ColorBlock name={key} color={color} />
        </ColorItem>
      ))}
    </ColorList>
  </PaletteContainer>
);
