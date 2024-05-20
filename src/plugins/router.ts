import { createRouter, createWebHistory } from 'vue-router';

import Index from '../pages/Index.vue';

const routes = [
    {
        path: '/', // if have no languageCodeLike parameter here, then just use the navigator.language matched value.
        name: 'Index',
        component: Index,
    },
    {
        path: '/E',
        name: 'Error',
        component: () => import('../pages/Error.vue'),
    },
    // other page routes
    {
        path: '/launcherx',
        name: 'LauncherX',
        component: () => import('../pages/LauncherX.vue'),
    },
    { path: '/lx', redirect: '/launcherx' },

    {
        path: '/cmf',
        name: 'CMF',
        component: () => import('../pages/CMF.vue'),
    },

    {
        path: '/join',
        name: 'JoinUs',
        component: () => import('../pages/JoinUs.vue'),
    },

    {
        path: '/about',
        name: 'About Us',
        component: () => import('../pages/About.vue'),
    },

    {
        path: '/contact',
        name: 'CONTACT(S)',
        component: () => import('../pages/Contacts.vue'),
    },
    { path: '/contacts', redirect: '/contact' },

    {
        path: '/jump/:target?',
        name: '日冕跃迁',
        component: () => import('../pages/Jump.vue'),
    },

    { path: '/:pathMatch(.*)', redirect: '/E' },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(() => {
    document.getElementById('loading-bar-top')!.classList.remove('fade-out');
    document.getElementById('loading-bar-top')!.classList.remove('hidden');
});
router.afterEach(() => {
    setTimeout(() => {
        document.getElementById('loading-bar-top')!.classList.add('fade-out');
    }, 1000);
    setTimeout(() => {
        document.getElementById('loading-bar-top')!.classList.add('hidden');
    }, 1234);
});

export default router;
