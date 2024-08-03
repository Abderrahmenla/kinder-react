import styled from '@emotion/styled';
import { assets } from '@/config/assets';
import Image from 'next/image';

interface ContainerProps {
  open?: boolean;
  width?: number;
  height?: number;
  color?: string;
  locale?: boolean;
  fontWeight?: number | string;
  fontSize?: number | string;
  marginTop?: number | string;
  isVisible?: boolean;
}

const Container = styled.div<ContainerProps>`
  background: ${(props) => props.color};
  margin-top: ${(props) => (!props.marginTop ? props.marginTop + 'px' : '8px')};
  border: ${(props) => (props.locale ? '1px solid #44386D' : 'none')};
  width: ${(props) =>
    typeof props.width === 'number' ? `${props.width}px` : props.open ? '235px' : '48px'};
  height: ${(props) =>
    typeof props.height === 'number' ? `${props.height}px` : props.open ? '48px' : '48px'};
  color: ${(props) => (typeof props.color === 'number' ? props.color : 'inherit')};
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : '600')};
  font-size: ${(props) => (props.fontSize ? props.fontSize : 'inherit')};
  border-radius: ${(props) => (props.locale ? '48px' : '58px')};
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.locale && props.open ? 'flex-start' : 'center')};
  border-bottom-left-radius: ${(props) => (props.locale && props.isVisible ? '0' : '48px')};
  border-bottom-right-radius: ${(props) => (props.locale && props.isVisible ? '0' : '48px')};
  border-top-left-radius: ${(props) => (props.locale && props.isVisible ? '20px' : '48px')};
  border-top-right-radius: ${(props) => (props.locale && props.isVisible ? '20px' : '48px')};
  border-bottom: ${(props) => (props.locale && props.isVisible ? 'none' : '1px solid #44386D')};
  gap: 8px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0px 0px 0px rgba(255, 222, 9, 0);
  transition: box-shadow 0.3s ease-in-out;
  &:hover {
    box-shadow: ${(props) => (!props.locale ? '0px 0px 10px rgba(255, 222, 9, 0.7)' : 'none')};
  }
`;

const Text = styled.div`
  font-size: 14px;
`;

interface ButtonProps {
  open?: boolean;
  onClick?: () => void;
  icon?: string;
  text?: string;
  width?: number;
  isVisible?: boolean;
  height?: number;
  marginTop?: number;
  marginBottom?: number | string;
  collapsible?: boolean;
  color?: string;
  fontWeight?: number | string;
  fontSize?: number | string;
  dataTestId?: string;
  locale?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  open,
  onClick,
  icon,
  text,
  width,
  height,
  collapsible = true,
  dataTestId,
  color,
  fontWeight,
  fontSize,
  isVisible,
  locale,
  marginTop
}) => {
  return (
    <Container
      color={color}
      fontWeight={fontWeight}
      role="button"
      open={open}
      locale={locale}
      onClick={onClick}
      width={width}
      isVisible={isVisible}
      height={height}
      fontSize={fontSize}
      marginTop={marginTop}
      data-testid={dataTestId}
    >
      {locale ? (
        <>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: open ? '100%' : undefined,
              alignItems: 'center'
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginLeft: open ? '11px' : '0px',
                alignItems: 'center'
              }}
            >
              {icon && (
                <Image src={`${assets}${icon}`} width={28} height={28} alt={`${text} Icon`} />
              )}
              {open && collapsible && (
                <Text style={{ color: '#C8B4FF', marginLeft: '10px' }}>{text}</Text>
              )}
            </div>
            {open && collapsible && (
              <Image
                src={`${assets}/images/down.svg`}
                width={9.8}
                height={8.2}
                alt={`${text} Icon`}
                style={{ marginRight: '14px' }}
              />
            )}
          </div>
        </>
      ) : (
        <>
          {icon && <Image src={`${assets}${icon}`} width={19} height={21} alt={`${text} Icon`} />}
          {open && collapsible && <Text>{text}</Text>}
          {!collapsible && (
            <Text
              style={{
                fontSize: fontSize ? fontSize : 'inherit',
                fontWeight: fontWeight ? fontWeight : 'inherit',
                lineHeight: '13px'
              }}
            >
              {text}
            </Text>
          )}
        </>
      )}
    </Container>
  );
};

export default Button;
