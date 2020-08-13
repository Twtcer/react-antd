import Login from '../pages/login'; 
import NotFound from '../pages/NotFound';

import Index from '../pages/admin/dashboard';
import List from '../pages/admin/products/list';
import Edit from '../pages/admin/products/edit';
import Notice from '../pages/admin/notices/notice';


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
        title: '看板',
        icon: '<AreaChartOutlined />',
    },
    {
        path: '/admin/products',
        component: List,
        exact: true,
        isShow:true,
        title: '商品管理',
        icon: '<AppstoreOutlined />',
    },
    {
        path: '/admin/products/edit/:id?',// id设为可选参数
        component: Edit,
        isShow:false,
        title: '商品编辑'
    },
    {
        path: "/admin/notices",  
        component: Notice,
        isShow: false,
    }
];

export {
    mainRoutes,
    adminRoutes
}