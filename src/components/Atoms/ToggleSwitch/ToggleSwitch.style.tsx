import styled from '@emotion/styled';

export const SwitchContainer = styled('label')({
  display: 'inline-block',
  borderRadius: '30px',
  cursor: 'pointer',
  userSelect: 'none'
});

export const SwitchInput = styled('input')({
  display: 'none'
});

export const SwitchBackground = styled('span')<{ isChecked: boolean }>(({ isChecked }) => ({
  position: 'absolute',
  top: '5px',
  left: '5px',
  width: '41px',
  height: '24px',
  backgroundColor: isChecked ? 'var(--pure-blue)' : 'var(--very-dark-des-violet)',
  borderRadius: '30px'
}));

export const SwitchSlider = styled('span')<{ isChecked: boolean }>(({ isChecked }) => ({
  display: 'block',
  width: '18px',
  height: '18px',
  backgroundColor: 'var(--white)',
  borderRadius: '50%',
  position: 'absolute',
  transition: 'left 0.3s',
  top: '8px',
  left: isChecked ? '24px' : '8px'
}));
