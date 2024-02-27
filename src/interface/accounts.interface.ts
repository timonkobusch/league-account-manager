interface QueueData {
  league: string;
  lp: number;
  win: number;
  lose: number;
}
export interface Data {
  solo?: QueueData;
  flex?: QueueData;
}

export type Account = {
  username: string;
  password: string;
  server: string;
  displayName: string;
  displayTag: string;
  data?: Data;
};
