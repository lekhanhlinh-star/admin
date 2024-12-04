import React from 'react';
import { Edit, SimpleForm, TextInput, NumberInput, SelectInput } from 'react-admin';

const OrderEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="full_name" label="Họ và tên" />
      <TextInput source="number_phone" label="Số điện thoại" />
      <TextInput source="address" label="Địa chỉ" />
      <SelectInput
        source="status"
        label="Trạng thái"
        choices={[
          { id: 'pending', name: 'Đang chờ xử lý' },
          { id: 'paid', name: 'Đã thanh toán' },
          { id: 'shipped', name: 'Đã vận chuyển' },
        ]}
      />
      <NumberInput source="total_amount" label="Tổng tiền" />
    </SimpleForm>
  </Edit>
);

export default OrderEdit;
