import React, { useState } from 'react';
import './App.css';
import HamburgerMenu from './components/HamburgerMenu';
import HorizontalMenu from './components/HorizontalMenu';
import EmployeeGrid from './components/EmployeeGrid';
import EmployeeTileView from './components/EmployeeTileView';
import { Button, Container, Box, ToggleButton, ToggleButtonGroup } from '@mui/material';

function App() {
  const [view, setView] = useState<'grid' | 'tile'>('grid');

  return (
    <div className="App">
      
       <Box sx={{ display: 'flex', alignItems: 'center', pl: 2, pt: 2 }}>
        <HamburgerMenu />
      </Box>

      <HorizontalMenu />
      
       <Container maxWidth="lg" style={{ marginTop: 32 }}>
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <ToggleButtonGroup
            value={view}
            exclusive
            onChange={(_, val) => val && setView(val)}
            aria-label="view switch"
            sx={{
              background: '#f4f6fa',
              borderRadius: 3,
              boxShadow: 1,
              p: 0.5,
              '.MuiToggleButton-root': {
                fontWeight: 600,
                fontSize: 16,
                px: 3,
                py: 1,
                border: 0,
                borderRadius: 2,
                color: 'primary.main',
                backgroundColor: '#fff',
                transition: 'background 0.2s, color 0.2s',
                '&.Mui-selected': {
                  backgroundColor: 'primary.main',
                  color: '#fff',
                  boxShadow: 2,
                },
                '&:hover': {
                  backgroundColor: 'primary.light',
                  color: '#fff',
                },
                '&:not(:last-of-type)': {
                  mr: 1,
                },
              },
            }}
          >
            <ToggleButton value="grid" aria-label="grid view">
              Grid View
            </ToggleButton>
            <ToggleButton value="tile" aria-label="tile view">
              Tile View
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
        {view === 'grid' ? <EmployeeGrid /> : <EmployeeTileView />}
      </Container>
    </div>
  );
}


export default App;
