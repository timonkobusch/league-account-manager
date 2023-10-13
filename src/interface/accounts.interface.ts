interface Queue {
  league: string;
  lp: number;
  win: number;
  lose: number;
}
interface Data {
  solo?: Queue;
  flex?: Queue;
  aram?: { mmr: number };
}

export type Account = {
  username: string;
  password: string;
  displayName: string;
  server: string;
  timesChecked: number;
  data?: Data;
};
