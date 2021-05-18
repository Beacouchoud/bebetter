export interface IUser {
  _id: string;
  username: string;
  name: string;
  email: string;
  password: string;
  img: string;
  sessionId?: string;
}
