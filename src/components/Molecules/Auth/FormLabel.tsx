import { FormGroupContainer, Label, Sup } from './FormGroupStyle';

interface FormLabelProps {
  label?: string;
  important?: boolean;
}

const FormLabel: React.FC<FormLabelProps> = ({ label, important, ...props }) => {
  return (
    <FormGroupContainer style={{ marginTop: '30px' }}>
      <Label data-testid="label" htmlFor={label} {...props}>
        {label}
        {important && <Sup>*</Sup>}
      </Label>
    </FormGroupContainer>
  );
};

export default FormLabel;
