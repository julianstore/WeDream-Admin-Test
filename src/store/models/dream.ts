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
