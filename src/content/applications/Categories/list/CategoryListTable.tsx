import { FC, ChangeEvent, useState } from 'react';
import Avatar from '@mui/material/Avatar';
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

import { Category } from 'src/store/models/category';
import AddCategory from '../AddCategory';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import * as api from 'src/store/api-client';
import { useAppDispatch } from 'src/store/hooks';
import { getCategories } from 'src/store/slices/categorySlice';
import { injectStyle } from 'react-toastify/dist/inject-style';
import { ToastContainer, toast } from 'react-toastify';

interface CategoryListTableProps {
  className?: string;
  categories: Category[];
}

const applyPagination = (
  categories: Category[],
  page: number,
  limit: number
): Category[] => {
  return categories.slice(page * limit, page * limit + limit);
};

if (typeof window !== 'undefined') {
  injectStyle();
}

const CategoryListTable: FC<CategoryListTableProps> = ({ categories }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);

  const [open, setOpen] = useState(false);
  const [updateCategory, setUpdateCategory] = useState(null);

  const dispatch = useAppDispatch();

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const paginatedCategories = applyPagination(categories, page, limit);
  const theme = useTheme();

  const handleUpdate = () => {
    setOpen(true);
  };

  const handleDelete = async (category: Category) => {
    await api.deleteCategory(category?.categoryId).then((res) => {
      if (res.status === 200) {
        toast.success('Category is deleted');
        dispatch(getCategories());
      } else {
        toast.warning(res.data.ERR_CODE);
      }
    });
  };
  return (
    <>
      <AddCategory
        open={open}
        selectedCategory={updateCategory}
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
              {paginatedCategories.map((category) => {
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
                            setUpdateCategory(category);
                            handleUpdate();
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
            count={categories.length}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleLimitChange}
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
