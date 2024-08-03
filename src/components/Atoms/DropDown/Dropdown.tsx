import React, { useState, ReactNode, CSSProperties, useCallback, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import {
  DropDownListContainer,
  DropDownListItem,
  DropdownContainer,
  DropDownListWrapper,
  DropDownPolygonContainer,
  IconContainer,
  Icon,
  IconLabel
} from './DropdownStyles';
import Image from 'next/image';
import { assets } from '@/config/assets';
import { Tooltip } from '@mui/material';

type DropDownIconProps = {
  isExpanded: boolean;
};
type T = Record<string, any>;

export type DropdownItem = {
  label?: string;
  image?: string;
};

export type DropDownListProps = {
  dropdownItems: T[];
  styleDropdownList?: CSSProperties;
  styleDropdownListItemStyle?: (item: T) => CSSProperties;
  renderContent: (item: T, index?: number) => ReactNode;
  isVisible: boolean;
  polygonLogoLeft?: string;
  polygonLogoUrl?: string;
  size: 'XL' | 'L' | 'M' | 'S';
  isDropdownListLogo?: boolean;
  activeIndex?: number;
  activeDropdownItem?: boolean;
  handleItemClick?: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    item: T,
    index: number
  ) => void;
  hasDropDownAnimation?: boolean;
};

export type DropDownProps = {
  /**
   * Optional URL for the icon displayed in the dropdown. This can be used to visually
   * represent the type of content or actions available in the dropdown.
   */
  icon?: string;
  iconRounded?: boolean;
  activeDropdownItem?: boolean;
  /**
   * Optional tooltip.
   */
  isTooltip?: boolean;

  /**
   * Optional tooltip.
   */
  tooltipText?: string;
  activeIndex?: number;
  /**
   * label text for the dropdown. This label typically indicates the purpose
   * or content of the dropdown to the user.
   * Example: label="Select an Option"
   */
  label?: string;

  /**
   * Optional CSS style properties to customize the appearance of the outer container of the dropdown. It allows
   * for styling aspects like backgroundColor, spacing, etc.
   * Example: style={{ backgroundColor: 'blue', padding : '10px' }}
   */

  style?: CSSProperties;

  /**
   * Optional CSS style properties specifically for the dropdown list element. This can be
   * used to style the list that appears when the dropdown is expanded, such as its background,
   * spacing, and borders.
   * Example: styleDropdownList={{ backgroundColor: 'lightgrey' }}
   */
  styleDropdownList?: CSSProperties;

  /**
   * When set to true, the icon (if provided) will be positioned on the left side of the dropdown.
   * Otherwise, the icon will not be shown on the left.
   * Example: leftPositionIcon={true}
   */
  leftPositionIcon?: boolean;

  /**
   * When set to true, the icon (if provided) will be positioned on the right side of the dropdown.
   * This is typically used for icons that indicate the presence of a dropdown or additional content.
   * Example: rightPositionIcon={true}
   */
  rightPositionIcon?: boolean;

  /**
   * If set to true, the dropdown list will automatically close after an item in the dropdown is clicked.
   * This is useful for single-selection dropdowns where a selection should confirm the choice and close the list.
   * Example: closeDropdownListAfterItemClick={true}
   */
  closeDropdownListAfterItemClick?: boolean;

  /**
   * Determines whether a caret icon should be displayed, typically used to indicate that the dropdown
   * can be expanded or collapsed. When true, the caret icon is shown.
   * Example: caret={true}
   */
  caret?: boolean;

  /**
   * Controls the visibility state of the dropdown list. When set to true, the list is visible; when false,
   * it is hidden. This can be used to programmatically control the display of the dropdown content.
   * Example: isVisible={this.state.isDropdownVisible}
   */
  isVisible?: boolean;

  /**
   * An array of items to display in the dropdown list. Each item in the array represents a single option
   * or piece of content that can be selected or interacted with in the dropdown.
   * Example: dropdownItems={[{ label: 'Item 1', value: '1' }, { label: 'Item 2', value: '2' }]}
   */
  dropdownItems: T[];
  /**
   * An optional function that provides custom CSS properties for styling each item in the dropdown list.
   * This function receives the item as a parameter and should return an object of CSS properties.
   * Example:
   * styleDropdownListItemStyle={(item) => ({ backgroundColor: item.isActive ? 'green' : 'red' })}
   */
  styleDropdownListItemStyle?: (item: T) => CSSProperties;

  /**
   * Optional CSS style properties for the dropdown. It allows customization of the
   * container element that encloses the dropdown label, icon, and list.
   * Example: styleDropdown={{ padding: '10px', border: '1px solid grey' }}
   */
  styleDropdown?: CSSProperties;

  /**
   * An optional callback function that is invoked when the visibility of the dropdown list changes. The function
   * receives the new visibility state (true or false) as a parameter.
   * Example: onVisibilityChange={(isVisible) => console.log('Dropdown visibility:', isVisible)}
   */
  onVisibilityChange?: (visibility?: boolean) => void;

  /**
   * An optional class name to be added to the dropdown container element. This can be used to apply custom styling
   * defined in an external stylesheet.
   * Example: className="my-custom-dropdown"
   */
  className?: string;

  /**
   * An optional props to render dropdownn list logo if true renders a logo.
   * Example: isDropdownListLogo=false
   */
  isDropdownListLogo?: boolean;

  /**
   * An optional props to give styling to dropdown list polygon logo .
   * Example:
   */
  polygonLogoLeft?: string;

  /**
   * An optional props to give custom url for polygon logo .
   * Example: `{assets}/images/polygon.svg`
   */
  polygonLogoUrl?: string;
  /**
   * Specifies the size of the dropdown, with predefined options 'XL', 'L', 'M', or 'S'. This size can affect
   * various aspects of the dropdown's appearance, such as padding, font size, and overall dimensions.
   * Example: size="M"
   */
  size?: 'XL' | 'L' | 'M' | 'S';

  /**
   * A mandatory function that defines how to render the content of each dropdown item. This function receives
   * each item as a parameter and should return a ReactNode representing the item's content in the UI.
   * renderContent={(item) => <span>{item.label}</span>}
   */
  renderContent: (item: T) => ReactNode;

  /**
   * An optional function that handles click events on the items in the dropdown list. It receives the click event
   * and the clicked item as parameters. This can be used to define custom behavior when an item is selected.
   * handleItemClick={(e, item) => console.log('Clicked item:', item)}
   */
  handleItemClick?: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    item: T,
    index?: number
  ) => void;

  hasDropDownAnimation?: boolean;
};

