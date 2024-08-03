import React from 'react';
import { ColorPalette } from '@/components/Atoms/ColorPalette';
import { colorPalette } from './colorPalette';

export default {
  title: 'Color Palette',
  component: ColorPalette
};

export const ColorPaletteStory = () => (
  <div>
    <ColorPalette
      title="Text colors on dark background"
      colors={{
        White: '#FAFAFF',
        'White 60%': '#FFFFFF',
        Content2: '#A3A9E2'
      }}
    />
    <ColorPalette
      title="Accent Color"
      colors={{
        'Accent yellow': '#FFD70C',
        'Accent yellow 2': '#FAD5F6',
        'Accent blue': '#0092FF'
      }}
    />
    <ColorPalette
      title="Dark"
      colors={{
        Background: '#150E25',
        'Dark 1': '#180C35',
        'Dark 2': '#1D113C',
        'Dark 3': '#211442',
        'Dark 4': '#27174F'
      }}
    />
    <ColorPalette
      title="Purple"
      colors={{
        'Purple 1': '#3C2A63',
        'Purple 2': '#4F397D',
        'Purple 3': '#8E6CFF',
        'Purple 4': '#8563E4'
      }}
    />
    <ColorPalette
      title="VIP"
      colors={{
        Bronze: '#CA9265',
        Silver: '#D0CADB',
        Gold: '#897458',
        'Black Diamond': '#F0E6D7'
      }}
    />
    <ColorPalette
      title="Fixed Colors"
      colors={{
        Red: '#E0164C',
        Green: '#49B265'
      }}
    />
    <ColorPalette
      title="Gradient"
      colors={{
        'Gradient 1': colorPalette.gradient.gradient1,
        'Gradient 2': colorPalette.gradient.gradient2,
        'Gradient 3': colorPalette.gradient.gradient3,
        'Gradient 4': colorPalette.gradient.gradient4
      }}
    />
  </div>
);
