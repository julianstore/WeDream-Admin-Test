import axiosInstance from '.';
import { DreamResponse, DreamStatistic, DreamUsersResponse, DreamVoiceRequestListResponse } from '../models/dream';

export const getAllDreams = (pageNum = 1, perPage = 5) => {
  return axiosInstance
    .get<DreamResponse>('/dream/all', { params: { page_num: pageNum, per_page: perPage }})
    .then((res) => res.data);
};

export const getDreamUsers = (pageNum = 1, perPage = 5, dreamId = 0, userId = '') => {
  return axiosInstance
    .get<DreamUsersResponse>(`/dream/users/${dreamId.toString()}`, { params: { page_num: pageNum, per_page: perPage, user_id: userId }})
    .then((res) => res.data);
};

export const getDreamStatistic = () => {
  return axiosInstance
    .get<DreamStatistic>('/dream/statistic')
    .then((res) => res.data);
};

export const getDreamList = (pageNum = 1, perPage = 50, listType = 0, categoryId = 10001, ownerId = '' ) => {
  /* listType
    0: all dreams
    1: featured dreams
    2: owners dreams
    3: category dreams
  */
  return axiosInstance
    .get<DreamResponse>('/dream/list',
    {
      params: {
        page_num: pageNum,
        per_page: perPage,
        list_type: listType,
        category_id: categoryId,
        owner_id: ownerId
      }})
    .then((res) => res.data);
};

export const ListDreamVoiceRequests = (pageNum = 1, perPage = 50, dreamId = '') => {
  return axiosInstance
    .get<DreamVoiceRequestListResponse>(`/dream/voice/${dreamId}`,
    {
      params: {
        page_num: pageNum,
        per_page: perPage,
      }})
    .then((res) => res.data);
};

export const addDream = async (
  categoryId: number,
  background: number,
  ownerId: string,
  title: string,
  description: string,
  auctionId: number,
  isAuction: boolean,
  hideFromLists: boolean,
  isPrivate: boolean,
  isFeatured: boolean,
  allowAvatarAccessories: boolean,
  allowGadgets: boolean,
  allowDreamEditing: boolean,
  allowBroadcasting: boolean,
  startTime: string,
  endTime: string,
  tags: Array<string>
) => {
  return axiosInstance
    .post<{ dreamId: string }>('/dream/create', {
      category_id: categoryId,
      background: background,
      owner_id: ownerId,
      title: title,
      description: description,
      auction_id: auctionId,
      is_auction: isAuction,
      hide_from_lists: hideFromLists,
      is_private: isPrivate,
      is_featured: isFeatured,
      allow_avatar_accessories: allowAvatarAccessories,
      allow_gadgets: allowGadgets,
      allow_dream_editing: allowDreamEditing,
      allow_broadcasting: allowBroadcasting,
      start_time: startTime,
      end_time: endTime,
      tags: tags
    })
    .then((res: any) => res)
    .catch((err) => {
      return err.response;
    });
};

export const updateDream = async (
  dreamId: number,
  categoryId: number,
  background: number,
  ownerId: string,
  title: string,
  description: string,
  auctionId: number,
  isAuction: boolean,
  hideFromLists: boolean,
  isPrivate: boolean,
  isFeatured: boolean,
  allowAvatarAccessories: boolean,
  allowGadgets: boolean,
  allowDreamEditing: boolean,
  allowBroadcasting: boolean,
  startTime: string,
  endTime: string,
  tags: Array<string>
) => {
  return axiosInstance
    .put(`/dream/${dreamId}`, {
      dream_id: dreamId,
      category_id: categoryId,
      background: background,
      owner_id: ownerId,
      title: title,
      description: description,
      auction_id: auctionId,
      is_auction: isAuction,
      hide_from_lists: hideFromLists,
      is_private: isPrivate,
      is_featured: isFeatured,
      allow_avatar_accessories: allowAvatarAccessories,
      allow_gadgets: allowGadgets,
      allow_dream_editing: allowDreamEditing,
      allow_broadcasting: allowBroadcasting,
      start_time: startTime,
      end_time: endTime,
      tags: tags
    })
    .then((res: any) => res)
    .catch((err) => {
      return err.response;
    });
};

export const deleteDream = async (dreamId: string) => {
  return axiosInstance
    .delete(`/dream/${dreamId}`)
    .then((res: any) => res)
    .catch((err) => {
      return err.response;
    });
};
