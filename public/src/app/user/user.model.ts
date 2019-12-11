export interface User {
  _id?: string;
  name: string;
  email?: string;
  password: string;
  wallet?: number;
}

export interface Error {
  errors: {
    name?: {message: string},
    email?: {message: string},
    password?: {message: string},
    gift?: {message: string},
    wallet?: {message: string},
  };
}
