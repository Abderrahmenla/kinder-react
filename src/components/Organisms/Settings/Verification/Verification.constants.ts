export const verificationPages = [
  'verificationDetails',
  'proofOfAddress',
  'proofOfIdentity',
  'proofOfPayment'
];

export const documentCategory = {
  proofOfAddress: { category: 'ProofOfAdress', warningText: 'proofOfAddressWarning' },
  proofOfIdentity: { category: 'PhotoID', warningText: 'proofOfIdentityWarning' },
  proofOfPayment: { category: 'ProofOfPaymentMethod', warningText: 'proofOfPaymentWarning' }
};

export const validFileTypes = [
  'image/jpeg',
  'image/png',
  'application/pdf',
  'image/heic',
  'application/msword', // for .doc
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document' // for .docx
];

export const documentCategories = [
  'proofOfIdentity',
  'proofOfAddress',
  'proofOfPayment',
  'depositDeclaration',
  'miscellaneous',
  'uploadedFromPortal'
];
