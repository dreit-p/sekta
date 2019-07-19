let state = {
	mainLinks: [
		{
			link: '/about-us',
			name: 'О проекте'
		},
		{
			link: '/articles',
			name: 'Наши статьи'
		},
		{
			link: '/results',
			name: 'Результаты'
		},
		{
			link: '/contacts',
			name: 'Контакты'
		},
	],
	additionalLinks: [
		{
			link: '/online',
			name: 'Онлайн курсы',
			subLinks: [
				{
					link: '/online/evo',
					name: 'Курс Evolution'
				},
				{
					link: '/online/sektamama',
					name: 'Курс для мам'
				},
				{
					link: '/online/SektaCare',
					name: 'Курс #SektaCare'
				},
				{
					link: '/online/sektavip',
					name: 'VIP программа'
				},
				{
					link: '/online/pregnant',
					name: 'Курсы для беременных'
				},
				{
					link: '/online/s60days-men',
					name: 'Курс #s60days для мужчин'
				},
			]
		},
		{
			link: '/gym',
			name: 'Тренировки в зале',
			subLinks: [
				{
					link: '/gym/moscow',
					name: 'Москва'
				},
				{
					link: '/gym/saint-pitersburg',
					name: 'Санкт-Петербург'
				}
			]
		},
		{
			link: '/camp',
			name: 'Летний лагерь'
		},
		{
			link: '/gift-cert',
			name: 'Подарочный сертификат'
		}
	],
	isOpenedMenu: false
};

let actions = {
	setMenuState ({dispatch, commit}, payload) {
		dispatch('lockScroll', payload, { root: true });
		commit('setMenuState', payload);
	},
};

let mutations = {
	setMenuState (state, payload) {
		state.isOpenedMenu = payload;
	},
};

export default {
	namespaced: true,
	state,
	actions,
	mutations,
}