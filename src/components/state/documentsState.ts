import { atom } from 'recoil';

export interface DocumentItem {
  id: number;
  name: string;
  approvalStatus: 'Partial' | 'Approved' | 'Unapproved' | 'Declined';
  creationTime: string;
  expirationTime: string | null;
  documentCategory: number;
}

export const documentsState = atom<DocumentItem[]>({
  key: 'documentsState',
  default: []
});