export const DropDownIcon = ({ isExpanded }: DropDownIconProps) => (
  <Image
    src={
      isExpanded
        ? `${assets}/images/dropdown/upCaret.svg`
        : `${assets}/images/dropdown/downCaret.svg`
    }
    height={20}
    width={20}
    alt="caret"
  />
);

const PopperProps = {
  sx: {
    '& .MuiTooltip-tooltip': {
      color: 'white',
      backgroundColor: '#3C2A63',
      height: 35,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 14,
      fontWeight: 500,
      fontFamily: 'Inter'
    },
    '& .MuiTooltip-arrow': {
      '&::before': {
        backgroundColor: '#3C2A63'
      }
    }
  }
};

const RenderIconAndLabel = ({
  icon,
  rounded,
  leftPositionIcon,
  rightPositionIcon = false,
  label
}: {
  icon?: string;
  rounded?: boolean;
  label?: string;
  leftPositionIcon?: boolean;
  rightPositionIcon?: boolean;
}) => {
  return (
    <IconContainer>
      {icon && leftPositionIcon && <Icon src={icon} rounded={rounded} />}
      <IconLabel>{label}</IconLabel>
      {icon && rightPositionIcon && <Icon src={icon} rounded={rounded} />}
    </IconContainer>
  );
};

export const DropDownList = ({
  dropdownItems,
  handleItemClick,
  renderContent,
  styleDropdownList,
  isDropdownListLogo = false,
  styleDropdownListItemStyle,
  polygonLogoLeft,
  size,
  isVisible,
  activeDropdownItem,
  activeIndex: externalActiveIndex,
  hasDropDownAnimation,
  polygonLogoUrl
}: DropDownListProps) => {
  const [internalActiveIndex, setInternalActiveIndex] = useState(0);
  const handleCardClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    dropdownItem: DropdownItem,
    index: number
  ) => {
    e.preventDefault();
    if (externalActiveIndex === undefined) {
      setInternalActiveIndex(index);
    }
    if (handleItemClick) {
      handleItemClick(e, dropdownItem, index);
    }
  };
  useEffect(() => {
    if (externalActiveIndex !== undefined) {
      setInternalActiveIndex(externalActiveIndex);
    }
  }, [externalActiveIndex]);
  const currentActiveIndex =
    externalActiveIndex !== undefined ? externalActiveIndex : internalActiveIndex;
  return (
    <AnimatePresence>
      <DropDownListWrapper
        isVisible={isVisible}
        initial={hasDropDownAnimation ? { opacity: 0, height: 0 } : ''}
        animate={hasDropDownAnimation ? { opacity: 1, height: 'auto' } : ''}
        exit={hasDropDownAnimation ? { opacity: 0, height: 0 } : {}}
        transition={hasDropDownAnimation ? { duration: 0.3 } : {}}
      >
        {isDropdownListLogo && (
          <DropDownPolygonContainer
            left={polygonLogoLeft}
            isVisible={dropdownItems.length > 0}
            className="dropdown-polygon"
          >
            <Image
              src={polygonLogoUrl ?? `${assets}/images/polygonIcon.svg`}
              height={19}
              width={19}
              alt="poly"
            />
          </DropDownPolygonContainer>
        )}
        <DropDownListContainer
          style={styleDropdownList}
          isIcon={isDropdownListLogo}
          isVisible={isVisible}
        >
          {dropdownItems.length > 0 &&
            dropdownItems.map((dropdownItem, index) => (
              <DropDownListItem
                key={index}
                size={size}
                activeDropdownItem={activeDropdownItem}
                style={styleDropdownListItemStyle ? styleDropdownListItemStyle(dropdownItem) : {}}
                onClick={(e) => handleCardClick(e, dropdownItem, index)}
                active={index === currentActiveIndex}
                isCategoryHeader={dropdownItem.isCategoryHeader}
              >
                {renderContent && renderContent(dropdownItem, index)}
              </DropDownListItem>
            ))}
        </DropDownListContainer>
      </DropDownListWrapper>
    </AnimatePresence>
  );
};

