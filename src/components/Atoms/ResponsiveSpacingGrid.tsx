import { ReactNode } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Grid, GridProps } from '@mui/material';

interface ResponsiveSpacingGridProps extends GridProps {
  children: ReactNode;
}

const ResponsiveSpacingGrid = ({ children, ...props }: ResponsiveSpacingGridProps) => {
  const theme = useTheme();
  const isXSmall = useMediaQuery(theme.breakpoints.down('xs'));
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const isMedium = useMediaQuery(theme.breakpoints.down('md'));

  let spacing: number;

  if (isXSmall) {
    spacing = 2; // xs spacing
  } else if (isSmall) {
    spacing = 3; // sm spacing
  } else if (isMedium) {
    spacing = 4; // md spacing
  } else {
    spacing = 5; // default (lg, xl) spacing
  }

  return (
    <Grid container spacing={spacing} {...props}>
      {children}
    </Grid>
  );
};

export default ResponsiveSpacingGrid;
