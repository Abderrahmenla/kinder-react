interface CircularProgressBarProps {
  sqSize: number;
  strokeWidth: number;
  percentage: number;
  color?: string;
  badge?: string;
}

const CircularProgressBar = ({
  sqSize,
  strokeWidth,
  percentage,
  color,
  badge
}: CircularProgressBarProps) => {
  // Calculate the radius
  const radius = (sqSize - strokeWidth) / 2;
  const viewBox = `0 0 ${sqSize} ${sqSize}`;
  const dashArray = radius * Math.PI * 2;
  const dashOffset = dashArray - (dashArray * percentage) / 100;

  return (
    <svg width={sqSize} height={sqSize} viewBox={viewBox}>
      <circle
        cx={sqSize / 2}
        cy={sqSize / 2}
        r={radius}
        fill="#312443"
        stroke="transparent"
        strokeWidth={`${strokeWidth}px`}
      />

      <circle
        cx={sqSize / 2}
        cy={sqSize / 2}
        r={radius}
        strokeWidth={`${strokeWidth}px`}
        transform={`rotate(-90 ${sqSize / 2} ${sqSize / 2})`}
        style={{
          strokeDasharray: dashArray,
          strokeDashoffset: dashOffset,
          fill: 'none',
          stroke: color
        }}
      />

      <image href={badge} x={sqSize / 4} y={sqSize / 4} height={sqSize / 2} width={sqSize / 2} />
    </svg>
  );
};

export default CircularProgressBar;
