import { Dispatch, SetStateAction } from 'react';

export interface VerificationCardProps {
  page: string;
  setIsPageOpen: Dispatch<SetStateAction<string>>;
}

export interface VerificatioUploadBoxProps {
  proofComponentName: string;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

interface ProofCategoryObj {
  category: string;
  warningText: string;
}
export interface DocumentProofCategory {
  proofOfAddress: ProofCategoryObj;
  proofOfIdentity: ProofCategoryObj;
  proofOfPayment: ProofCategoryObj;
}
