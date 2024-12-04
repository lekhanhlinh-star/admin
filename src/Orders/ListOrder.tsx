import React from 'react';
import { List, Datagrid, TextField, NumberField, DateField, ArrayField, ChipField } from 'react-admin';

const OrderList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" label="ID" />
      <TextField source="full_name" label="Họ và tên" />
      <TextField source="number_phone" label="Số điện thoại" />
      <TextField source="address" label="Địa chỉ" />
      <TextField source="status" label="Trạng thái" />
      <NumberField source="total_amount" label="Tổng tiền" />
      <DateField source="created_at" label="Ngày tạo" />

      <ArrayField source="order_items" label="Sản phẩm">
        <Datagrid>
          <TextField source="product.name" label="Tên sản phẩm" />
          <NumberField source="product.price" label="Giá sản phẩm" />
          <NumberField source="quantity" label="Số lượng" />
        </Datagrid>
      </ArrayField>
    </Datagrid>
  </List>
);

export default OrderList;
