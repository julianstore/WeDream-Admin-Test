export interface Birthdate {
  day: number;
  month: number;
  year: number;
}

export interface Profile {
  bio: string;
  birthdate: Birthdate;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  fullName: string;
  userId: string;
}

export interface Avatar {
  backAccessory: string;
  bottomAccessory: string;
  colorSchemeId: string;
  frontAccessory: string;
  hitpointsAccessory: string;
  topAccessory: string;
  trailsAccessory: string;
}

export interface User {
  userId: string;
  avatar: Avatar;
  displayName: string;
  imageUrl: string;
  isAdmin: boolean;
  isBlocked: boolean;
  isFriend: boolean;
  profile: Profile;
}
export interface UsersResponse {
  totalCount: string;
  pageNum: number;
  perPage: number;
  users: Array<User>;
}

export interface CountType {
  remainingInvites: string;
  pendingNotifications: string;
}

export interface Credentials {
  accessKeyId: string;
  secretAccessKey: string;
}

export interface UserResponse {
  user: User;
  counts: CountType;
  credentials: Credentials;
  friendStatus: string;
}