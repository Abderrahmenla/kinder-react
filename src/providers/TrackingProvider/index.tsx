import { FC, createContext, useContext } from 'react';
import { Props, TrackingController, UserDepositArgs } from './TrackingProviderTypes';

const TrackingContext = createContext<TrackingController>({} as TrackingController);

const TrackingContextProvider: FC<Props> = ({ children }) => {
  const handleTrackUserRegister = (userId?: string) => {
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'user_register',
        userId: userId
      });
    }
  };

  const handleTrackUserLogin = (userId?: string) => {
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'login',
        userId: userId
      });
    }
  };

  const handleTrackFirstUserDeposit = (args: UserDepositArgs) => {
    if (typeof window !== 'undefined') {
      const { value, currency, gameCategory, gameName, userId } = args;
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'first_deposit',
        value: value,
        currency: currency,
        game_category: gameCategory,
        game_name: gameName,
        userId: userId
      });
    }
  };

  const handleTrackUserDeposit = (args: UserDepositArgs) => {
    if (typeof window !== 'undefined') {
      const { value, currency, gameCategory, gameName, userId } = args;
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'deposit',
        value: value,
        currency: currency,
        game_category: gameCategory,
        game_name: gameName,
        userId: userId
      });
    }
  };

  return (
    <TrackingContext.Provider
      value={{
        handleTrackFirstUserDeposit,
        handleTrackUserDeposit,
        handleTrackUserLogin,
        handleTrackUserRegister
      }}
    >
      {children}
    </TrackingContext.Provider>
  );
};

export const useTrackingContext = () => useContext(TrackingContext);
export default TrackingContextProvider;
