import { useContext, useState, useEffect } from 'react';
import {
  Typography,
  Card,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListSubheader,
  ListItemText,
  Avatar,
  useTheme,
  styled,
} from '@mui/material';


import AuthContext from 'src/contexts/AuthContext';

const ListWrapper = styled(List)(
  () => `
      .MuiListItem-root {
        border-radius: 0;
        margin: 0;
      }
`
);

function ProfileInfo() {
  const theme = useTheme();
  const authContext = useContext(AuthContext);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    setProfile(authContext?.user?.user?.profile || null);
  }, [authContext]);

  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader title="Profile Information" />
      <Divider />
      <ListWrapper disablePadding>
        <ListItem
          sx={{
            color: `${theme.colors.primary.main}`,
            '&:hover': { color: `${theme.colors.primary.dark}` }
          }}
          button
        >
          <ListItemText primaryTypographyProps={{ variant: 'h5' }} style={{ width: '1%' }}>Bio</ListItemText>
          <ListItemText>{ profile?.bio || '- -' }</ListItemText>
        </ListItem>
        <Divider />

        <ListItem
          sx={{
            color: `${theme.colors.primary.main}`,
            '&:hover': { color: `${theme.colors.primary.dark}` }
          }}
          button
        >
          <ListItemText primaryTypographyProps={{ variant: 'h5' }} style={{ width: '1%' }}>Confirmed Time</ListItemText>
          <ListItemText>{ profile?.confirmedTime || '- -' }</ListItemText>
        </ListItem>
        <Divider />

        <ListItem
          sx={{
            color: `${theme.colors.primary.main}`,
            '&:hover': { color: `${theme.colors.primary.dark}` }
          }}
          button
        >
          <ListItemText primaryTypographyProps={{ variant: 'h5' }} style={{ width: '1%' }}>Email</ListItemText>
          <ListItemText>{ profile?.email || '- -' }</ListItemText>
        </ListItem>
        <Divider />

        <ListItem
          sx={{
            color: `${theme.colors.primary.main}`,
            '&:hover': { color: `${theme.colors.primary.dark}` }
          }}
          button
        >
          <ListItemText primaryTypographyProps={{ variant: 'h5' }} style={{ width: '1%' }}>First Name</ListItemText>
          <ListItemText>{ profile?.firstName || '- -' }</ListItemText>
        </ListItem>
        <Divider />

        <ListItem
          sx={{
            color: `${theme.colors.primary.main}`,
            '&:hover': { color: `${theme.colors.primary.dark}` }
          }}
          button
        >
          <ListItemText primaryTypographyProps={{ variant: 'h5' }} style={{ width: '1%' }}>Last Name</ListItemText>
          <ListItemText>{ profile?.lastName || '- -' }</ListItemText>
        </ListItem>
        <Divider />

        <ListItem
          sx={{
            color: `${theme.colors.primary.main}`,
            '&:hover': { color: `${theme.colors.primary.dark}` }
          }}
          button
        >
          <ListItemText primaryTypographyProps={{ variant: 'h5' }} style={{ width: '1%' }}>Full Name</ListItemText>
          <ListItemText>{ profile?.fullName || '- -' }</ListItemText>
        </ListItem>
        <Divider />

        <ListItem
          sx={{
            color: `${theme.colors.primary.main}`,
            '&:hover': { color: `${theme.colors.primary.dark}` }
          }}
          button
        >
          <ListItemText primaryTypographyProps={{ variant: 'h5' }} style={{ width: '1%' }}>Phone</ListItemText>
          <ListItemText>{ profile?.phone || '- -' }</ListItemText>
        </ListItem>
        <Divider />

        <ListItem
          sx={{
            color: `${theme.colors.primary.main}`,
            '&:hover': { color: `${theme.colors.primary.dark}` }
          }}
          button
        >
          <ListItemText primaryTypographyProps={{ variant: 'h5' }} style={{ width: '1%' }}>Privacy Online Status</ListItemText>
          <ListItemText>{ profile?.privacyOnlineStatus || '- -' }</ListItemText>
        </ListItem>
        <Divider />
      </ListWrapper>
    </Card>
  );
}

export default ProfileInfo;
