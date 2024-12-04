import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  DateField,
  BooleanField,
  ImageField,
  TextInput,
  SelectInput,
  SearchInput
} from 'react-admin';
import { Card, CardContent, Typography } from '@mui/material';
const userFilters = [
  <SearchInput source="search" alwaysOn />,

  <SelectInput 
      label="role"
      source="role"
      defaultValue=""     
      choices={[
          { id: '', name: 'All' },
          { id: 'Student', name: 'Student' },
          { id: 'Admin', name: 'Admin' },
          { id: 'Lecturer', name: 'Lecturer' }
      ]}
  />
];
const UserList = (props: any) => {
  return (
    <List {...props} filters={userFilters}>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            User List
          </Typography>
          <Datagrid>
            {/* Display fields for the User model */}
            <TextField label="First Name" source="first_name" />
            <TextField label="Last Name" source="last_name" />
            <TextField label="Email" source="email" />
            <TextField label="Role" source="role" />
            <ImageField label="Avatar" source="photo" />
            <TextField label="Facebook" source="facebook_link" />
            <TextField label="LinkedIn" source="linkedin_link" />
            <TextField label="YouTube" source="youtube_link" />
          </Datagrid>
        </CardContent>
      </Card>
    </List>
  );
};

export default UserList;
