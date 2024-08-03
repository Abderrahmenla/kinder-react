import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

interface FormBackButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const BackIcon = () => {
  return (
    <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15 6.96606H1M1 6.96606L7 0.988281M1 6.96606L7 12.9438"
        stroke="#0092FF"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const BackButton = styled(Button)({
  marginTop: '22px',
  height: '42px',
  borderRadius: '58px',
  width: '190px',
  padding: '24px',
  fontSize: 'var(--font-size-14)',
  lineHeight: 'var(--l-height-13)',
  letterSpacing: 'var(--lt-spacing)',
  fontWeight: 700
});

const FormBackButton: React.FC<FormBackButtonProps> = ({ onClick }) => {
  return (
    <BackButton
      data-testid="back-button"
      color="primary"
      disabled={false}
      size="large"
      variant="outlined"
      onClick={onClick}
    >
      <BackIcon />
      &nbsp;&nbsp;GO BACK
    </BackButton>
  );
};

export default FormBackButton;
