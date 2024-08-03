import React, { useCallback, useEffect, useState } from 'react';
import { TabsProps } from './Tabs.type';
import { TabButton, TabLabel, TabsContainer } from './Tabs.style';

const Tabs: React.FC<TabsProps> = ({ tabOptions, tabOnclickHandler, className, buttonStyle }) => {
  const [tabs, setTabs] = useState(tabOptions);
  const [selectedTab, setSelectedTab] = useState(
    () => tabOptions.find(({ isActive }) => isActive)?.name || tabOptions[0].name
  );

  const handleOnclick = useCallback(
    (tabName: string) => {
      setSelectedTab(tabName);
      tabOnclickHandler(tabName);
    },
    [tabs, setSelectedTab, tabOnclickHandler]
  );

  useEffect(() => {
    setTabs(tabOptions);
  }, [tabOptions]);

  useEffect(() => {
    setSelectedTab(tabOptions.find((tab) => tab.isActive)?.name ?? tabOptions[0].name);
  }, []);

  return (
    <TabsContainer className={className}>
      {tabs.map((tab) => (
        <TabButton
          key={tab.label}
          isActive={tab.name === selectedTab}
          onClick={() => handleOnclick(tab.name)}
          buttonStyle={buttonStyle}
        >
          <TabLabel size="b2">{tab.label}</TabLabel>
        </TabButton>
      ))}
    </TabsContainer>
  );
};

export default Tabs;
