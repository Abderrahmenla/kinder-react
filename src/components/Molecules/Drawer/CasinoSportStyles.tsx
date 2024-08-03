export const containerStyles = (isAuthenticated?: boolean) => ({
  width: '100%',
  marginBottom: isAuthenticated ? 0 : '20px',
  paddingRight: 0,
  display: 'flex',
  justifyContent: 'center'
});
export const switcherStyles = (open: boolean) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: open ? '0 4px' : 0,
  width: open ? '100%' : '36px',
  height: open ? '44px' : 'auto'
});

export const buttonStyles = (open: boolean) => ({
  height: '36px',
  width: open ? 'auto' : '36px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '14px'
});
