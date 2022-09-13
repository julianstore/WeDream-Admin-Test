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
  topAccessory: string;
  trailsAccessory: string;
  hpAccessory: string;
}

export interface User {
  avatar: Avatar;
  displayName: string;
  imageUrl: string;
  isAdmin: boolean;
  profile: Profile;
}
