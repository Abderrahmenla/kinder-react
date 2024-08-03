import { useState, useCallback } from 'react';

const useHover = (
  effectsEnabled = false,
  onItemHover: ((itemTitle: string | null) => void) | null = null,
  itemTitle: string | null = null
) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = useCallback(() => {
    if (effectsEnabled) setIsHovered(true);
    if (onItemHover) onItemHover(itemTitle);
  }, [effectsEnabled, onItemHover, itemTitle]);

  const handleMouseLeave = useCallback(() => {
    if (effectsEnabled) setIsHovered(false);
    if (onItemHover) onItemHover(null);
  }, [effectsEnabled, onItemHover]);

  return { isHovered, handleMouseEnter, handleMouseLeave };
};

export default useHover;
