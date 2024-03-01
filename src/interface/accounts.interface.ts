export interface IQueueData {
  league?: string;
  lp?: number;
  win?: number;
  lose?: number;
}
export interface IData {
  solo?: IQueueData;
  flex?: IQueueData;
}

export type Account = {
  username: string;
  password: string;
  server: string;
  displayName: string;
  displayTag: string;
  data?: IData;
};
