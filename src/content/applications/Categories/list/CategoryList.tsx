import { Card } from '@mui/material';
import CategoryListTable from './CategoryListTable';
import { getCategories, _categoryList } from 'src/store/slices/categorySlice';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';

function UserList() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  const categoryList = useAppSelector(_categoryList);

  return (
    <Card>
      <CategoryListTable categories={categoryList} />
    </Card>
  );
}

export default UserList;
