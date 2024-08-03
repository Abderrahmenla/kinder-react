export type LimitComponentProps = {
  heading: string;
  description: string;
  activeRange: string;
  isLast?: boolean;
  setActiveRange: (range: string) => void;
  handleOnSave: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent> | undefined) => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: number | undefined;
  isLoading?: boolean;
  limitType?: string;
};
