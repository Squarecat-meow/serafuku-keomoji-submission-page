export interface IAppSecret {
  id: string;
  name: string;
  callbackUrl: string | null;
  permission: string[];
  secret: string;
}

export interface ITokenAndAuthUrl {
  token: string;
  url: string;
}

export interface IUser {
  name: string;
  username: string;
  host: string;
  avatarUrl: string;
  bannerUrl: string;
  roles: {
    id: string;
  }[];
}
