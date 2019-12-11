export interface Event {
  _id?: string;
  name: string;
  users?: [];
  jackpot: number;
  winners?: [];
  questions?: object;
}
