import ContactDetails from '../components/contacts/Details';
import ContactEntry from '../components/contacts/Entry';
import ContactList from '../components/contacts/List';
import Home from '../components';
import NotFound from '../components/NotFound';
import Router from 'vue-router';
import Vue from 'vue';

Vue.use(Router);

const fallbackRoute = { path: '*', component: NotFound };

const router = new Router({
  routes: [{
    path: '/',
    component: Home,
    children: [{
      path: '',
      name: 'contact-list',
      component: ContactList
    }, {
      path: '/contact-details/:id',
      name: 'contact-details',
      component: ContactDetails
    }, {
      path: '/contact-entry',
      name: 'contact-entry',
      component: ContactEntry
    }]
  }, fallbackRoute]
});

export default router;
