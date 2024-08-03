import React from 'react';
import ProviderSelect from '@/components/Atoms/ProviderSelect/ProviderSelect';

interface SelectProps {
  providers: string[];
  selectedProvider: string;
  onProviderChange: (provider: string) => void;
}

const Select: React.FC<SelectProps> = ({ providers, selectedProvider, onProviderChange }) => {
  return (
    <ProviderSelect options={providers} value={selectedProvider} onChange={onProviderChange} />
  );
};

export default Select;
