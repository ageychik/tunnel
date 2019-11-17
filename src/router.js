import Vue from 'vue'
import VueRouter from 'vue-router'
import DefaultLayout from './layouts/Default.vue'
import Dashboard from './views/Dashboard.vue'
import Products from './views/Products.vue'

Vue.use(VueRouter);

export default new VueRouter({
    routes: [{
        path: '/',
        component: DefaultLayout,
        children: [{
            path: '',
            name: 'Dashboard',
            component: Dashboard
        },{
            path: '/products',
            name: 'Products',
            component: Products,
            children: [{
                path: 'local',
                name: 'Local Products',
                component: Products,
            }, {
                path: 'site',
                name: 'Parsing Products',
                component: Products
            }]
        }]
    }]
});


