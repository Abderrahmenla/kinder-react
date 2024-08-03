export interface ITournamentData {
  active: ITournamentDetail[];
  recently_finished: ITournamentDetail[];
}

export interface ITournamentDetail {
  id: number;
  human_id: string;
  name: string;
  type: string;
  opt_in_method: string;
  status: string;
  starts_at: string;
  ends_at: string;
  image: string;
  terms: string;
  game_ids: string[];
  hidden: boolean;
  tournament: {
    minimum_bet: string;
    type: string;
    leaderboard: ILeaderboardEntry[];
    prizes: IPrize[];
    tasks: ITask[];
  };
}

export interface ILeaderboardEntry {
  player_id: string;
  player_username: string;
  score: string;
}

export interface IPrize {
  title: string;
  place_from: number;
  place_to: number;
}

export interface ITask {
  id: number;
  order: number;
  points: number;
  title: {
    title: string;
    subtitle: string | null;
    type: string;
  };
  max_points_per_campaign: number | null;
}

export interface IPlayerData {
  player_username: string;
  score: string;
  player_id: string;
}
