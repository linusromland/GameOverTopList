import { createRouter, createWebHistory } from 'vue-router';

export default createRouter({
	history: createWebHistory(),
	routes: [
		{
			component: () => import('./views/Home.vue'),
			path: '/'
		},
		{
			component: () => import('./views/Rooms.vue'),
			path: '/rooms'
		}
	]
});
