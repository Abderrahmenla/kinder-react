export type ReferredUserDataItem = {
  createdDate: string;
  totalWagerAmountCasino: number;
  totalWagerAmountSB: number;
  username: string;
};

export interface DataTableProps {
  data: ReferredUserDataItem[];
}

export type ReferralProps = {
  code?: string;
  refUrl?: string;
  userClipBoard?: string;
  claimAmount?: number;
  isLoading?: boolean;
  claimRewards: () => void;
  setUserClipBoard: (textToCopy?: string) => void;
  referredUsers?: ReferredUserDataItem[];
  slug: string;
  successMessage: string;
  referralInfo: string;
};
