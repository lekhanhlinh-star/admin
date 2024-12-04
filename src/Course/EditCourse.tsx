import React from 'react';
import {
    Edit,
    SimpleForm,
    TextInput,
    NumberInput,
    ImageInput,
    ImageField,
    ArrayInput,
    SimpleFormIterator,
    ReferenceInput,
    SelectInput,
    SaveButton,
    Toolbar,
} from 'react-admin';
import { Card, CardContent, Typography, Box, Grid, TextField as MUITextField, Button } from '@mui/material';

// Custom toolbar to add save and cancel actions
const CourseEditToolbar = (props: any) => (
    <Toolbar {...props}>
        <SaveButton variant="contained" color="primary" />
    </Toolbar>
);

const EditCourse = (props: any) => (
    <Edit {...props}>
        <SimpleForm toolbar={<CourseEditToolbar />}>
            {/* Course Title */}
            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Typography variant="h6" gutterBottom>Course Title</Typography>
                    <MUITextField
                        source="title"
                        label="Title"
                        fullWidth
                        variant="outlined"
                        size="small"
                    />
                </CardContent>
            </Card>

            {/* Course Description */}
            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Typography variant="h6" gutterBottom>Description</Typography>
                    <MUITextField
                        source="description"
                        label="Description"
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                        size="small"
                    />
                </CardContent>
            </Card>

            {/* Course Thumbnail */}
            <Card sx={{ mb: 3 }}>
                <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" gutterBottom>Course Thumbnail</Typography>
                    <ImageInput
                        source="thumbnail"
                        label="Upload Image"
                        accept="image/*"
                        sx={{ display: 'flex', justifyContent: 'center' }}
                    >
                        <ImageField source="thumbnail" title="Course Thumbnail" />
                    </ImageInput>
                </CardContent>
            </Card>

            {/* Course Price */}
            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Typography variant="h6" gutterBottom>Price (VND)</Typography>
                    <NumberInput
                        source="price"
                        label="Price"
                        fullWidth
                        variant="outlined"
                        size="small"
                    />
                </CardContent>
            </Card>

            {/* Course Tags */}
            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Typography variant="h6" gutterBottom>Tags</Typography>
                    <ArrayInput source="tag">
                        <SimpleFormIterator>
                            <TextInput label="Tag" source={''} variant="outlined" />
                        </SimpleFormIterator>
                    </ArrayInput>
                </CardContent>
            </Card>

            {/* Course Rating */}
            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Typography variant="h6" gutterBottom>Average Rating</Typography>
                    <NumberInput
                        source="review.average_rating"
                        label="Average Rating"
                        fullWidth
                        variant="outlined"
                        size="small"
                    />
                </CardContent>
            </Card>

            {/* Instructor Information */}
            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Typography variant="h6" gutterBottom>Instructor</Typography>
                    <ReferenceInput source="owner._id" reference="users" label="Instructor">
                        <SelectInput optionText="first_name" variant="outlined" fullWidth />
                    </ReferenceInput>
                </CardContent>
            </Card>
        </SimpleForm>
    </Edit>
);

export default EditCourse;
