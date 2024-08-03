import styled from '@emotion/styled';
import { isNearlyWhite, getBackgroundColor } from '../../utils/helpers';

export interface BlockProps {
  color:
    | string
    | (string | [string, string])[]
    | { colors: (string | [string, string])[]; degree: number };
}

export const PaletteContainer = styled.div`
  margin: 20px 0;
`;

export const ColorList = styled.div`
  display: flex;
`;

export const ColorItem = styled.div`
  margin: 10px 0;
  flex: 1;
`;

export const StyledBlock = styled.div<BlockProps>`
  background: ${(props) => getBackgroundColor(props.color)};
  margin: 5px 0;
  padding: 16px 24px;
  display: flex;
  border: ${(props) =>
    isNearlyWhite(Array.isArray(props.color) ? props.color[0] : props.color)
      ? '1px solid #ccc'
      : 'none'};
  align-items: center;
  flex-wrap: wrap;
  color: ${(props) =>
    isNearlyWhite(Array.isArray(props.color) ? props.color[0] : props.color) ? '#000' : '#FFF'};
  box-sizing: border-box;
  h2 {
    width: 100%;
    margin: 0;
    padding-bottom: 10px;
    font-size: 24px;
  }
  h3 {
    font-weight: 400;
    margin: 0;
    font-size: 16px;
  }
`;
