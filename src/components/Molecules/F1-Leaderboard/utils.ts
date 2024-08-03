import { css } from '@emotion/react';
import { ITournamentData, ITournamentDetail, IPlayerData } from './types';

export const getBorderStyle = (index: number) => {
  switch (index) {
    case 0:
      return css('border-left: 1px solid var(--Accent-Color-Accent-yellow, #ffd70c)');
    case 1:
      return css('border-left: 1px solid var(--Vip-Bronze, #ca9265)');
    case 2:
      return css('border-left: 1px solid var(--Vip-Silver, #d0cadb)');
    default:
      return css('border-left: 1px solid var(--Purple-Purple-2, #4F397D)');
  }
};

export const getBackgroundStyle = (index: number) => {
  switch (index) {
    case 0:
      return css(
        `background: linear-gradient(270deg, rgba(255, 189, 20, 0) 0%, rgba(255, 189, 20, 0.17) 99.48%), #180c35`
      );
    case 1:
      return css(` background: linear-gradient(270deg, rgba(205, 127, 50, 0) 0%, rgba(205, 127, 50, 0.14) 99.48%),
      #180c35`);
    case 2:
      return css(`background: linear-gradient(270deg, rgba(208, 202, 219, 0) 0%, rgba(208, 202, 219, 0.06) 99.48%),
      #180c35`);
    default:
      return css('');
  }
};

export const extractPlayerData = (data: ITournamentData, filterId: number): IPlayerData[] => {
  const filterTournaments = (tournaments: ITournamentDetail[]) =>
    tournaments.filter((tournament) => tournament.id === filterId);

  const filteredActiveTournaments = filterTournaments(data.active);
  const filteredFinishedTournaments = filterTournaments(data.recently_finished);

  const extractLeaderboard = (tournamentData: ITournamentDetail) => {
    return tournamentData.tournament?.leaderboard &&
      tournamentData.tournament.leaderboard.length > 0
      ? tournamentData.tournament.leaderboard.map((player) => ({
          player_username: player.player_username,
          score: player.score,
          player_id: player.player_id
        }))
      : [];
  };

  const activePlayers =
    filteredActiveTournaments.length > 0 ? extractLeaderboard(filteredActiveTournaments[0]) : [];
  const finishedPlayers =
    filteredFinishedTournaments.length > 0
      ? extractLeaderboard(filteredFinishedTournaments[0])
      : [];

  return [...activePlayers, ...finishedPlayers];
};
