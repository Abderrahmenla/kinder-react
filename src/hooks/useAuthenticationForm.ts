import { ForgotPasswordInput, IFormValues, SigninFormInput } from '@/utils/validateFormValues';
import { AxiosError, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import { useCallback, useState } from 'react';
import { apiClient } from 'src/services/clientAxios';
import { DEFAULT_LOCALE } from '@/constants/index';

export interface ErrorResponse {
  error?: string;
  errorMessage?: string;
}
function useAuthenticationForm() {
  const [isLoading, setIsloading] = useState(false);
  const localeFromCookie = Cookies.get('NEXT_LOCALE');

  const handleSignIn = useCallback(
    async (
      formInputs: SigninFormInput,
      successCallback: (data: AxiosResponse) => void,
      errorCallback: (error: AxiosError<ErrorResponse>) => void
    ) => {
      setIsloading(true);
      try {
        const playerData = {
          userName: formInputs.usernameOrEmail,
          password: formInputs.password
        };
        const data = await apiClient.post('/api/player/signin', playerData);
        successCallback(data);
      } catch (error) {
        errorCallback(error as AxiosError<ErrorResponse>);
      } finally {
        setIsloading(false);
      }
    },
    []
  );

  const handleRegister = useCallback(
    async (
      formInputs: IFormValues,
      successCallback: (data: AxiosResponse) => void,
      errorCallback: (error: AxiosError<ErrorResponse>) => void
    ) => {
      const affiliateId = Cookies.get('affiliateId');
      const AffCampaign = Cookies.get('AffCampaign');
      const token = Cookies.get('token');
      let ref = Cookies.get('ref');
      ref = ['undefined', undefined, null, 'null', ''].includes(ref) ? undefined : ref;
      let promoCode = Cookies.get('promoCodeToken');

      promoCode = ['undefined', undefined, null, 'null', ''].includes(promoCode)
        ? undefined
        : promoCode;

      setIsloading(true);

      try {
        const {
          email,
          password,
          username,
          dateOfBirth,
          currency,
          countryCode,
          mobilePhone,
          marketingOpt
        } = formInputs;

        const profanityCheckRequest = {
          playerDataList: [
            {
              Type: 'BannedWords',
              Value: username
            }
          ]
        };
        const trackingSource = {
          marketingChannel: 'Affiliate',
          marketingSource: affiliateId ? affiliateId : null,
          campaignName: AffCampaign ? AffCampaign : null,
          btag: token
        };

        await apiClient.post('/api/player/validateProfaneWords', profanityCheckRequest);

        const playerData = {
          eMail: email,
          password: password,
          userName: username,
          dateOfBirth: dateOfBirth,
          firstName: 'john',
          lastName: 'doe',
          currencyCode: currency,
          locale: localeFromCookie?.toLowerCase() || DEFAULT_LOCALE,
          portalId: 1,
          title: 1,
          countryCode: countryCode,
          mobilePhone,
          receiveNews: true
        };

        const marketingPromotions = {
          receiveEmailFromOperator: true,
          receiveSMSFromOperator: true,
          receiveExclusiveOffersAndBonuses: true,
          receiveEmailFromThirdParty: true,
          receiveSMSFromThirdParty: true,
          blockAll: !marketingOpt, // Marketing Opt Promotions
          doNotCall: true,
          optinProfiling: true,
          receiveLandBasedRetailInfo: true,
          receiveLoginNotification: true,
          contactPrefChannels: {
            email: true,
            sms: true,
            post: true,
            telephone: true,
            im: true,
            popupInbox: true
          },
          productTypes: [
            {
              productTypeId: 0,
              recievePromoEmail: true
            }
          ]
        };

        const data = await apiClient.post('/api/player/register', {
          player: playerData,
          agentReferenceCode: ref,
          couponCode: promoCode,
          trackingSource
        });

        await apiClient.put('/api/player/contactPreferences', marketingPromotions);

        successCallback(data);
      } catch (error) {
        errorCallback(error as AxiosError<ErrorResponse>);
      } finally {
        setIsloading(false);
      }
    },
    []
  );

  const handleForgotPassword = useCallback(
    async (
      formInputs: ForgotPasswordInput,
      successCallback: () => void,
      errorCallback: (error: AxiosError<ErrorResponse>) => void
    ) => {
      setIsloading(true);
      try {
        const {
          email: { value: email }
        } = formInputs;
        await apiClient.post('/api/player/forgot', { email });
        successCallback();
      } catch (error) {
        errorCallback(error as AxiosError<ErrorResponse>);
      } finally {
        setIsloading(false);
      }
    },
    []
  );

  return {
    isLoading,
    handleSignIn,
    handleRegister,
    handleForgotPassword
  };
}

export default useAuthenticationForm;
