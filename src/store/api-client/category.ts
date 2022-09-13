import axiosInstance from '.';
import { Category } from '../models/category';

export const getCategories = () => {
  return axiosInstance
    .get<Category[]>('/dream/category/list', {})
    .then((res) => res.data['categories']);
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
    .post('/dream/category/update', {
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
