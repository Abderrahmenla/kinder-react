import { ButtonContainer } from './ToggleButtonStyle';

interface ToggleButtonProps {
  name: string;
  onClick?: () => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ name, onClick }) => {
  return (
    <ButtonContainer>
      <a data-form={name} onClick={onClick}>
        {name}
      </a>
    </ButtonContainer>
  );
};

export default ToggleButton;
