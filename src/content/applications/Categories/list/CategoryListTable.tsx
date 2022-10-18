import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  Tooltip,
  Divider,
  Box,
  Card,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Typography,
  useTheme
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { injectStyle } from 'react-toastify/dist/inject-style';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';

import AddCategory from '../AddCategory';
import * as api from 'src/store/api-client';
import { Category } from 'src/store/models/category';
import SuspenseLoader from 'src/components/SuspenseLoader';
import { useAppSelector, useAppDispatch } from 'src/store/hooks';
import { _categoryList, _pagination, _totalCount, setTotalCount, setPagination, setCategoryList, setSelectedCategory } from 'src/store/slices/categorySlice';

if (typeof window !== 'undefined') {
  injectStyle();
}

const CategoryListTable = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const categories = useAppSelector(_categoryList);
  const pagination = useAppSelector(_pagination);
  const totalCount = useAppSelector(_totalCount);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState<number>(pagination.page - 1);
  const [limit, setLimit] = useState<number>(pagination.limit);
  const [open, setOpen] = useState(false);

  const handleUpdate = (category) => {
    dispatch(setSelectedCategory(category));
    setOpen(true);
  };

  const handleDelete = async (category: Category) => {
    try {
      setLoading(true);
      const res = await api.deleteCategory(category?.categoryId);
      if (res.status === 200) {
        toast.success('Category is deleted');
        dispatch(setPagination({ page: page + 1, limit }));
      } else {
        toast.warning(res.data.ERR_CODE);
      }
    } catch(ex) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryList = useCallback(async (page, limit) => {
    try {
      setLoading(true);
      const categoryRes = await api.getDreamCategoryList(page, limit);
      dispatch(setCategoryList(categoryRes.categories));
      dispatch(setTotalCount(parseInt(categoryRes.totalCount || '0')));
    } catch(ex) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
    return () => {
      dispatch(setCategoryList(categories));
      dispatch(setTotalCount(totalCount));
    }
  }, []);

  useEffect(() => {
    getCategoryList(pagination.page, pagination.limit);
  }, [pagination]);

  useEffect(() => {
    dispatch(setPagination({ page: page + 1, limit }));
  }, [page, limit]);

  return (
    <>
      <AddCategory
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      />
      <Card>
        <Divider />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Category ID</TableCell>
                <TableCell>Icon</TableCell>
                <TableCell>Name</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((category) => {
                const isCategorySelected = selectedCategories.includes(
                  category?.categoryId
                );
                return (
                  <TableRow
                    hover
                    key={category?.categoryId}
                    selected={isCategorySelected}
                  >
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {category?.categoryId}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {category?.icon}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {category?.name}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title="Update Category" arrow>
                        <IconButton
                          sx={{
                            '&:hover': {
                              background: theme.colors.primary.lighter
                            },
                            color: theme.palette.primary.main
                          }}
                          color="inherit"
                          size="small"
                          onClick={() => {
                            handleUpdate(category);
                          }}
                        >
                          <EditTwoToneIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Category" arrow>
                        <IconButton
                          sx={{
                            '&:hover': {
                              background: theme.colors.error.lighter
                            },
                            color: theme.palette.error.main
                          }}
                          color="inherit"
                          size="small"
                          onClick={() => {
                            handleDelete(category);
                          }}
                        >
                          <DeleteTwoToneIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Box p={2}>
          <TablePagination
            component="div"
            count={totalCount}
            onPageChange={(_, pageNumber) => setPage(pageNumber)}
            onRowsPerPageChange={(event) => setLimit(parseInt(event.target.value))}
            page={page}
            rowsPerPage={limit}
            rowsPerPageOptions={[5, 10, 25, 30]}
          />
        </Box>
      </Card>
      <ToastContainer
        position="top-right"
        newestOnTop
        style={{ marginTop: 100, zIndex: '99999 !important' }}
      />
      {loading && <SuspenseLoader/>}
    </>
  );
};

CategoryListTable.propTypes = {
  categories: PropTypes.array.isRequired
};

CategoryListTable.defaultProps = {
  categories: []
};

export default CategoryListTable;
