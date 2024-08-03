import { db } from '../schema';

export const seedPlayerBonusHistory = () => {
  db.playerBonusHistory.create({
    bonusId: 1,
    status: 'Redeemed'
  });
};
