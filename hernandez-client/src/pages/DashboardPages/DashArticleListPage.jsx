import { useState, useMemo, useEffect } from 'react';
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
  TextField,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import { fetchArticles, createArticle, updateArticle, deleteArticle } from '../../services/ArticleService';

const blankForm = {
  slug: '',
  title: '',
  paragraphs: 0,
  preview: '',
  status: 'Active',
};

const DashArticleListPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({ open: false, id: null });
  const [form, setForm] = useState(blankForm);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    setLoading(true);
    try {
        const { data } = await fetchArticles();
        const mappedArticles = data.articles.map(a => ({ ...a, id: a._id }));
        setArticles(mappedArticles);
    } catch (err) {
        setApiError('Failed to fetch articles.');
    } finally {
        setLoading(false);
    }
  };

  const filteredArticles = useMemo(() => {
    return articles.filter((article) =>
      article.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.slug?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [articles, searchTerm]);

  const resetForm = () => {
    setForm(blankForm);
    setErrors({});
  };

  const openModal = (article = null) => {
    if (article) {
      setForm({ ...article });
      setModal({ open: true, id: article.id });
    } else {
      resetForm();
      setModal({ open: true, id: null });
    }
  };

  const closeModal = () => {
    setModal({ open: false, id: null });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.title?.trim()) newErrors.title = 'Required';
    if (!form.slug?.trim()) newErrors.slug = 'Required';
    if (form.paragraphs < 0) newErrors.paragraphs = 'Must be >= 0';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
        if (modal.id) {
            await updateArticle(modal.id, form);
        } else {
            await createArticle(form);
        }
        loadArticles();
        closeModal();
    } catch (err) {
        setApiError('Failed to save article.');
    }
  };

  const toggleStatus = async (article) => {
    try {
        const newStatus = article.status === 'Active' ? 'Disabled' : 'Active';
        await updateArticle(article.id, { status: newStatus });
        loadArticles();
    } catch (err) {
        setApiError('Failed to toggle status.');
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
    { field: 'slug', headerName: 'Slug', width: 130 },
    { field: 'title', headerName: 'Title', flex: 1, minWidth: 200 },
    { field: 'paragraphs', headerName: 'Paragraphs', width: 110 },
    { field: 'preview', headerName: 'Preview', width: 250 },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={params.value === 'Active' ? 'success' : 'default'}
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
            color={params.row.status === 'Active' ? 'warning' : 'primary'}
            onClick={() => toggleStatus(params.row.row)}
          >
            {params.row.status === 'Active' ? 'Disable' : 'Activate'}
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 3 }}
      >
        <Typography variant="h4">Articles Management</Typography>
        <Button variant="contained" onClick={() => openModal()}>
          Add Article
        </Button>
      </Stack>

      {apiError && <Alert severity="error" sx={{ mb: 2 }}>{apiError}</Alert>}

      <Paper sx={{ p: 2, mb: 3 }}>
        <TextField
          label="Search Articles"
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
        />
      </Paper>

      <Paper sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={filteredArticles}
          columns={columns}
          loading={loading}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          pageSizeOptions={[5, 10]}
        />
      </Paper>

      <Dialog open={modal.open} onClose={closeModal} fullWidth maxWidth="sm">
        <form onSubmit={handleSubmit}>
          <DialogTitle>{modal.id ? 'Edit Article' : 'Add Article'}</DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ mt: 1 }}>
              <TextField {...fieldProps('slug', 'Slug')} />
              <TextField {...fieldProps('title', 'Title')} />
              <TextField {...fieldProps('paragraphs', 'Paragraphs', { type: 'number' })} />
              <TextField {...fieldProps('preview', 'Preview', { multiline: true, rows: 3 })} />
              <TextField {...fieldProps('status', 'Status', { select: true })}>
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Disabled">Disabled</MenuItem>
              </TextField>
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={closeModal}>Cancel</Button>
            <Button type="submit" variant="contained">
                {modal.id ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default DashArticleListPage;
