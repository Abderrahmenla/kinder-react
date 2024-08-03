import React from 'react';

interface ColorProps {
  title: string;
  colors: { [key: string]: string | string[] };
}

const isNearlyWhite = (color: string): boolean => {
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);
  return r > 240 && g > 240 && b > 240;
};

const ColorBlock: React.FC<{ color: string | string[]; name: string }> = ({ color, name }) => {
  const backgroundColor = Array.isArray(color) ? color[0] : color; // If gradient, taking the first color for simplicity
  const fontColor = isNearlyWhite(backgroundColor) ? '#000' : '#FFF';
  const border = isNearlyWhite(backgroundColor) ? '1px solid #ccc' : 'none';

  return (
    <div
      style={{
        width: '100px',
        height: '50px',
        background: Array.isArray(color)
          ? `linear-gradient(45deg, ${color[0]}, ${color[1]})`
          : color,
        margin: '5px 0',
        display: 'flex',
        border: border,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: fontColor,
        padding: '5px',
        boxSizing: 'border-box'
      }}
    >
      <div>{name}</div>
      <div>{Array.isArray(color) ? `${color[0]} - ${color[1]}` : color}</div>
    </div>
  );
};

export const ColorPalette: React.FC<ColorProps> = ({ title, colors }) => (
  <div style={{ margin: '20px 0' }}>
    <h2>{title}</h2>
    <div style={{ display: 'flex' }}>
      {Object.entries(colors).map(([key, color]) => (
        <div key={key} style={{ margin: '10px 0' }}>
          <ColorBlock name={key} color={color} />
        </div>
      ))}
    </div>
  </div>
);
