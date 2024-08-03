import React, { useState, useEffect } from 'react';
import { DataTable } from '@/components/Organisms/Referral/DataTable/DataTable';
import { PageContainer } from '@/components/Atoms/PageContainer';
import {
  ClaimAvailable,
  ClaimContainer,
  ClaimSuccess,
  ClaimSuccessContainer,
  CopyIcon,
  NoReferralUsers,
  ReferralCode,
  ReferralContainer,
  ReferralCopyCode,
  ReferralCopyCodeTitle,
  ReferralDetails,
  ReferralInnerWrapper,
  ReferralProgramDetails,
  ReferralTitle,
  ReferralWrapper,
  ReferredUsersTableContainer
} from './ReferralLayout.styles';
import { apiClient } from '../../../services/clientAxios';
import { format } from 'date-fns';
import { useLoader } from '@/hooks/useLoader';
import { useTranslations } from '@/hooks/useTranslations';
import Image from 'next/image';
import { assets } from '@/config/assets';
import { useAccountBalance } from '@/hooks/useGetBalance';
import Typography from '@/components/Atoms/Typography/Typography';
import { Button } from '@/components/index';
import ReferralCard from '@/components/Atoms/ReferralCard/ReferralCard';
import { ReferralProps } from '@/components/Organisms/Referral/ReferredUsersTable.types';
import ReactHtmlParser from 'react-html-parser';
import formatCurrency from '@/utils/formatUtils/formatCurrency';

export const ReferralLayout = ({
  code,
  refUrl,
  referredUsers,
  setUserClipBoard,
  referralInfo
}: ReferralProps): JSX.Element => {
  const { t } = useTranslations();
  const [isClaimLoading, setClaimLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [copyCodeMessage, setCopyCodeMessage] = useState<string>('');
  const [claimAmount, setClaimAmount] = useState<number>();
  const { isLoading, toggleLoader, loadingWrapper } = useLoader('coin');
  const { refresh: fetchAccountBalance } = useAccountBalance();
  const [totalWagerAmountSum, setTotalWagerAmountSum] = useState<number>(0);

  useEffect(() => {
    const sum =
      referredUsers?.reduce((acc, cur) => {
        const wagerAmountCasino =
          typeof cur.totalWagerAmountCasino === 'number' ? cur.totalWagerAmountCasino : 0;
        const wagerAmountSB =
          typeof cur.totalWagerAmountSB === 'number' ? cur.totalWagerAmountSB : 0;
        return acc + wagerAmountCasino + wagerAmountSB;
      }, 0) ?? 0;

    setTotalWagerAmountSum(sum);
  }, [referredUsers]);

  const currentDate = new Date();
  const formattedDate = format(currentDate, "yyyy-MM-dd'T'HH:mm:ss.SSSSSSSxxx");

  useEffect(() => {
    toggleLoader(true);
    const getCommisionAmount = async () => {
      try {
        const comissionResult = await apiClient.get('/api/affiliate/commision');
        setClaimAmount(comissionResult?.data?.commissionAmount);
        toggleLoader(false);
      } catch (error) {
        console.error(error);
        toggleLoader(false);
      }
    };
    getCommisionAmount();
  }, [claimAmount]);

  const claimRewards = () => {
    setClaimLoading(true);
    const data = {
      points: claimAmount,
      clientdatetime: formattedDate
    };
    const fetchCategory = async () => {
      try {
        await apiClient.post(`/api/affiliate/convertClaim`, data);
        const comissionResult = await apiClient.get('/api/affiliate/commision');
        await fetchAccountBalance();
        setClaimAmount(comissionResult?.data?.commissionAmount);
        setSuccessMessage(t('amountClaimed'));
        setClaimLoading(false);

        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategory();
  };

  const handleCopyToClipboard = () => {
    if (refUrl) {
      navigator.clipboard.writeText(refUrl).then(() => {
        setUserClipBoard(refUrl);
        setCopyCodeMessage(t('referralClaimed'));
        setTimeout(() => {
          setCopyCodeMessage('');
        }, 3000);
      });
    }
  };

  return (
    <PageContainer>
      <ReferralWrapper>
        {isLoading ? (
          loadingWrapper
        ) : (
          <div data-testid="referral-overview">
            <ReferralTitle>
              <Image
                src={`${assets}/images/referral-small-icon.svg`}
                alt="referral-icon"
                width={16}
                height={16}
              />
              <Typography type="Heading" size="h5" color="#fff">
                {t('referralPage')}
              </Typography>
            </ReferralTitle>
            <ReferralInnerWrapper>
              <ReferralContainer>
                {!!code && (
                  <ReferralCode>
                    <ReferralCopyCodeTitle>
                      <Typography type="Heading" size="h5" color="var(--white)">
                        {t('referral')}
                      </Typography>
                      <span>{t('customReferralCode')}</span>
                    </ReferralCopyCodeTitle>

                    <ReferralCopyCode>
                      <Typography size="p1" type="Paragraph" color="var(--white-2)">
                        {code}
                      </Typography>
                      <CopyIcon onClick={handleCopyToClipboard}>
                        <Image
                          src={`${assets}/images/copy.svg`}
                          width={16}
                          height={16}
                          alt="copy"
                        />
                      </CopyIcon>
                      {copyCodeMessage && (
                        <ClaimSuccess>
                          {copyCodeMessage}
                          <span>{t('copiedText')}</span>
                        </ClaimSuccess>
                      )}
                    </ReferralCopyCode>
                  </ReferralCode>
                )}
                <ClaimContainer>
                  <Typography type="Heading" size="h5" color="var(--white)">
                    {t('claimAvailable')}
                  </Typography>
                  <ClaimAvailable>
                    <Typography size="p1" type="Paragraph" color="var(--white)">
                      {formatCurrency(claimAmount)}
                    </Typography>
                    {!claimAmount && (
                      <Button variant="Ternary" disabled>
                        {t('claimAvailable')}
                      </Button>
                    )}
                    {!!claimAmount && (
                      <ClaimSuccessContainer>
                        <Button
                          variant="Ternary"
                          handleClick={!isClaimLoading ? claimRewards : undefined}
                        >
                          {isClaimLoading ? `${t('claiming')}...` : t('claimAvailable')}
                        </Button>
                        {successMessage && <ClaimSuccess>{successMessage}</ClaimSuccess>}
                      </ClaimSuccessContainer>
                    )}
                  </ClaimAvailable>
                </ClaimContainer>
              </ReferralContainer>
              <ReferralDetails>
                <ReferralCard
                  name={t('totalUsers')}
                  value={referredUsers && referredUsers.length}
                  icon={`${assets}/images/user-circle.svg`}
                />
                <ReferralCard
                  name={t('totalWagerAmount')}
                  value={formatCurrency(totalWagerAmountSum)}
                  icon={`${assets}/images/wager-icon.svg`}
                />
              </ReferralDetails>
            </ReferralInnerWrapper>
            {referredUsers && referredUsers.length > 0 ? (
              <ReferredUsersTableContainer>
                <Typography type="Heading" size="h5" color="var(--white)">
                  {t('referredUsers')}
                </Typography>
                <DataTable data={referredUsers} />
              </ReferredUsersTableContainer>
            ) : (
              <NoReferralUsers>
                <Typography type="Heading" size="h5" color="var(--white-2)">
                  {t('noReferredUsers')}
                </Typography>
              </NoReferralUsers>
            )}
          </div>
        )}
        <ReferralProgramDetails>
          {ReactHtmlParser(referralInfo as string) as React.ReactNode}
        </ReferralProgramDetails>
      </ReferralWrapper>
    </PageContainer>
  );
};
