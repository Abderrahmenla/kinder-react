import { HELP_CENTER_URL } from '@/constants/index';
import { FooterMenuData } from './FooterTypes';

export const footerMenuData: FooterMenuData = {
  order: {
    footer: ['casino', 'sports', 'promo', 'support', 'contacts']
  },
  items: {
    casino: {
      title: 'casino',
      links: [
        { href: '/casino', text: 'lobby' },
        { href: '/casino/favorites', text: 'favorites', disabled: true },
        { href: '/casino/slots', text: 'slots' },
        { href: '/casino/live-casino', text: 'liveCasino' },
        { href: '/casino/new', text: 'newReleases' },
        { href: '/casino/game-shows', text: 'gameShows' },
        { href: '/casino/blackjack', text: 'blackJack' },
        { href: '/casino/roulette', text: 'roulette' }
      ]
    },
    sports: {
      title: 'sports',
      links: [
        { href: '/sports', text: 'sportsHome' },
        { href: '/sports/live', text: 'live' },
        { href: '/policies/sports-rules', text: 'sportsBookRules' }
      ]
    },
    promo: {
      title: 'promo',
      links: [{ href: '/vip-program', text: 'vip' }]
    },
    support: {
      title: 'support',
      links: [
        { href: HELP_CENTER_URL, text: 'helpCentre' },
        { href: '/faq', text: 'faq' },
        { href: '/policies/terms', text: 'termsAndConditions' },
        { href: '/policies/privacy', text: 'privacyPolicy' },
        { href: '/policies/bonus-terms', text: 'bonusTermsConditions' },
        { href: '/policies/responsible-gambling', text: 'responsibleGambling' },
        { href: '/policies/aml-kyc', text: 'amlkyc' },
        { href: '#', text: 'liveSupport' }
      ]
    },
    contacts: {
      title: 'contacts',
      links: [
        { href: 'mailto:support@spinbet.com', text: 'support@spinbet.com' },
        { href: 'https://t.me/spinbethelp', text: '@spinbethelp', target: '_blank' },
        { href: 'mailto:partners@spinbet.com', text: 'partners@spinbet.com' }
      ]
    }
  }
};
