// @ts-ignore
const routes = require('next-routes')

const route = routes();
// Name   Page      Pattern
// @ts-ignore
module.exports = route
    .add({name: 'index', pattern: '/', page: 'index'})
    .add({name: 'login', pattern: '/login', page: 'login'})
    .add({name: 'stores', pattern: '/stores', page: 'stores'})
    .add({name: 'new-store', pattern: '/new-store', page: 'new-store'})
    // .add({name: 'register', pattern: '/register', page: 'register'})
    .add({name: 'dashboard', pattern: '/dashboard', page: 'dashboard'})
    .add({name: 'dashboard-banners', pattern: '/dashboard/banners', page: 'dashboard/banners'})
    .add({name: 'dashboard-create-banner', pattern: '/dashboard/banner/create', page: 'dashboard/create-banner'})
    .add({name: 'dashboard-update-banner', pattern: '/dashboard/banner/:id/update', page: 'dashboard/update-banner'})
    .add({name: 'dashboard-users', pattern: '/dashboard/users', page: 'dashboard/users'})
    .add({name: 'dashboard-studio', pattern: '/dashboard/studios', page: 'dashboard/studios'})
    .add({name: 'dashboard-create-studio', pattern: '/dashboard/studio/create', page: 'dashboard/create-studio'})
    .add({
        name: 'dashboard-create-studio-prices',
        pattern: '/dashboard/studio/:id/update/price',
        page: 'dashboard/create-studio-prices'
    })
    .add({
        name: 'dashboard-create-studio-images',
        pattern: '/dashboard/studio/:id/update/images',
        page: 'dashboard/create-studio-images'
    })
    .add({
        name: 'dashboard-create-stream',
        pattern: '/dashboard/stream/create',
        page: 'dashboard/create-stream'
    })
    .add({
        name: 'dashboard-streams',
        pattern: '/dashboard/streams',
        page: 'dashboard/streams'
    })