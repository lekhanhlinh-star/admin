import {
  Admin,
  Resource,
  ListGuesser,
  EditGuesser,
  ShowGuesser,
} from "react-admin";
import { dataProvider } from "./dataProvider";
import ProductList from "./Course/CourseList";
import LoginPage from "./Login/Login_page";
import authProvider from "./Login/authProvider";
import Layout from "./Layout/Layout";
import UserList from "./User/ListUser";
import CourseShow from "./Course/CourseShow";
import OrderList from "./Orders/ListOrder";
import OrderEdit from "./Orders/OrderEdit";
import EditCourse from "./Course/EditCourse";
import UserShow from "./User/UserShow";
import { CourseList } from "./Course/listCourse";



export const App = () => (
  <Admin loginPage = {LoginPage}
    layout={Layout}
    dataProvider={dataProvider}
    authProvider={authProvider}
  >
    <Resource
      name="courses"
      list={CourseList}
  
      show={CourseShow}
    
    />
    <Resource name="users" list={UserList} show={UserShow}  />
    {/* <Resource name="orders" list={OrderList} edit={OrderEdit} /> */}




  </Admin>
);
