import Alert from '@/components/Atoms/Alert';

interface Props {
  duration?: number;
  message: string;
}

export const SuccessAlert = ({ duration = 0, message }: Props) => {
  return (
    <Alert
      duration={duration}
      message={message}
      icon={
        <svg
          width="47"
          height="47"
          viewBox="0 0 47 47"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Successfully"
        >
          <circle cx="23.5" cy="23.5" r="23.5" fill="#00F566" />
          <path
            d="M36.3327 22.3722C37.1709 29.2246 32.2954 35.4592 25.4429 36.2974C18.5904 37.1356 12.3559 32.26 11.5177 25.4075C10.6795 18.555 15.555 12.3205 22.4075 11.4823C25.4862 11.1057 28.4402 11.8825 30.8361 13.4737"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M18 21.5L23.5 28L33.5 17"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      }
    />
  );
};
