import React, { ReactNode } from 'react';
import { CategoryContainer } from '@/components/Molecules/Casino/Casino.styles';

export interface CategoryInfoProps {
  children: ReactNode;
}
export const CategoryInfo: React.FC<CategoryInfoProps> = ({ children }) => {
  return <CategoryContainer>{children}</CategoryContainer>;
};
