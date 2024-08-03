import React from 'react';
import { render, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { SignInText } from '../../HomePage/SignInText';

describe('SignInText', () => {
  it('should render the SignInText component with the text "Sign in"', () => {
    render(
      <RecoilRoot>
        <SignInText handleOpenAuth={() => null} />
      </RecoilRoot>
    );

    const signInText = screen.getByText('Login');
    expect(signInText).toBeInTheDocument();
  });

  it('should have the correct styles applied to the SignInText component', () => {
    render(
      <RecoilRoot>
        <SignInText handleOpenAuth={() => null} />
      </RecoilRoot>
    );

    const signInText = screen.getByText('Login');

    expect(signInText).toHaveStyle({ fontSize: '14px' });
    expect(signInText).toHaveStyle({ fontWeight: 500 });
    expect(signInText).toHaveStyle({ paddingRight: '24px' });
  });
});
