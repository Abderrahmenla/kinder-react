import React from 'react';
import { styled } from '@mui/material/styles';
import { ButtonComponent } from '@/components/Atoms';
import { TextComponent } from '@/components/Atoms';

const AddButtonStyled = styled(ButtonComponent, {
  shouldForwardProp: (prop) => prop !== 'isloading'
})(({ isloading }: { isloading?: boolean }) => ({
  padding: '18px 20px 16px 20px ',
  background: isloading
    ? '#5C42A6'
    : 'linear-gradient(180deg, var(--yellow) 0%, rgb(255, 189.25, 20.19) 99.48%)',
  borderRadius: '58px',
  display: 'flex',
  minWidth: '207px',
  marginRight: '21px',
  cursor: isloading ? 'not-allowed' : 'pointer'
}));

const AddButtonText = styled(TextComponent)({
  fontStyle: 'normal',
  color: 'var(--very-dark-violet-400)',
  fontWeight: 700,
  fontSize: 'var(--font-size-14)',
  boxShadow: '0px 0px 10px rgba(255, 222, 9, 0.7)',
  lineHeight: 'var(--l-height-13)',
  textAlign: 'center',
  letterSpacing: 'var(--lt-spacing)',
  textTransform: 'uppercase',
  flex: 'none',
  order: 1,
  flexGrow: 0
});

type BetButtonProps = {
  text: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  dataTestId?: string;
  isloading?: boolean;
  style?: React.CSSProperties;
  className?: string; // added className prop
  disabled?: boolean;
};

export const AddButton: React.FC<BetButtonProps> = ({
  text,
  onClick,
  dataTestId,
  isloading,
  style,
  className,
  disabled
}) => {
  return (
    <AddButtonStyled
      data-testid={dataTestId}
      onClick={onClick}
      isloading={isloading}
      style={style}
      className={className}
      disabled={disabled}
    >
      <AddButtonText text={text} />
    </AddButtonStyled>
  );
};
