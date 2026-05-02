import { useState, useMemo } from 'react';
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
import usersSeed from '../../assets/users.json';

const roles = ['admin', 'editor', 'viewer'];
const genders = ['male', 'female', 'other'];

const blankForm = {
  firstName: '',
  lastName: '',
  age: '',
  gender: '',
  contactNumber: '',
  email: '',
  role: 'editor',
  username: '',
  password: '',
  address: '',
  isActive: true,
};

const labelize = (value) =>
  value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : '';

const loadUsers = () => {
  try {
    return {
      users: usersSeed.map((user, index) => ({
        id: index + 1,
        firstName: String(user.firstName ?? '').trim(),
        lastName: String(user.lastName ?? '').trim(),
        age: String(user.age ?? '').trim(),
        gender: genders.includes(String(user.gender ?? '').trim().toLowerCase())
          ? String(user.gender ?? '').trim().toLowerCase()
          : '',
        contactNumber: String(user.contactNumber ?? '').trim(),
        email: String(user.email ?? '').trim().toLowerCase(),
        role: roles.includes(String(user.role ?? '').trim().toLowerCase())
          ? String(user.role ?? '').trim().toLowerCase()
          : 'editor',
        username: String(user.username ?? '').trim().toLowerCase(),
        password: String(user.password ?? ''),
        address: String(user.address ?? '').trim(),
        isActive: typeof user.isActive === 'boolean' ? user.isActive : true,
      })),
      error: '',
    };
  } catch (err) {
    return {
      users: [],
      error: 'Unable to read users from src/assets/users.json.',
    };
  }
};

const seed = loadUsers();

const UsersPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [users, setUsers] = useState(seed.users);
  const [modal, setModal] = useState({ open: false, id: null });
  const [form, setForm] = useState(blankForm);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  // Search and Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterGender, setFilterGender] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.username.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRole = filterRole === 'all' || user.role === filterRole;
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
    if (!form.firstName.trim()) newErrors.firstName = 'Required';
    if (!form.lastName.trim()) newErrors.lastName = 'Required';
    
    // Enhancement 3: Easy Validations
    if (!form.age.trim()) {
      newErrors.age = 'Required';
    } else if (isNaN(form.age)) {
      newErrors.age = 'Age must be a number only';
    }

    if (!form.username.trim()) {
      newErrors.username = 'Required';
    } else if (/\s/.test(form.username)) {
      newErrors.username = 'Username must not contain spaces';
    }

    if (!form.password && !modal.id) {
        newErrors.password = 'Required';
    } else if (form.password && form.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!form.contactNumber.trim()) {
      newErrors.contactNumber = 'Required';
    } else if (!/^\d{11}$/.test(form.contactNumber)) {
      newErrors.contactNumber = 'Contact number must be 11 digits';
    }

    if (!form.email.trim()) {
      newErrors.email = 'Required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (modal.id) {
      setUsers((prev) =>
        prev.map((u) => (u.id === modal.id ? { ...form } : u))
      );
    } else {
      const newUser = {
        ...form,
        id: users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1,
      };
      setUsers((prev) => [...prev, newUser]);
    }
    closeModal();
  };

  const toggleStatus = (id) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, isActive: !u.isActive } : u))
    );
  };

  const fieldProps = (name, label, extra = {}) => ({
    name,
    label,
    value: form[name],
    onChange: handleChange,
    error: Boolean(errors[name]),
    helperText: errors[name],
    fullWidth: true,
    ...extra,
  });

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'fullName',
      headerName: 'Full Name',
      flex: 1,
      minWidth: 150,
      valueGetter: (value, row) => `${row.firstName} ${row.lastName}`,
    },
    { field: 'username', headerName: 'Username', width: 130 },
    {
        field: 'role',
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
            onClick={() => toggleStatus(params.row.id)}
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

      {seed.error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {seed.error}
        </Alert>
      )}

      {/* Enhancement 2: Search and Filter */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          <TextField
            label="Search Users"
            variant="outlined"
            size="small"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            slotProps={{
                input: {
                    startAdornment: (
                        <InputAdornment position="start">
                          <Search />
                        </InputAdornment>
                      ),
                }
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
              <TextField {...fieldProps('role', 'Role', { select: true })}>
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
                  slotProps: {
                      input: {
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
