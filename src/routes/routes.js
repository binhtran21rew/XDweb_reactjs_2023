import Dashboard from '../components/admin/Dashboard'
import Profile from '../components/admin/Profile'

import AddCategory from '../components/admin/Category/AddCategory'
import ViewCategory from '../components/admin/Category/ViewCategory'
import EditCategory from '../components/admin/Category/EditCategory'
import GarbageCategory from '../components/admin/Category/GarbageCategory'

import ViewProduct from '../components/admin/Product/ViewProduct'
import AddProduct from '../components/admin/Product/AddProduct'
import EditProduct from '../components/admin/Product/EditProduct'


import ViewSlider from '../components/admin/Slider/ViewSlider'
import AddSlider from '../components/admin/Slider/AddSlider'
import EditSlider from '../components/admin/Slider/EditSlider'

import ViewOrder from '../components/admin/Order/ViewOrder';
import DetailOrder from '../components/admin/Order/DetailsOrder';


const routes = [
    { path: '/admin', exact: true, name: 'Admin'},
    { path: '/admin/dashboard', exact: true, name: 'Dashboard', component: Dashboard},
    { path: '/admin/profile', exact: true, name: 'Profile', component: Profile},
    // category
    { path: '/admin/Add_categories', exact: true, name: 'AddCategory', component: AddCategory},
    { path: '/admin/categories', exact: true, name: 'ViewCategory', component: ViewCategory},
    { path: '/admin/edit_category/:id', exact: true, name: 'EditCategory', component: EditCategory},
    { path: '/admin/garbage_categories', exact: true, name: 'GarbageCategory', component: GarbageCategory},

    // product
    { path: '/admin/product', exact: true, name: 'ViewProdcut', component: ViewProduct},
    { path: '/admin/Add_product', exact: true, name: 'AddProduct', component: AddProduct},
    { path: '/admin/edit_product/:id', exact: true, name: 'EditProduct', component: EditProduct},


    // slider
    { path: '/admin/slider', exact: true, name: 'ViewSlider', component: ViewSlider},
    { path: '/admin/add_slider', exact: true, name: 'AddSlider', component: AddSlider},
    { path: '/admin/edit_slider/:id', exact: true, name: 'EditSlider', component: EditSlider},

    // order
    { path: '/admin/orders', exact: true, name: 'ViewOrder', component: ViewOrder},
    { path: '/admin/detail_orders/:id', exact: true, name: 'DetailOrder', component: DetailOrder},


]
export default routes