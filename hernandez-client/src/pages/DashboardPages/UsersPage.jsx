import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Alert,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
  useTheme,
  useMediaQuery,
  FormControlLabel,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Search,
} from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import { fetchUsers, createUser, updateUser, deleteUser } from '../../services/UserService';

const roles = ['admin', 'editor', 'viewer'];
const genders = ['male', 'female', 'other'];

const blankForm = {
  firstName: '',
  lastName: '',
  age: '',
  gender: '',
  contactNumber: '',
  email: '',
  type: 'editor',
  username: '',
  password: '',
  address: '',
  isActive: true,
};

const labelize = (value) =>
  value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : '';

const UsersPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({ open: false, id: null });
  const [form, setForm] = useState(blankForm);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState('');

  // Search and Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterGender, setFilterGender] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Enhancement 1: Editors cannot access the UsersPage
  useEffect(() => {
    const userType = localStorage.getItem('type');
    if (userType === 'editor') {
        navigate('/dashboard');
    }
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
        const { data } = await fetchUsers();
        // Map _id to id for DataGrid compatibility
        const mappedUsers = data.users.map(u => ({ ...u, id: u._id }));
        setUsers(mappedUsers);
        setApiError('');
    } catch (err) {
        setApiError('Failed to fetch users from backend.');
    } finally {
        setLoading(false);
    }
  };

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.username?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRole = filterRole === 'all' || user.type === filterRole;
      const matchesGender = filterGender === 'all' || user.gender === filterGender;
      const matchesStatus =
        filterStatus === 'all' ||
        (filterStatus === 'active' ? user.isActive : !user.isActive);

      return matchesSearch && matchesRole && matchesGender && matchesStatus;
    });
  }, [users, searchTerm, filterRole, filterGender, filterStatus]);

  const resetForm = () => {
    setForm(blankForm);
    setErrors({});
    setShowPassword(false);
  };

  const openModal = (user = null) => {
    if (user) {
      setForm({ ...user });
      setModal({ open: true, id: user.id });
    } else {
      resetForm();
      setModal({ open: true, id: null });
    }
  };

  const closeModal = () => {
    setModal({ open: false, id: null });
  };

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.firstName?.trim()) newErrors.firstName = 'Required';
    if (!form.lastName?.trim()) newErrors.lastName = 'Required';
    
    if (!String(form.age)?.trim()) {
      newErrors.age = 'Required';
    } else if (isNaN(form.age)) {
      newErrors.age = 'Age must be a number';
    }

    if (!form.username?.trim()) {
      newErrors.username = 'Required';
    } else if (/\s/.test(form.username)) {
      newErrors.username = 'Username must not contain spaces';
    }

    if (!form.password && !modal.id) {
        newErrors.password = 'Required';
    } else if (form.password && form.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!form.contactNumber?.trim()) {
      newErrors.contactNumber = 'Required';
    } else if (!/^\d{11}$/.test(form.contactNumber)) {
      newErrors.contactNumber = 'Contact number must be 11 digits';
    }

    if (!form.email?.trim()) {
      newErrors.email = 'Required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
        if (modal.id) {
            await updateUser(modal.id, form);
        } else {
            await createUser(form);
        }
        loadUsers();
        closeModal();
    } catch (err) {
        setApiError(err.response?.data?.message || 'Failed to save user.');
    }
  };

  const toggleStatus = async (user) => {
    try {
        await updateUser(user.id, { isActive: !user.isActive });
        loadUsers();
    } catch (err) {
        setApiError('Failed to toggle user status.');
    }
  };

  const fieldProps = (name, label, extra = {}) => ({
    name,
    label,
    value: form[name] || '',
    onChange: handleChange,
    error: Boolean(errors[name]),
    helperText: errors[name],
    fullWidth: true,
    ...extra,
  });

  const columns = [
    {
      field: 'fullName',
      headerName: 'Full Name',
      flex: 1,
      minWidth: 150,
      valueGetter: (value, row) => `${row.firstName} ${row.lastName}`,
    },
    { field: 'username', headerName: 'Username', width: 130 },
    {
        field: 'type',
        headerName: 'Role',
        width: 110,
        renderCell: (params) => labelize(params.value),
    },
    {
      field: 'isActive',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value ? 'Active' : 'Inactive'}
          color={params.value ? 'success' : 'default'}
          size="small"
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 180,
      sortable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
          <Button size="small" variant="outlined" onClick={() => openModal(params.row)}>
            Edit
          </Button>
          <Button
            size="small"
            variant="contained"
            color={params.row.isActive ? 'warning' : 'primary'}
            onClick={() => toggleStatus(params.row.row)}
          >
            {params.row.isActive ? 'Disable' : 'Activate'}
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <Box>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Typography variant="h4">Users Management</Typography>
        <Button variant="contained" onClick={() => openModal()}>
          Add User
        </Button>
      </Stack>

      {apiError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {apiError}
        </Alert>
      )}

      <Paper sx={{ p: 2, mb: 3 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          <TextField
            label="Search Users"
            variant="outlined"
            size="small"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            placeholder="Search by name, email, or username"
          />
          <Stack direction="row" spacing={1} sx={{ minWidth: { md: 400 } }}>
            <TextField
              select
              label="Role"
              size="small"
              fullWidth
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
            >
              <MenuItem value="all">All Roles</MenuItem>
              {roles.map((role) => (
                <MenuItem key={role} value={role}>
                  {labelize(role)}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Gender"
              size="small"
              fullWidth
              value={filterGender}
              onChange={(e) => setFilterGender(e.target.value)}
            >
              <MenuItem value="all">All Genders</MenuItem>
              {genders.map((gender) => (
                <MenuItem key={gender} value={gender}>
                  {labelize(gender)}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Status"
              size="small"
              fullWidth
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <MenuItem value="all">All Status</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </TextField>
          </Stack>
        </Stack>
      </Paper>

      <Paper sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={filteredUsers}
          columns={columns}
          loading={loading}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Paper>

      <Dialog
        open={modal.open}
        onClose={closeModal}
        fullWidth
        maxWidth="sm"
        fullScreen={isMobile}
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle>{modal.id ? 'Edit User' : 'Add New User'}</DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ mt: 1 }}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField {...fieldProps('firstName', 'First Name')} />
                <TextField {...fieldProps('lastName', 'Last Name')} />
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField {...fieldProps('age', 'Age')} />
                <TextField {...fieldProps('gender', 'Gender', { select: true })}>
                  {genders.map((g) => (
                    <MenuItem key={g} value={g}>
                      {labelize(g)}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>
              <TextField {...fieldProps('contactNumber', 'Contact Number')} />
              <TextField {...fieldProps('email', 'Email')} />
              <TextField {...fieldProps('type', 'Role', { select: true })}>
                {roles.map((r) => (
                  <MenuItem key={r} value={r}>
                    {labelize(r)}
                  </MenuItem>
                ))}
              </TextField>
              <TextField {...fieldProps('username', 'Username')} />
              <TextField
                {...fieldProps('password', 'Password', {
                  type: showPassword ? 'text' : 'password',
                  InputProps: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }
                })}
              />
              <TextField {...fieldProps('address', 'Address', { multiline: true, rows: 2 })} />
              <FormControlLabel
                control={
                  <Switch
                    checked={form.isActive}
                    onChange={handleChange}
                    name="isActive"
                  />
                }
                label={form.isActive ? 'Status: Active' : 'Status: Inactive'}
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={closeModal}>Cancel</Button>
            <Button type="submit" variant="contained">
              {modal.id ? 'Update User' : 'Add User'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default UsersPage;

