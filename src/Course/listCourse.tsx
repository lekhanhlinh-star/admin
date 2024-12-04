import React from 'react';
import {
    CreateButton,
    DatagridConfigurable,
    ExportButton,
    FilterButton,
    List,
    SelectColumnsButton,
    TopToolbar,
    SearchInput,
    TextInput,
    TextField,
    NumberField,
    ReferenceField,
    ImageField,
    SelectInput,
    ChipField,

} from 'react-admin';
import IconEvent from '@mui/icons-material/Event';

// Tạo một toolbar với các hành động cho List
const ListActions = () => (
    <TopToolbar>
        <SelectColumnsButton />
        <FilterButton />
        <ExportButton />
    </TopToolbar>
);

// Lọc theo tiêu đề bài viết và tìm kiếm chung
const courseFilters = [
    <SearchInput source="search" alwaysOn />,
    <TextInput label="Title" source="title" />,
    <SelectInput 
        label="Status"
        source="status"
        defaultValue=""     
        choices={[
            { id: '', name: 'All' },
            { id: 'Pending', name: 'Pending' },
            { id: 'Published', name: 'Published' },
            { id: 'Draft', name: 'Draft' }
        ]}
    />
];

// Component CourseList
export const CourseList = () => (
    

    
    <List actions={<ListActions />} filters={courseFilters} >
        <DatagridConfigurable>
            {/* Hiển thị các trường thông tin khóa học */}
            <TextField source="title" label="Course Title" />
            <TextField source="level" label="Level" />
            <NumberField source="price" label="Price" />
            
            {/* Hiển thị tên chủ sở hữu khóa học */}
            <TextField source="owner.first_name" label="Owner" />

            {/* Hiển thị hình ảnh thumbnail */}
            <ImageField source="thumbnail" label="Thumbnail" />
            
            {/* Hiển thị trạng thái */}
            <ChipField
                source="status"
                label="Status"
                sx={{
                    backgroundColor: '#4f3cc9',  // Mạ vòng xanh lớn
                    color: 'white',  // Chữ trắng cho dễ nhìn
                    padding: '0.5em', // Thêm padding để đẹp hơn
                    borderRadius: '8px',  // Đường viền bo tròn
                    fontWeight: 'bold',  // Chữ đậm
                }}
            />
            

            {/* Hiển thị tổng số đánh giá */}
            <NumberField source="review.total_reviews" label="Total Reviews" />

           
        </DatagridConfigurable>
    </List>
);
