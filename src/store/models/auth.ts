export interface AuthToken {
  accessToken: string;
  accessTokenExpires: string;
  isAdmin: boolean;
  refreshToken: string;
  refreshTokenExpires: string;
  sessionId: string;
  userId: string;
}