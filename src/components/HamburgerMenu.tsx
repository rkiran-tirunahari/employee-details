import React from 'react';
import { Drawer, List, ListItemText, Collapse, ListItemIcon, ListItemButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import InboxIcon from '@mui/icons-material/Inbox';

const menuItems = [
  { label: 'Dashboard' },
  { label: 'Employees', subMenu: [ { label: 'List' }, { label: 'Add New' } ] },
  { label: 'Settings', subMenu: [ { label: 'Profile' }, { label: 'Preferences' } ] },
  { label: 'Help' }
];

export default function HamburgerMenu() {
  const [open, setOpen] = React.useState(false);
  const [openSub, setOpenSub] = React.useState<string | null>(null);

  const handleDrawer = () => setOpen(!open);
  const handleSubMenu = (label: string) => setOpenSub(openSub === label ? null : label);

  return (
    <>
      <MenuIcon onClick={handleDrawer} style={{ cursor: 'pointer', margin: 8 }} />
      <Drawer anchor="left" open={open} onClose={handleDrawer}>
        <List style={{ width: 250 }}>
          {menuItems.map((item) => (
            <React.Fragment key={item.label}>
              <ListItemButton onClick={() => item.subMenu ? handleSubMenu(item.label) : setOpen(false)}>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary={item.label} />
                {item.subMenu ? (openSub === item.label ? <ExpandLess /> : <ExpandMore />) : null}
              </ListItemButton>
              {item.subMenu && (
                <Collapse in={openSub === item.label} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.subMenu.map((sub) => (
                      <ListItemButton key={sub.label} sx={{ pl: 4 }} onClick={() => setOpen(false)}>
                        <ListItemText primary={sub.label} />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          ))}
        </List>
      </Drawer>
    </>
  );
}
