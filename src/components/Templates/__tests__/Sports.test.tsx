import { render, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { addAltenarSportsBook } from '@/mocks/altenar';
import SportsTemplate from '../Sports/Sports';
import { getSportsBookTemplate } from '@/utils/alternarUtils';
import { SPORTS_IDS } from '@/constants/sidebar/sportsfallback';

describe('Sports Page', () => {
  it('invokes altenar script', () => {
    const sportsTemplateProps = getSportsBookTemplate('/sports/overview', []);

    render(
      <RecoilRoot>
        <SportsTemplate {...sportsTemplateProps} />
      </RecoilRoot>
    );

    expect(addAltenarSportsBook).toHaveBeenCalled();
  });

  it('renders sports content and invokes altenar script', () => {
    const sportsTemplateProps = getSportsBookTemplate('/sports/soccer', SPORTS_IDS);

    render(
      <RecoilRoot>
        <SportsTemplate {...sportsTemplateProps} />
      </RecoilRoot>
    );

    expect(addAltenarSportsBook).toHaveBeenCalled();

    expect(screen.getByLabelText('soccer')).toBeVisible();
  });

  it('renders sports championship content and invokes altenar script', () => {
    const sportsTemplateProps = getSportsBookTemplate('/sports/nrl', SPORTS_IDS);

    render(
      <RecoilRoot>
        <SportsTemplate {...sportsTemplateProps} />
      </RecoilRoot>
    );

    expect(addAltenarSportsBook).toHaveBeenCalled();

    expect(screen.getByLabelText('nrl')).toBeVisible();
  });

  it('renders bet history content and invokes altenar script', () => {
    const sportsTemplateProps = getSportsBookTemplate('/sports/my-bets', []);

    render(
      <RecoilRoot>
        <SportsTemplate {...sportsTemplateProps} />
      </RecoilRoot>
    );

    expect(addAltenarSportsBook).toHaveBeenCalled();

    expect(screen.getByLabelText('my-bets')).toBeVisible();
  });
});
