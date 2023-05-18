'use client';
import { useCallback, FC } from 'react';
import { usePathname } from 'next/navigation';
import React from 'react';
import { signOut, useSession } from 'next-auth/react';
import MyIcon from '../../../../../packages/icon/myIcon';
import {
  Box,
  Typography,
  MenuItem,
  Menu,
  Divider,
  ListItemIcon,
  Tooltip,
  IconButton,
  colors,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CJBSLogo from '../atoms/CJBSLogo';
import Link from 'next/link';

interface LayoutProps {
  children: React.ReactNode;
}
const MetaLayout: FC<LayoutProps> = ({ children }) => {
  const session = useSession();
  const pathname = usePathname();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onActionProfile = useCallback((actionKey: string | number) => {
    switch (actionKey) {
      case 'logout':
        signOut();
        break;
      default:
    }
  }, []);

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          height: '55px',
          border: '0.4px solid rgba(0, 0, 0, 0.5)',
        }}
      >
        <CJBSLogo />
        <Box
          sx={{ display: 'flex', alignItems: 'center', justifyItems: 'center' }}
        >
          <Link href={'/clinical'}>
            <Typography
              variant="body1"
              sx={{ minWidth: 100, marginLeft: '80px', marginRight: '80px' }}
            >
              Clinical Data
            </Typography>
          </Link>
          <Link href={'/sample'}>
            <Typography variant="body1" sx={{ minWidth: 100 }}>
              Sample Management
            </Typography>
          </Link>
        </Box>
        <Box sx={{ position: 'absolute', right: '20px', top: '10px' }}>
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <MyIcon icon="person-circle" size={'25px'} color="gray" />
            </IconButton>
          </Tooltip>
        </Box>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={handleClose}>
            <MyIcon icon="person-circle" size={'35px'} color={'gray'} /> Profile
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <MyIcon icon="person-circle" size={'35px'} color={'gray'} /> My
            account
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <MyIcon icon="person-circle" size={'35px'} color={'gray'} />
            </ListItemIcon>
            Add another account
          </MenuItem>
        </Menu>
      </Box>
      <Box>{children}</Box>
    </Box>
  );
};

const FlexBox = styled(Box)`
  display: 'flex';
  align-items: 'center';
  text-align: 'center';
`;

export default MetaLayout;
