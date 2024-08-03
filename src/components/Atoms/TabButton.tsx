import { ButtonContainer } from './TabButtonStyle';

interface ToggleButtonProps {
  name: string;
  onClick?: () => void;
}

export const TabButton: React.FC<ToggleButtonProps> = ({ name, onClick }) => {
  return (
    <ButtonContainer>
      <a data-form={name} onClick={onClick}>
        {name}
      </a>
    </ButtonContainer>
  );
};
