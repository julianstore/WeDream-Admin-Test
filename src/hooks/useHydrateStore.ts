import { useEffect, useContext, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getUsers, _userList } from '../store/slices/userSlice';

export const useHydrateStore = () => {
  const dispatch = useAppDispatch();
  // const { identity } = useContext(AppContext); ///might need to useEffect on identity changes

  useEffect(() => {
    console.log('hydrating store');
    dispatch(getUsers());
  }, [dispatch]);
};
