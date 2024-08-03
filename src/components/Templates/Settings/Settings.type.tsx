import { IconProps } from '@/components/Atoms/Icons/Icon.types';

export interface MenuItem {
  label: string;
  href?: string;
  slug: string;
  imageComponent?: ({ width, height, fill }: IconProps) => JSX.Element;
}

export interface SettingsProps {
  activeSlug: string;
}
