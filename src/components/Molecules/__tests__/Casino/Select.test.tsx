import React from 'react';
import { render } from '@testing-library/react';
import Select from '@/components/Molecules/Casino/Select';
import { RecoilRoot } from 'recoil';

jest.mock('@mui/material', () => ({
  SelectChangeEvent: 'mockedSelectChangeEvent'
}));

describe('Select', () => {
  test('renders without errors', () => {
    render(
      <RecoilRoot>
        {/* eslint-disable-next-line @typescript-eslint/no-empty-function */}
        <Select providers={[]} selectedProvider="All Providers" onProviderChange={() => {}} />
      </RecoilRoot>
    );
  });
});
