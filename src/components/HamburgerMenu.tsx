import React from 'react';
import {
  Drawer,
  List,
  ListItemText,
  Collapse,
  ListItemIcon,
  ListItemButton,
  IconButton,
  Box,
  Typography,
  Divider,
  Button
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import InboxIcon from '@mui/icons-material/Inbox';

const menuItems = [
  { label: 'Home' },
  { label: 'Employees', subMenu: [ { label: 'All' }, { label: 'Add New' } ] },
  { label: 'Departments', subMenu: [ { label: 'All' }, { label: 'Add New' } ] },
  { label: 'Reports' },
  { label: 'Settings' },
  { label: 'Help' }
];

export default function HamburgerMenu({ onLogout }: { onLogout?: () => void }) {
  
  const [open, setOpen] = React.useState(false);
  const [openSub, setOpenSub] = React.useState<string | null>(null);
  const [selected, setSelected] = React.useState<string>('Dashboard');

  const handleDrawer = () => setOpen(!open);
  const handleSubMenu = (label: string) => setOpenSub(openSub === label ? null : label);

  return (
    <>
      <IconButton
        edge="start"
        color="primary"
        aria-label="menu"
        onClick={handleDrawer}
        size="small"
        sx={{
          ml: 1,
          mt: 1,
          background: '#fff',
          boxShadow: 2,
          border: '1px solid #e3e6ef',
          '&:hover': { background: '#e3e6ef' },
          width: 36,
          height: 36,
        }}
      >
        <MenuIcon fontSize="medium" />
      </IconButton>
      <Drawer anchor="left" open={open} onClose={handleDrawer}>
        <Box sx={{ width: 280, display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Box
            sx={{
              p: 2,
              pb: 1,
              background: 'linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)',
              borderBottomLeftRadius: 12,
              borderBottomRightRadius: 12,
              boxShadow: 2,
            }}
          >
            <Typography variant="h5" color="#fff" fontWeight={500} letterSpacing={2} sx={{ fontFamily: 'Montserrat, sans-serif' }}>
              Menu
            </Typography>
          </Box>
          <Divider />
          <List sx={{ flex: 1, py: 2 }}>
            {menuItems.map((item) => (
              <React.Fragment key={item.label}>
                <ListItemButton
                  selected={selected === item.label}
                  onClick={() => {
                    if (item.subMenu) {
                      handleSubMenu(item.label);
                    } else {
                      setSelected(item.label);
                      setOpen(false);
                    }
                  }}
                  sx={{
                    borderRadius: 2,
                    mx: 1,
                    my: 0.5,
                    transition: 'background 0.2s, color 0.2s',
                    '&.Mui-selected': {
                      background: 'linear-gradient(90deg, #e3f2fd 0%, #bbdefb 100%)',
                      color: 'primary.main',
                      fontWeight: 700,
                    },
                    '&:hover': {
                      background: '#e3f2fd',
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <InboxIcon color={selected === item.label ? 'primary' : 'action'} />
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{ fontSize: 17, fontWeight: 600, letterSpacing: 1 }}
                  />
                  {item.subMenu ? (openSub === item.label ? <ExpandLess /> : <ExpandMore />) : null}
                </ListItemButton>
                {item.subMenu && (
                  <Collapse in={openSub === item.label} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {item.subMenu.map((sub) => (
                        <ListItemButton
                          key={sub.label}
                          selected={selected === sub.label}
                          sx={{
                            pl: 7,
                            borderRadius: 2,
                            mx: 2,
                            my: 0.5,
                            fontWeight: 500,
                            fontSize: 15,
                            '&.Mui-selected': {
                              background: '#e3f2fd',
                              color: 'primary.main',
                            },
                            '&:hover': {
                              background: '#e3f2fd',
                            },
                          }}
                          onClick={() => {
                            setSelected(sub.label);
                            setOpen(false);
                          }}
                        >
                          <ListItemText primary={sub.label} />
                        </ListItemButton>
                      ))}
                    </List>
                  </Collapse>
                )}
              </React.Fragment>
            ))}
          </List>
          {onLogout && (
            <Box sx={{ p: 2, borderTop: '1px solid #eee', background: '#fafbfc' }}>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                onClick={() => {
                  setOpen(false);
                  onLogout();
                }}
                sx={{ fontWeight: 700, borderRadius: 2, py: 1, fontSize: 16 }}
              >
                Logout
              </Button>
            </Box>
          )}
        </Box>
      </Drawer>
    </>
  );
}
