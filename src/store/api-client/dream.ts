import axiosInstance from '.';
import { Dream } from '../models/dream';

export const getDreams = () => {
  return axiosInstance
    .get<Dream[]>('/dream/all', {})
    .then((res) => res.data['dreamList']);
};

export const addDream = async (
  categoryId: string,
  background: number,
  ownerId: string,
  title: string,
  description: string,
  auctionId: number,
  isFeatured: boolean,
  allowAvatarAccessories: boolean,
  allowGadgets: boolean,
  allowDreamEditing: boolean,
  allowBroadcasting: boolean,
  startTime: string,
  endTime: string
) => {
  return axiosInstance
    .post<{ dreamId: string }>('/dream/create', {
      category_id: categoryId,
      background: background,
      owner_id: ownerId,
      title: title,
      description: description,
      auction_id: auctionId,
      is_featured: isFeatured,
      allow_avatar_accessories: allowAvatarAccessories,
      allow_gadgets: allowGadgets,
      allow_dream_editing: allowDreamEditing,
      allow_broadcasting: allowBroadcasting,
      start_time: startTime,
      end_time: endTime
    })
    .then((res: any) => res)
    .catch((err) => {
      return err.response;
    });
};

export const updateDream = async (
  dreamId: string,
  categoryId: string,
  background: number,
  ownerId: string,
  title: string,
  description: string,
  auctionId: number,
  isFeatured: boolean,
  allowAvatarAccessories: boolean,
  allowGadgets: boolean,
  allowDreamEditing: boolean,
  allowBroadcasting: boolean,
  startTime: string,
  endTime: string
) => {
  return axiosInstance
    .post('/dream/update', {
      dream_id: dreamId,
      category_id: categoryId,
      background: background,
      owner_id: ownerId,
      title: title,
      description: description,
      auction_id: auctionId,
      is_featured: isFeatured,
      allow_avatar_accessories: allowAvatarAccessories,
      allow_gadgets: allowGadgets,
      allow_dream_editing: allowDreamEditing,
      allow_broadcasting: allowBroadcasting,
      start_time: startTime,
      end_time: endTime
    })
    .then((res: any) => res)
    .catch((err) => {
      return err.response;
    });
};

export const deleteDream = async (dreamId: string) => {
  return axiosInstance
    .delete('/dream/delete/' + dreamId)
    .then((res: any) => res)
    .catch((err) => {
      return err.response;
    });
};
