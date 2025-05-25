import React, { useState } from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';

const menuItems = ['Home', 'Employees', 'Departments', 'Reports', 'Settings'];

export default function HorizontalMenu({ onLogout }: { onLogout?: () => void }) {
  const [selected, setSelected] = useState('Home');

  return (
    <AppBar
      position="static"
      color="default"
      elevation={2}
      sx={{
        borderRadius: 2,
        mb: 3,
        background: '#fff',
        boxShadow: 2,
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'center', // Center the menu items horizontally
        }}
      >
        {menuItems.map((item) => (
          <Button
            key={item}
            color={selected === item ? 'primary' : 'inherit'}
            onClick={() => setSelected(item)}
            sx={{
              mr: 2,
              fontWeight: 600,
              fontSize: 16,
              textTransform: 'none',
              borderRadius: 2,
              backgroundColor: selected === item ? 'primary.100' : 'transparent',
              boxShadow: selected === item ? 2 : 0,
              '&:hover': {
                backgroundColor: selected === item ? 'primary.200' : 'action.hover',
              },
              // Remove right margin for the last item
              ...(item === menuItems[menuItems.length - 1] && { mr: 0 }),
            }}
          >
            {item}
          </Button>
        ))}
        {onLogout && (
          <Button
            color="secondary"
            variant="outlined"
            sx={{ ml: 4, fontWeight: 600, borderRadius: 2 }}
            onClick={onLogout}
          >
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}