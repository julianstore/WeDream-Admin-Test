export interface Dream {
  dreamId: string;
  categoryId: string;
  background: string;
  ownerId: string;
  title: string;
  description: string;
  auctionId: string;
  isFeatured: boolean;
  allowAvatarAccessories: boolean;
  allowGadgets: boolean;
  allowDreamEditing: boolean;
  allowBroadcasting: boolean;
  startTime: string;
  endTime: string;
  ownerDisplayName: string;
  categoryName: string;
}

export interface DreamResponse {
  pageNum: number;
  perPage: number;
  totalCount: string;
  dreamList: Array<Dream>;
}

export interface DreamGroupUser {
  userId: string;
  displayName: string;
  fullName: string;
  imageUrl: string;
  isHost: boolean;
  isFriend: boolean;
  isBlocked: boolean;
  isSelf: boolean;
}

export interface DreamUsersResponse {
  groupId: number;
  userCount: number;
  isHost: boolean;
  isSelf: boolean;
  isPrivate: boolean;
  users: Array<DreamGroupUser>;
}

export interface DreamUser {
  userId: string;
  displayName: string;
  fullName: string;
  photoUrl: string;
  sessionId: number;
  isHost: boolean;
  isAdmin: boolean;
  isFriend: boolean;
  isBlocked: boolean;
  isStreaming: boolean;
}

export interface DreamVoiceRequest {
  requestId: number;
  user: DreamUser;
  requestTime: string;
}

export interface DreamVoiceRequestListResponse {
  pageNum: number;
  perPage: number;
  totalCount: string;
  requests: Array<DreamVoiceRequest>;
}

export interface DreamStatistic {
  dreamGroupCount: number;
  dreamGroupUserCount: number;
}
