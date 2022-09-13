import { Card } from '@mui/material';
import DreamListTable from './DreamListTable';
import { getDreams, _dreamList } from 'src/store/slices/dreamSlice';
import { getCategories } from 'src/store/slices/categorySlice';
import { getUsers } from 'src/store/slices/userSlice';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';

function DreamList() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getDreams());
    dispatch(getCategories());
    dispatch(getUsers());
  }, [dispatch]);

  const dreamList = useAppSelector(_dreamList);
  return (
    <Card>
      <DreamListTable dreams={dreamList} />
    </Card>
  );
}

export default DreamList;
