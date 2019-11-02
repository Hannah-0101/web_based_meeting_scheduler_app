import React from 'react';

const Forms = React.lazy(() => import('./views/Base/Forms'));
const Popovers = React.lazy(() => import('./views/Base/Popovers'));
const Tables = React.lazy(() => import('./views/Base/Tables'));
const Dashboard = React.lazy(() => import('./views/Dashboard'));
const User = React.lazy(() => import('./views/Users/User'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/base/forms', name: 'Forms', component: Forms },
  { path: '/base/tables', name: 'Tables', component: Tables },
  { path: '/base/popovers', name: 'Popovers', component: Popovers },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },
];

export default routes;
