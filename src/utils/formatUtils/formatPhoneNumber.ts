export const formatPhoneNumber = (phoneNumber: string): string => {
  // Remove all non-digit characters
  const cleanNumber = phoneNumber.replace(/\D/g, '');

  // Add spaces after every third and sixth number
  const formattedNumber = cleanNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');

  return formattedNumber;
};

export const getNumberWithoutDialCode = (dial_code: string, mobilePhone: string) => {
  const dialcodeWithoutPlusSign = dial_code.replace('+' ?? '', '');
  const phoneWithoutPlusSign = mobilePhone?.replace('+' ?? '', '');
  return phoneWithoutPlusSign?.substring(dialcodeWithoutPlusSign.length);
};
