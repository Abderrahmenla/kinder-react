import { render, fireEvent, screen } from '@testing-library/react';
import Signin from '@/components/Organisms/Auth/SignIn';
import { RecoilRoot } from 'recoil';

const handleCloseAuth = jest.fn();
const handleForgetPassword = jest.fn();
describe('Signin', () => {
  it('renders without crashing', () => {
    render(
      <RecoilRoot>
        <Signin handleForgetPassword={handleForgetPassword} handleCloseAuth={handleCloseAuth} />
      </RecoilRoot>
    );
  });

  it('calls handleForgetPass prop when Forgot password link is clicked', () => {
    render(
      <RecoilRoot>
        <Signin handleForgetPassword={handleForgetPassword} handleCloseAuth={handleCloseAuth} />
      </RecoilRoot>
    );

    fireEvent.click(screen.getByText('forgotPassword?')); //Translation key
    expect(handleForgetPassword).toHaveBeenCalledTimes(1);
  });
});
