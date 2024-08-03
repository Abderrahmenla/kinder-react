import { SportsIdProps } from '@/components/Templates/Sports/Sports.type';
import { ALTENAR_TEMPLATES } from '@/constants/sidebar/altenarTemplates';

export const getSportsIdBySlug = (slug: string, sports: SportsIdProps[]) => {
  const sportIds = sports.find((sport) => sport.slug === slug);
  return sportIds;
};

export const setAltenarConfig = (
  setup: AltenarWSDKInitParams | AltenarWSDKAddSportsBookParamsPropsObj
) => {
  window['altenarWSDK']?.set({
    ...setup
  });
};

export const initAltenarConfig = (setup: AltenarWSDKInitParams) => {
  window['altenarWSDK']?.init({
    ...setup
  });
};

export const handleRemoveAltenarToken = () => {
  try {
    if (typeof window !== 'undefined') {
      setAltenarConfig({ integration: 'spinbet', token: '' });
    }
  } catch (error) {
    console.error('Error removing Altenar token:', error);
  }
};

export const handleNavigation = () => {
  window.history.pushState({}, '', window.location.href);
};

interface SportsTemplateProps {
  containerId: string;
  sportsBookProps: AltenarWSDKAddSportsBookParamsPropsObj;
}

export const getSportsBookTemplate = (url: string, sportsData: SportsIdProps[]) => {
  const slug = url === '/sports' ? 'overview' : url.replace('/sports/', '');
  let template: SportsTemplateProps = {
    containerId: slug,
    sportsBookProps: {}
  };

  const defaultTemplates = ALTENAR_TEMPLATES;

  if (defaultTemplates[slug as keyof typeof ALTENAR_TEMPLATES]) {
    template = {
      ...template,
      ...defaultTemplates[slug as keyof typeof ALTENAR_TEMPLATES]
    };
  } else {
    const pageData = getSportsIdBySlug(url, sportsData);

    if (pageData) {
      const { sportsId, categoryId, championshipId } = pageData;

      if (categoryId > 0) {
        template = {
          ...template,
          sportsBookProps: {
            page: 'championship',
            categoryIds: [categoryId]
          }
        };
      } else if (championshipId > 0) {
        template = {
          ...template,
          sportsBookProps: {
            page: 'championship',
            championshipIds: [championshipId]
          }
        };
      } else {
        template = {
          ...template,
          sportsBookProps: {
            page: slug === 'horse-racing' ? 'horseRacing' : 'sport',
            sportId: sportsId
          }
        };
      }
    }
  }

  return template;
};
