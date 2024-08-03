import Alert from '@/components/Atoms/Alert';

interface Props {
  duration?: number;
  message?: string;
}

export const BonusInvalidCode = ({ duration = 0, message }: Props) => {
  return (
    <Alert
      duration={duration}
      message={message || 'Invalid Code!'}
      icon={
        <svg
          width="47"
          height="47"
          viewBox="0 0 47 47"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Bonus Invalid Code Icon"
        >
          <circle cx="23.5" cy="23.5" r="23.5" fill="#F53B00" />
          <path
            d="M26.4641 11C24.9245 8.33334 21.0755 8.33333 19.5359 11L10.0096 27.5C8.47002 30.1667 10.3945 33.5 13.4737 33.5H32.5263C35.6055 33.5 37.53 30.1667 35.9904 27.5L26.4641 11Z"
            stroke="white"
            strokeWidth="2"
          />
          <path d="M23 17L23 24" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <circle cx="23" cy="28" r="1" fill="white" />
        </svg>
      }
    />
  );
};
