import React from 'react';
import './App.css';
import HamburgerMenu from './components/HamburgerMenu';
import HorizontalMenu from './components/HorizontalMenu';
import EmployeeGrid from './components/EmployeeGrid';
import EmployeeTileView from './components/EmployeeTileView';
import { Button, Container, Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import Login from './components/Login';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, login, logout, setView } from './store';


function App() {
  const view = useSelector((state: RootState) => state.view.view);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(logout());
  };

  if (!isLoggedIn) {
    return <Login onLogin={() => dispatch(login())} />;
  }

  return (
    <div className="App">
    
      <HorizontalMenu onLogout={handleLogout} />
      
      <Container maxWidth="lg" style={{ marginTop: 32 }}>
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <ToggleButtonGroup
            value={view}
            exclusive
            onChange={(_, val) => val && dispatch(setView(val))}
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
