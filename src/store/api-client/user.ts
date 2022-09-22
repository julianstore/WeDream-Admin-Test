import axiosInstance from '.';
import { UsersResponse, UserResponse } from '../models/user';

export const getAllUsers = (pageNum = 1, perPage = 5) => {
  return axiosInstance
    .get<UsersResponse>('/account/list', { params: { page_num: pageNum, per_page: perPage }})
    .then((res) => res.data);
};

export const getOnlineUsers = (pageNum = 1, perPage = 5) => {
  return axiosInstance
    .get<UsersResponse>('/account/sessions', { params: { page_num: pageNum, per_page: perPage }})
    .then((res) => res.data);
};

export const getUserById = (userId = '', getProfile = false, getAvatar = false, getCounts = false, getCredentials = false) => {
  return axiosInstance
    .get<UserResponse>(`/account/${userId}`, { params: { getProfile, getAvatar, getCounts, getCredentials }})
    .then((res) => res.data);
};

export const addUser = async (
  firstName: string,
  lastName: string,
  displayName: string,
  email: string,
  phone: string,
  year: number,
  month: number,
  day: number,
  password: string
) => {
  return axiosInstance
    .post<{ userId: string }>('/account/create', {
      first_name: firstName,
      last_name: lastName,
      display_name: displayName,
      email: email,
      password: password,
      phone: phone,
      birthdate: {
        year: year,
        month: month,
        day: day + 1
      }
    })
    .then((res: any) => res)
    .catch((err) => {
      return err.response;
    });
};

export const updateUser = async (
  userId: string,
  firstName: string,
  lastName: string,
  displayName: string,
  email: string,
  year: number,
  month: number,
  day: number
) => {
  return axiosInstance
    .post('/account/updateprofile', {
      user_id: userId,
      first_name: firstName,
      last_name: lastName,
      display_name: displayName,
      email: email,
      birthdate: {
        year: year,
        month: month,
        day: day + 1
      }
    })
    .then((res: any) => res)
    .catch((err) => {
      return err.response;
    });
};

export const deleteUser = async (userId: string) => {
  return axiosInstance
    .delete('/account/deleteprofile/' + userId)
    .then((res: any) => res)
    .catch((err) => {
      return err.response;
    });
};
