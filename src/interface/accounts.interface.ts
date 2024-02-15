interface QueueData {
  league: string;
  lp: number;
  win: number;
  lose: number;
}
interface Data {
  solo?: QueueData;
  flex?: QueueData;
}

export type Account = {
  username: string;
  password: string;
  displayName: string;
  displayTag: string;
  data?: Data;
};
