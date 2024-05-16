import Dashboard from '../components/admin/Dashboard';
import AddUsers from '../components/admin/users/AddUsers';
import Users from '../components/admin/Users';
import Category from '../components/admin/category/Category';
import ViewCategory from '../components/admin/category/ViewCategory';
import EditCategory from '../components/admin/category/EditCategory';
import AddProduct from '../components/admin/product/AddProduct';
import ViewProduct from '../components/admin/product/ViewProduct';
import EditProduct from '../components/admin/product/EditProduct';
import Order from '../components/admin/order/Order';
import Returns from '../components/admin/returns/Returns';
import ViewOrderItems from '../components/admin/order/ViewOrderItems';


const routes = [
    { path: '/admin', exact: true, name: 'Admin' },
    { path: '/admin/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
    { path: '/admin/add-category', exact: true, name: 'Category', component: Category },
    { path: '/admin/add-users', exact: true, name: 'Users', component: AddUsers },
    { path: '/admin/view-category', exact: true, name: 'ViewCategory', component: ViewCategory },
    { path: '/admin/edit-category/:id', exact: true, name: 'EditCategory', component: EditCategory },
    { path: '/admin/add-product', exact: true, name: 'AddProduct', component: AddProduct },
    { path: '/admin/view-product', exact: true, name: 'ViewProduct', component: ViewProduct },
    { path: '/admin/edit-product/:id', exact: true, name: 'EditProduct', component: EditProduct },
    { path: '/admin/users', exact: true, name: 'Users', component: Users },
    { path: '/admin/orders', exact: true, name: 'Order', component: Order },
    { path: '/admin/returns', exact: true, name: 'Returns', component: Returns },
    { path: '/admin/view-orders/:orderId', exact: true, name: 'ViewOrderItems', component: ViewOrderItems },
];

export default routes;