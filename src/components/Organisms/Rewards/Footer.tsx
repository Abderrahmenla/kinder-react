import Link from 'next/link';
import { Box, Typography } from '@mui/material';

export const RewardsFooter = () => {
  return (
    <Box
      component={Link}
      // TODO: Redirect to dedicated page. Its still WIP.
      href="/"
      paddingBottom={3}
      marginTop={5}
      display="flex"
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      style={{ textDecoration: 'none' }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        style={{ height: 25, width: 25, color: 'var(--pure-blue-100)' }}
        aria-label="Information Icon"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
        />
      </svg>
      <Box borderBottom={1} ml={0.5} borderColor="var(--pure-blue-100)" paddingBottom={0.1}>
        <Typography fontSize={13} color="var(--pure-blue-100)">
          Show more information about our Bonus Program...
        </Typography>
      </Box>
    </Box>
  );
};
