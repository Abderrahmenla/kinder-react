import Image from 'next/image';
import ReactHtmlParser from 'react-html-parser';
import {
  ContentDiv,
  PoliciesContainer,
  PoliciesContent,
  PoliciesContentSidebar,
  PoliciesHeading,
  PoliciesSelectedContent,
  TimestampContainer,
  TimestampContainerWrapper
} from './Policies.style';
import { usePolicyContext } from 'src/providers/PolicyProvider';
import formatDate from '@/utils/formatUtils/formatDate';
import { assets } from '@/config/assets';
import { useTranslations } from '@/hooks/useTranslations';

const Policies = () => {
  const { t } = useTranslations();
  const { policies = [], selectedPolicy, handleSelectPolicy } = usePolicyContext();

  return (
    <>
      <PoliciesContainer>
        <PoliciesHeading>{t('policiesHeading')}</PoliciesHeading>
        <PoliciesContent>
          <PoliciesContentSidebar>
            {policies?.map(({ id, attributes }) => {
              const { Name, Slug } = attributes;
              return (
                <li
                  onClick={() =>
                    handleSelectPolicy({
                      id,
                      Slug
                    })
                  }
                  key={id}
                  className={selectedPolicy?.id === id ? 'active' : ''}
                >
                  {selectedPolicy?.id === id ? (
                    <span style={{ marginRight: '10px' }}>
                      <Image
                        width={7}
                        height={12}
                        src={`${assets}/images/policies-right.svg`}
                        alt="Right arrow"
                      />
                    </span>
                  ) : null}
                  <span>{Name}</span>
                </li>
              );
            })}
          </PoliciesContentSidebar>
          <PoliciesSelectedContent>
            <TimestampContainerWrapper>
              <TimestampContainer>
                <Image
                  width={20}
                  height={20}
                  src={`${assets}/images/time.svg`}
                  style={{ marginRight: '12px' }}
                  alt="time"
                />
                <span>
                  {selectedPolicy?.attributes.createdAt &&
                    `${t('effectiveFrom')}: ${formatDate(selectedPolicy.attributes.createdAt)}`}
                  {selectedPolicy?.attributes.updatedAt &&
                    ` | ${t('lastUpdated')}: ${formatDate(selectedPolicy.attributes.updatedAt)}`}
                </span>
              </TimestampContainer>
            </TimestampContainerWrapper>
            {selectedPolicy !== null && (
              <ContentDiv>
                <> {ReactHtmlParser(selectedPolicy?.attributes.Text)} </>
              </ContentDiv>
            )}
          </PoliciesSelectedContent>
        </PoliciesContent>
      </PoliciesContainer>
    </>
  );
};

export default Policies;
