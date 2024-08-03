interface PromotionState {
  open: boolean;
}
export interface PromotionsModalProps {
  open: boolean;
  setOpenPromotions: React.Dispatch<React.SetStateAction<PromotionState>>;
}
