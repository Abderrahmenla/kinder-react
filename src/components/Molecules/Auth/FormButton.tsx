import { FormGroupButtonContainer, FormButton } from './FormButtonStyle';
interface FormGroupButtonProps {
  name: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  isLoading?: boolean;
  variant?: 'sm' | 'base';
  width?: string;
  height?: string;
}

const FormGroupButton: React.FC<FormGroupButtonProps> = ({
  name,
  onClick,
  isLoading,
  variant = 'base',
  width,
  height
}) => {
  return (
    <FormGroupButtonContainer>
      <FormButton
        variant={variant}
        isLoading={isLoading}
        type="submit"
        onClick={onClick}
        data-testid="form-btn"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '11px',
          letterSpacing: '0.33px'
        }}
        width={width}
        height={height}
      >
        {name}
      </FormButton>
    </FormGroupButtonContainer>
  );
};

export default FormGroupButton;
