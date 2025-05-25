import React, { useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Box,
  Typography
} from '@mui/material';
import { useQuery, useMutation, gql } from '@apollo/client';
import Pagination from '@mui/material/Pagination';

// ...existing code...


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

const ADD_EMPLOYEE_MUTATION = gql`
  mutation AddEmployee($input: EmployeeInput!) {
    addEmployee(input: $input) {
      id
      name
      age
      class
      subjects
      attendance
    }
  }
`;

const UPDATE_EMPLOYEE_MUTATION = gql`
  mutation UpdateEmployee($id: ID!, $input: EmployeeInput!) {
    updateEmployee(id: $id, input: $input) {
      id
      name
      age
      class
      subjects
      attendance
    }
  }
`;

export default function EmployeeGrid() {
  const { data, loading, refetch } = useQuery(EMPLOYEES_QUERY, {
    variables: { page: 1, pageSize: 10 },
  });

  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);

  

  const [open, setOpen] = useState(false);
  const [editEmployee, setEditEmployee] = useState<any>(null);
  const [form, setForm] = useState<any>({ name: '', age: '', class: '', subjects: '', attendance: '' });

  const [addEmployee] = useMutation(ADD_EMPLOYEE_MUTATION, {
    onCompleted: () => {
      setOpen(false);
      refetch();
    }
  });

  const [updateEmployee] = useMutation(UPDATE_EMPLOYEE_MUTATION, {
    onCompleted: () => {
      setOpen(false);
      setEditEmployee(null);
      refetch();
    }
  });


    // Refetch when page changes
  React.useEffect(() => {
    refetch({ page, pageSize });
  }, [page, pageSize, refetch]);

 if (loading) return <CircularProgress />;
  const employees = data?.employees?.employees || [];
  const total = data?.employees?.total || 0;
  const totalPages = Math.ceil(total / pageSize);

  const handleOpenAdd = () => {
    setForm({ name: '', age: '', class: '', subjects: '', attendance: '' });
    setEditEmployee(null);
    setOpen(true);
  };

  const handleOpenEdit = (emp: any) => {
    setForm({ ...emp, subjects: Array.isArray(emp.subjects) ? emp.subjects.join(', ') : emp.subjects });
    setEditEmployee(emp);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditEmployee(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const input = {
      name: form.name,
      age: parseInt(form.age, 10),
      class: form.class,
      subjects: form.subjects.split(',').map((s: string) => s.trim()),
      attendance: form.attendance,
    };
    if (editEmployee) {
      await updateEmployee({ variables: { id: editEmployee.id, input } });
    } else {
      await addEmployee({ variables: { input } });
    }
  };


  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };



  return (
    <Box sx={{ p: 3, background: '#f4f6fa', minHeight: '100vh' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Typography variant="h5" fontWeight={700} color="primary.dark">
          Employee Details
        </Typography>
        <Button
          variant="contained"
          color="primary"
          
          sx={{ borderRadius: 3, boxShadow: 2, fontWeight: 600 }}
        >
          Add Employee
        </Button>
      </Box>
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 4,
          boxShadow: 4,
          border: '1px solid #e3e6ef',
          background: '#fff',
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ background: '#e3e6ef' }}>
              <TableCell sx={{ fontWeight: 700 }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Age</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Class</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Subjects</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Attendance</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((emp: any) => (
              <TableRow
                key={emp.id}
                hover
                sx={{
                  transition: 'background 0.2s',
                  '&:hover': { background: '#f0f7ff' },
                }}
              >
                <TableCell>{emp.id}</TableCell>
                <TableCell>{emp.name}</TableCell>
                <TableCell>{emp.age}</TableCell>
                <TableCell>{emp.class}</TableCell>
                <TableCell>
                  {Array.isArray(emp.subjects)
                    ? emp.subjects.join(', ')
                    : emp.subjects}
                </TableCell>
                <TableCell>{emp.attendance}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{
                      borderRadius: 2,
                      textTransform: 'none',
                      fontWeight: 500,
                      mr: 1,
                    }}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mt: 3,
        }}
      >
        <Pagination
          count={totalPages}
          page={page}
          onChange={(_, value) => setPage(value)}
          color="primary"
          shape="rounded"
          size="large"
          showFirstButton
          showLastButton
        />
      </Box>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>
          {editEmployee ? 'Update Employee' : 'Add Employee'}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Age"
            name="age"
            value={form.age}
            onChange={handleChange}
            fullWidth
            type="number"
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Class"
            name="class"
            value={form.class}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Subjects (comma separated)"
            name="subjects"
            value={form.subjects}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Attendance"
            name="attendance"
            value={form.attendance}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleClose} sx={{ fontWeight: 600 }}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            sx={{ fontWeight: 600, borderRadius: 2 }}
          >
            {editEmployee ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}