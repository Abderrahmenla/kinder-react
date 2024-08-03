import Typography, { TypographyProps } from '@mui/material/Typography';

type TextProps = TypographyProps & {
  text: string;
  className?: string;
};

export const TextComponent = ({ variant, color, text, className, ...props }: TextProps) => {
  return (
    <Typography fontFamily="Inter" variant={variant} color={color} className={className} {...props}>
      {text}
    </Typography>
  );
};