export const DropDown = ({
  dropdownItems,
  handleItemClick,
  renderContent,
  icon,
  iconRounded,
  className,
  style,
  isDropdownListLogo,
  styleDropdownList,
  styleDropdownListItemStyle,
  styleDropdown,
  caret = true,
  leftPositionIcon = true,
  rightPositionIcon = false,
  size = 'XL',
  label,
  isTooltip = false,
  tooltipText,
  activeIndex,
  closeDropdownListAfterItemClick = false,
  onVisibilityChange,
  polygonLogoLeft,
  polygonLogoUrl,
  isVisible: externalVisible,
  activeDropdownItem,
  hasDropDownAnimation = true
}: DropDownProps) => {
  const [isActive, setIsActive] = useState(false);
  const [internalVisible, setInternalVisible] = useState(false);
  const isDropdownVisible = externalVisible ?? internalVisible;

  const toggleDropdown = useCallback(() => {
    const newVisibility = !isDropdownVisible;
    setInternalVisible(newVisibility);
    onVisibilityChange?.(newVisibility);
  }, [isDropdownVisible, onVisibilityChange]);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>, item: DropdownItem, index?: number) => {
      handleItemClick?.(event, item, index);
      if (closeDropdownListAfterItemClick) {
        setInternalVisible(false);
      }
      setIsActive(true);
    },
    [handleItemClick, closeDropdownListAfterItemClick]
  );

  const content = (
    <DropdownContainer
      onClick={toggleDropdown}
      style={styleDropdown}
      size={size}
      className={`${className} ${isActive ? 'active' : ''}`.trim()}
    >
      <RenderIconAndLabel
        icon={icon}
        rounded={iconRounded}
        label={label}
        leftPositionIcon={leftPositionIcon}
        rightPositionIcon={rightPositionIcon}
      />
      {caret && <DropDownIcon isExpanded={isDropdownVisible} />}
    </DropdownContainer>
  );

  return (
    <div style={style}>
      {isTooltip ? (
        <Tooltip title={tooltipText} placement="right" arrow PopperProps={PopperProps}>
          {content}
        </Tooltip>
      ) : (
        content
      )}
      <DropDownList
        hasDropDownAnimation={hasDropDownAnimation}
        isVisible={isDropdownVisible}
        polygonLogoLeft={polygonLogoLeft}
        dropdownItems={dropdownItems}
        handleItemClick={handleClick}
        size={size}
        activeIndex={activeIndex}
        activeDropdownItem={activeDropdownItem}
        styleDropdownListItemStyle={styleDropdownListItemStyle}
        isDropdownListLogo={isDropdownListLogo}
        polygonLogoUrl={polygonLogoUrl}
        styleDropdownList={styleDropdownList}
        renderContent={renderContent}
      />
    </div>
  );
};
