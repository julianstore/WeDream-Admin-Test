import axiosInstance from '.';
import { BirthDate, Phone } from '../models/base';
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
  phone: Phone,
  birthdate: BirthDate,
  password: string
) => {
  return axiosInstance
    .post<{ userId: string }>('/account/create', {
      first_name: firstName,
      last_name: lastName,
      display_name: displayName,
      email,
      password,
      phone,
      birthdate
    })
    .then((res: any) => res)
    .catch((err) => {
      return err.response;
    });
};

export const confirmUser = async (
  userLoginId: string,
  code: string,
  source: number
) => {
  return axiosInstance
  .post<{}>('/account/confirm', {
    user_login_id: userLoginId,
    code: code,
    source: source
  })
  .then((res: any) => res)
  .catch((err) => {
    return err.response;
  });
}

export const updateUser = async (
  userId: string,
  firstName: string,
  lastName: string,
  displayName: string,
  bio: string,
  birthdate: BirthDate,
  isAdmin: boolean,
  addInvites: number
) => {
  return axiosInstance
    .put(`/account/${userId}/profile`, {
      user_id: userId,
      first_name: firstName,
      last_name: lastName,
      full_name: `${firstName} ${lastName}`,
      display_name: displayName,
      bio: bio,
      birthdate,
      is_admin: isAdmin,
      add_invites: addInvites
    })
    .then((res: any) => res)
    .catch((err) => {
      return err.response;
    });
};

export const deleteUser = async (userId: string) => {
  return axiosInstance
    .delete(`/account/${userId}`)
    .then((res: any) => res)
    .catch((err) => {
      return err.response;
    });
};
