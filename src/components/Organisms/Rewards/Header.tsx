import { Box, Typography } from '@mui/material';

interface Props {
  onClose: VoidFunction;
}

export const RewardsHeader = ({ onClose }: Props) => {
  return (
    <Box
      sx={{
        paddingBottom: '10px',
        paddingTop: '10px',
        paddingLeft: '12px',
        paddingRight: '12px',
        marginTop: '-1px',
        borderBottom: '1px solid var(--dark-dark-1, #180C35)'
      }}
      bgcolor="var(--dark-dark-3, #211442)"
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Box display="flex" flexDirection="row" alignItems="center">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.31738 6.36172L10.2567 5.46819L8.948 5.28235C8.87326 5.27172 8.80218 5.24319 8.74083 5.1992C8.67947 5.1552 8.62965 5.09704 8.5956 5.02966L8.00003 3.85144L7.4045 5.02966C7.37044 5.09704 7.3206 5.15521 7.25924 5.1992C7.19787 5.24319 7.12679 5.27172 7.05203 5.28235L5.74335 5.46819L6.68266 6.36172C6.73856 6.41505 6.78046 6.48132 6.80465 6.55469C6.82884 6.62806 6.83457 6.70626 6.82135 6.78238L6.59703 8.0581L7.78578 7.44794C7.85212 7.41409 7.92553 7.39645 8 7.39645C8.07447 7.39645 8.14789 7.41409 8.21422 7.44794L9.40297 8.0581L9.17866 6.78238C9.16546 6.70626 9.17121 6.62807 9.1954 6.5547C9.2196 6.48133 9.26149 6.41505 9.31738 6.36172Z"
            fill="#A391E2"
          />
          <path
            d="M8.00002 0C4.64018 0 1.90656 2.73362 1.90656 6.09347C1.90656 9.45331 4.64018 12.1869 8.00002 12.1869C11.3599 12.1869 14.0935 9.45331 14.0935 6.09347C14.0935 2.73362 11.3599 0 8.00002 0ZM11.6043 5.47963L10.1459 6.8675L10.4897 8.82481C10.5562 9.20475 10.1574 9.50119 9.81359 9.32284L8.00002 8.39181L6.18646 9.32288C5.84365 9.49894 5.44343 9.20759 5.51037 8.82484L5.85415 6.86753L4.39577 5.47966C4.11231 5.20916 4.26665 4.7305 4.65302 4.67584L6.67809 4.38837L7.58168 2.60091C7.74099 2.28506 8.25915 2.28506 8.41843 2.60091L9.32202 4.38837L11.3471 4.67584C11.7334 4.73047 11.8877 5.20916 11.6043 5.47963ZM8.00002 13.1244C6.81512 13.1244 5.69934 12.827 4.71893 12.3072V15.5305C4.71893 15.9056 5.13874 16.1278 5.44765 15.9205L8.00002 14.2191L10.5524 15.9206C10.8627 16.1275 11.2811 15.9051 11.2811 15.5306V12.3072C10.3007 12.827 9.18493 13.1244 8.00002 13.1244Z"
            fill="#A391E2"
          />
        </svg>

        <Typography
          textAlign="center"
          mt={0.1}
          ml={0.4375}
          fontWeight={600}
          color="white"
          fontSize={14}
        >
          Rewards
        </Typography>
      </Box>

      <svg
        onClick={onClose}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        style={{ height: 20, width: 20, color: 'var(--pale-violet-200)', cursor: 'pointer' }}
        aria-label="Close Icon"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </Box>
  );
};
