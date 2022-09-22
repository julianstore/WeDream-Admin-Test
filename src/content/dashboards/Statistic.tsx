import { useCallback, useEffect, useState } from 'react';
import {
  Card,
  Grid,
  Box,
  CardContent,
  Typography,
  Avatar,
  alpha,
  styled
} from '@mui/material';
import TvIcon from '@mui/icons-material/Tv';
import GroupIcon from '@mui/icons-material/Group';
import CategoryIcon from '@mui/icons-material/Category';
import WorkspacesIcon from '@mui/icons-material/Workspaces';

import * as api from 'src/store/api-client'
import SuspenseLoader from 'src/components/SuspenseLoader';

const AvatarWrapper = styled(Avatar)(
  ({ theme }) => `
    margin: ${theme.spacing(2, 0, 1, -0.5)};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: ${theme.spacing(1)};
    padding: ${theme.spacing(0.5)};
    border-radius: 60px;
    height: ${theme.spacing(5.5)};
    width: ${theme.spacing(5.5)};
    background: ${
      theme.palette.mode === 'dark'
        ? theme.colors.alpha.trueWhite[30]
        : alpha(theme.colors.alpha.black[100], 0.07)
    };

    img {
      background: ${theme.colors.alpha.trueWhite[100]};
      padding: ${theme.spacing(0.5)};
      display: block;
      border-radius: inherit;
      height: ${theme.spacing(4.5)};
      width: ${theme.spacing(4.5)};
    }
`
);

function Statistic() {
  const [loading, setLoading] = useState(false);
  const [dreamAllCount, setDreamAllCount] = useState(0);
  const [dreamAvailableCount, setAvailableCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [sessionCount, setSessionCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);
  const [dreamGroupUserCount, setDreamGroupUserCount] = useState(0);
  const [dreamGroupCount, setDreamGroupCount] = useState(0);
  const [availableCategoryCount, setAvailableCategoryCount] = useState(0);

  const getAllDreams = useCallback(async () => {
    try {
      setLoading(true);
      const dreamRes = await api.getAllDreams();
      setDreamAllCount(parseInt(dreamRes.totalCount));
    } catch(ex) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, []);

  const getAvailableDreams = useCallback(async () => {
    try {
      setLoading(true);
      const dreamRes = await api.getDreamList();
      setAvailableCount(parseInt(dreamRes.totalCount));
    } catch(ex) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, []);

  const getDreamStatistic = useCallback(async () => {
    try {
      setLoading(true);
      const dreamRes = await api.getDreamStatistic();
      setDreamGroupCount(dreamRes.dreamGroupCount || 0)
      setDreamGroupUserCount(dreamRes.dreamGroupUserCount || 0);
    } catch(ex) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, []);

  const getAllUsers = useCallback(async () => {
    try {
      setLoading(true);
      const userRes = await api.getAllUsers();
      setUserCount(parseInt(userRes.totalCount));
    } catch(ex) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, []);

  const getOnlineUsers = useCallback(async () => {
    try {
      setLoading(true);
      const userRes = await api.getOnlineUsers();
      setSessionCount(parseInt(userRes.totalCount));
    } catch(ex) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, []);

  const getDreamCategory = useCallback(async () => {
    try {
      setLoading(true);
      const categoryRes = await api.getDreamCategoryList();
      setCategoryCount(parseInt(categoryRes.totalCount));
      setAvailableCategoryCount(parseInt(categoryRes.totalCount));
    } catch(ex) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getAllDreams();
    getAvailableDreams();
    getAllUsers();
    getOnlineUsers();
    getDreamCategory();
    getDreamStatistic();
  }, []);

  return (
    <>
    {loading && <SuspenseLoader/>}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          pb: 3
        }}
      >
        <Typography variant="h3">WeDream Status</Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3} item>
          <Card
            sx={{
              px: 1
            }}
          >
            <CardContent>
              <AvatarWrapper>
                <TvIcon style={{ color: '#11192a' }} />
              </AvatarWrapper>
              <Typography variant="h5" noWrap>
                Dreams
              </Typography>
              <Typography variant="subtitle1" noWrap>
                Available Dreams
              </Typography>
              <Box
                sx={{
                  pt: 3
                }}
              >
                <Typography variant="h3" gutterBottom noWrap>
                  { dreamAllCount }
                </Typography>
                <Typography variant="subtitle2" noWrap>
                  { dreamAvailableCount }
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={12} sm={6} md={3} item>
          <Card
            sx={{
              px: 1
            }}
          >
            <CardContent>
              <AvatarWrapper>
                <GroupIcon style={{ color: '#11192a' }} />
              </AvatarWrapper>
              <Typography variant="h5" noWrap>
                Users
              </Typography>
              <Typography variant="subtitle1" noWrap>
                Online Users
              </Typography>
              <Box
                sx={{
                  pt: 3
                }}
              >
                <Typography variant="h3" gutterBottom noWrap>
                  { userCount }
                </Typography>
                <Typography variant="subtitle2" noWrap>
                  { sessionCount }
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={12} sm={6} md={3} item>
          <Card
            sx={{
              px: 1
            }}
          >
            <CardContent>
              <AvatarWrapper>
                <CategoryIcon style={{ color: '#11192a' }} />
              </AvatarWrapper>
              <Typography variant="h5" noWrap>
                Categories
              </Typography>
              <Typography variant="subtitle1" noWrap>
                Available Categories
              </Typography>
              <Box
                sx={{
                  pt: 3
                }}
              >
                <Typography variant="h3" gutterBottom noWrap>
                  { categoryCount }
                </Typography>
                <Typography variant="subtitle2" noWrap>
                  { availableCategoryCount }
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={12} sm={6} md={3} item>
          <Card
            sx={{
              px: 1
            }}
          >
            <CardContent>
              <AvatarWrapper>
                <WorkspacesIcon style={{ color: '#11192a' }} />
              </AvatarWrapper>
              <Typography variant="h5" noWrap>
                Group
              </Typography>
              <Typography variant="subtitle1" noWrap>
                Group Users
              </Typography>
              <Box
                sx={{
                  pt: 3
                }}
              >
                <Typography variant="h3" gutterBottom noWrap>
                  { dreamGroupCount }
                </Typography>
                <Typography variant="subtitle2" noWrap>
                  { dreamGroupUserCount }
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default Statistic;
