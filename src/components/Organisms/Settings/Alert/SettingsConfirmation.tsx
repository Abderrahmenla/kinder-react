import { ConfirmationAlert } from '@/components/Atoms/ConfirmationAlert';

interface Props {
  onClose: VoidFunction;
  onConfirm: VoidFunction;
  isLoading?: boolean;
  caption: string;
  loaderType?: 'coin' | 'logo';
}

const SettingsConfirmation = ({ onClose, onConfirm, isLoading, loaderType, caption }: Props) => {
  return (
    <ConfirmationAlert
      isLoading={isLoading || false}
      loaderType={loaderType || 'coin'}
      onClose={onClose}
      onConfirm={onConfirm}
      caption={caption}
      title="Are you sure?"
      IconComponent={
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Settings Confirmation Icon"
        >
          <g id="Ic_warning">
            <path
              id="Vector"
              d="M5.45001 42C5.08334 42 4.75001 41.9083 4.45001 41.725C4.15001 41.5417 3.91667 41.3 3.75001 41C3.58334 40.7 3.49167 40.375 3.47501 40.025C3.45834 39.675 3.55001 39.3333 3.75001 39L22.25 7C22.45 6.66667 22.7083 6.41667 23.025 6.25C23.3417 6.08333 23.6667 6 24 6C24.3333 6 24.6583 6.08333 24.975 6.25C25.2917 6.41667 25.55 6.66667 25.75 7L44.25 39C44.45 39.3333 44.5417 39.675 44.525 40.025C44.5083 40.375 44.4167 40.7 44.25 41C44.0833 41.3 43.85 41.5417 43.55 41.725C43.25 41.9083 42.9167 42 42.55 42H5.45001ZM24 36C24.5667 36 25.0417 35.8083 25.425 35.425C25.8083 35.0417 26 34.5667 26 34C26 33.4333 25.8083 32.9583 25.425 32.575C25.0417 32.1917 24.5667 32 24 32C23.4333 32 22.9583 32.1917 22.575 32.575C22.1917 32.9583 22 33.4333 22 34C22 34.5667 22.1917 35.0417 22.575 35.425C22.9583 35.8083 23.4333 36 24 36ZM24 30C24.5667 30 25.0417 29.8083 25.425 29.425C25.8083 29.0417 26 28.5667 26 28V22C26 21.4333 25.8083 20.9583 25.425 20.575C25.0417 20.1917 24.5667 20 24 20C23.4333 20 22.9583 20.1917 22.575 20.575C22.1917 20.9583 22 21.4333 22 22V28C22 28.5667 22.1917 29.0417 22.575 29.425C22.9583 29.8083 23.4333 30 24 30Z"
              fill="#FFD70C"
            />
          </g>
        </svg>
      }
    />
  );
};

export default SettingsConfirmation;
