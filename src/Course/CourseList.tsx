import React, { useState, useEffect } from 'react';
import { Link, Title, useGetList } from 'react-admin';
import {
    Grid,
    TextField,
    Box,
    CircularProgress,
    Slider,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Button,
    Typography,
    Pagination,
    Card,
    CardMedia,
    CardContent,
    Rating,
} from '@mui/material';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import debounce from 'lodash/debounce';

const CourseList = () => {
    const [filter, setFilter] = useState('');
    const [debouncedFilter, setDebouncedFilter] = useState('');
    const [page, setPage] = useState(1);
    const perPage = 8;

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'Pending':
                return { backgroundColor: '#f0ad4e', color: '#fff' }; // Orange for Pending
            case 'Draft':
                return { backgroundColor: '#d9534f', color: '#fff' }; // Red for Draft
            case 'Published':
                return { backgroundColor: '#5bc0de', color: '#fff' }; // Blue for Published
            default:
                return { backgroundColor: '#999', color: '#fff' }; // Gray for unknown status
        }
    };

    const [category, setCategory] = useState('');
    const [priceRange, setPriceRange] = useState([0, 10000]);
    const [rating, setRating] = useState([0, 5]);
    const [status, setStatus] = useState(''); // Add status filter

    // Debounce filter input to reduce API calls
    useEffect(() => {
        const handler = debounce(() => setDebouncedFilter(filter), 10000);
        handler();
        return () => handler.cancel();
    }, [filter]);

    // Fetch data with useGetList hook from react-admin
    const { data, total, isPending } = useGetList('courses', {
        filter: {
            title: debouncedFilter,
            search: filter,
            category: category || undefined,
            status: status || undefined, // Filter by status
            min_price: priceRange[0],
            max_price: priceRange[1],
            min_rating: rating[0],
            max_rating: rating[1],
        },
        pagination: { page, perPage },
        sort: { field: 'title', order: 'ASC' },
    });


    return (
        <div>
            <Title title="Course List" />

            {/* Filters */}
            <Box sx={{ marginBottom: 3, padding: 2, backgroundColor: '#f7f7f7', borderRadius: 2 }}>
                <Grid container spacing={2}>
                    {/* Course Search */}
                    <Grid item xs={12} md={4}>
                        <TextField
                            label="Search Courses"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            variant="outlined"
                            size="small"
                            fullWidth
                        />
                    </Grid>

                    {/* Category Filter */}
                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth variant="outlined" size="small">
                            <InputLabel>Category</InputLabel>
                            <Select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                label="Category"
                            >
                                {/* Add your categories here */}
                                <MenuItem value="">All</MenuItem>
                                <MenuItem value="Programming">Programming</MenuItem>
                                <MenuItem value="Design">Design</MenuItem>
                                <MenuItem value="Marketing">Marketing</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>


                    {/* Status Filter */}
                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth variant="outlined" size="small">
                            <InputLabel>Status</InputLabel>
                            <Select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                label="Status"
                            >
                                <MenuItem value="">All</MenuItem>
                                <MenuItem value="Pending">Pending</MenuItem>
                                <MenuItem value="Completed">Completed</MenuItem>
                                <MenuItem value="Upcoming">Upcoming</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Box>

            {/* Course List */}
            <Grid container spacing={2}>
                {isPending ? (
                    <Grid item xs={12}>
                        <CircularProgress />
                    </Grid>
                ) : (
                    data.map((course) => (
                        <Grid item xs={12} sm={6} md={4} key={course.id}>
                            <Card>
                            <Link to={`/courses/${course._id}/show`} style={{ textDecoration: 'none' }}>
                                <CardMedia
                                    component="img"
                                    alt={course.title}
                                    height="140"
                                    image={course.thumbnail}
                                />
                                 </Link>
                                <CardContent>
                                    <Typography variant="h6">{course.title}</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {course.category.join(', ')}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Price: {course.price} USD
                                    </Typography>
                                    <Box display="flex" alignItems="center" mt={1}>
                                        <Rating
                                            value={course.review.average_rating}
                                            readOnly
                                            precision={0.5}
                                            size="small"
                                        />
                                        <Typography variant="body2" color="text.secondary" ml={1}>
                                            {course.review.total_reviews} reviews
                                        </Typography>
                                    </Box>
                                    <Box mt={2}>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    ...getStatusStyle(course.status), // Apply dynamic styling
                                                    padding: '4px 8px',
                                                    borderRadius: '4px',
                                                    display: 'inline-block'
                                                }}
                                            >
                                                {course.status}
                                            </Typography>
                                        </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                )}
            </Grid>

            {/* Pagination */}
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                <Pagination
                    count={Math.ceil(total / perPage)}
                    page={page}
                    onChange={(e, newPage) => setPage(newPage)}
                    color="primary"
                />
            </Box>
        </div>
    );
};

export default CourseList;
