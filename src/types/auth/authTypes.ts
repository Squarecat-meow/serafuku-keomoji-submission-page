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
