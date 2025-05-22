import React, { useState } from 'react';
import { Card, CardContent, Typography, IconButton, CircularProgress, CardActions, Dialog, DialogTitle, DialogContent, Button, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import FlagIcon from '@mui/icons-material/Flag';
import DeleteIcon from '@mui/icons-material/Delete';
import { useQuery, gql } from '@apollo/client';


// GraphQL query for employees
const EMPLOYEES_QUERY = gql`
  query Employees($filter: String, $sortBy: String, $sortOrder: String, $page: Int, $pageSize: Int) {
    employees(filter: $filter, sortBy: $sortBy, sortOrder: $sortOrder, page: $page, pageSize: $pageSize) {
      employees {
        id
        name
        age
        class
        subjects
        attendance
      }
      total
    }
  }
`;

interface Employee {
  id: number;
  name: string;
  age: number;
  class: string;
  subjects: string[];
  attendance: string;
}

export default function EmployeeTileView() {
  const [selected, setSelected] = useState<Employee | null>(null);

  const { data, loading } = useQuery(EMPLOYEES_QUERY, {
    variables: { page: 1, pageSize: 20 },
  });

  if (loading) return <CircularProgress />;
  const employees: Employee[] = data?.employees?.employees || [];

  return (
    <>
      <Box display="flex" flexWrap="wrap" gap={2} justifyContent="flex-start">
        {employees.map((emp) => (
          <Box key={emp.id} sx={{ flex: '1 1 250px', maxWidth: 300, minWidth: 250, mb: 2 }}>
            <Card onClick={() => setSelected(emp)} style={{ cursor: 'pointer', border: '2px solid #1976d2', boxShadow: '0 2px 8px rgba(25, 118, 210, 0.08)' }}>
              <CardContent>
                <Typography variant="h6">ID: {emp.id}</Typography>
                <Typography>Name: {emp.name}</Typography>
                <Typography>Age: {emp.age}</Typography>
                <Typography>Class: {emp.class}</Typography>
                <Typography>Subjects: {Array.isArray(emp.subjects) ? emp.subjects.join(', ') : emp.subjects}</Typography>
                <Typography>Attendance: {emp.attendance}</Typography>
              </CardContent>
              <CardActions>
                <IconButton><EditIcon /></IconButton>
                <IconButton><FlagIcon /></IconButton>
                <IconButton><DeleteIcon /></IconButton>
              </CardActions>
            </Card>
          </Box>
        ))}
      </Box>
      <Dialog open={!!selected} onClose={() => setSelected(null)} maxWidth="sm" fullWidth>
        <DialogTitle>Employee Details</DialogTitle>
        <DialogContent>
          {selected && (
            <>
              <Typography variant="h6">ID: {selected.id}</Typography>
              <Typography>Name: {selected.name}</Typography>
              <Typography>Age: {selected.age}</Typography>
              <Typography>Class: {selected.class}</Typography>
              <Typography>Subjects: {Array.isArray(selected.subjects) ? selected.subjects.join(', ') : selected.subjects}</Typography>
              <Typography>Attendance: {selected.attendance}</Typography>
              <Button onClick={() => setSelected(null)} sx={{ mt: 2 }}>Back to Tiles</Button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}