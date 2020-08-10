import Login from '../pages/login'; 
import NotFound from '../pages/NotFound';

import Index from '../pages/admin/dashboard';
import List from '../pages/admin/products/list';
import Edit from '../pages/admin/products/edit';


const mainRoutes = [
    {
        path: '/login',
        component: Login
    },
    {
        path: '/404',
        component: NotFound
    }
];

const adminRoutes = [
    {
        path: '/admin/dashboard',
        component: Index,
        isShow:true,
        title: '看板'
    },
    {
        path: '/admin/products',
        component: List,
        exact: true,
        isShow:true,
        title: '商品管理'
    },
    {
        path: '/admin/products/edit/:id',
        component: Edit,
        isShow:false,
        title: '商品编辑'
    }
];

export {
    mainRoutes,
    adminRoutes
}