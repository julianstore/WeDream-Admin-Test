import axiosInstance from '.';
import { CategoryResponse } from '../models/category';

export const getDreamCategoryList = (pageNum = 1, perPage = 50) => {
  return axiosInstance
    .get<CategoryResponse>('/dream/category/list', { params: { page_num: pageNum, per_page: perPage }})
    .then((res) => res.data);
};

export const addCategory = async (
  categoryId: string,
  icon: string,
  name: string
) => {
  return axiosInstance
    .post<{ userId: string }>('/dream/category/create', {
      category_id: categoryId,
      icon: icon,
      name: name
    })
    .then((res: any) => res)
    .catch((err) => {
      return err.response;
    });
};

export const updateCategory = async (
  categoryId: string,
  icon: string,
  name: string
) => {
  return axiosInstance
    .put(`/dream/category/${categoryId}`, {
      category_id: categoryId,
      icon: icon,
      name: name
    })
    .then((res: any) => res)
    .catch((err) => {
      return err.response;
    });
};

export const deleteCategory = async (categoryId: string) => {
  return axiosInstance
    .delete('/dream/category/delete/' + categoryId)
    .then((res: any) => res)
    .catch((err) => {
      return err.response;
    });
};
