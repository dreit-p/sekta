import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'

const TEST_URL = `http://api.sektaschool.ru.dev.immelman.ru`;

Vue.use(Vuex)

const store = new Vuex.Store({
    plugins: [createPersistedState({
        paths: ['inputs', 'user', 'cityId'],
    })],
    state: {
        appStates: {
            isOpenedMenu: false,
            isScrollLocked: false,
            formModal: {
                isOpened: false,
                type: 'login'
            }
        },
        inputs: {},
        mainLinks: [{
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
        additionalLinks: [{
                link: '/online-courses',
                name: 'Онлайн курсы',
                subLinks: [{
                        link: '/online-courses/s60days',
                        name: 'Курс #s60days'
                    },
                    {
                        link: '/online-courses/sektamama',
                        name: 'Курс для мам'
                    },
                    {
                        link: '/online-courses/SektaCare',
                        name: 'Курс #SektaCare'
                    },
                    {
                        link: '/online-courses/sektavip',
                        name: 'VIP программа'
                    },
                    {
                        link: '/online-courses/pregnant',
                        name: 'Курсы для беременных'
                    },
                    {
                        link: '/online-courses/s60days-men',
                        name: 'Курс #s60days для мужчин'
                    },
                ]
            },
            {
                link: '/gym',
                name: 'Тренировки в зале',
                subLinks: [{
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
        user: {
            isAuth: false
        },
        cityId: null,
        onlineCourseData: null
    },
    mutations: {
        setMenuState(state, payload) {
            state.appStates.isOpenedMenu = payload;
        },
        setFormModalState(state, modalState) {
            state.appStates.formModal.isOpened = modalState;
        },
        setModalType(state, modalType) {
            state.appStates.formModal.type = modalType;
        },
        setScrollLock(state, payload) {
            state.appStates.isScrollLocked = payload;
        },
        setInputData(state, { name, data }) {
            state.inputs[name] = data;
        },
        setUserInfo(state, { type, data }) {
            state.user[type] = data;
        },
        setCity(state, { city }) {
            state.cityId = city.id;
        },
        setOnlineDate(state, data) {
            state.onlineCourseData = data;
        }
    },
    actions: {
        setMenuState({ dispatch, commit }, payload) {
            dispatch('lockScroll', payload);
            commit('setMenuState', payload);
        },
        setFormModalState({ dispatch, commit }, { modalState, type }) {
            if (modalState !== undefined) {
                dispatch('lockScroll', modalState);
                commit('setFormModalState', modalState);
            }
            if (type !== undefined) {
                commit('setModalType', type);
            }
        },
        lockScroll({ commit }, payload) {
            let body = document.getElementsByTagName('body')[0];
            if (payload) {
                let scrollWidth = window.innerWidth - document.documentElement.clientWidth;
                body.classList.add('scroll-locked');
                body.style.overflowX = 'hidden';
                body.style.overflowY = 'hidden';
                body.style.paddingRight = scrollWidth + 'px';
            } else {
                body.classList.remove('scroll-locked');
                body.style.overflowX = 'auto';
                body.style.overflowY = 'scroll';
                body.style.paddingRight = 0;
            }
            commit('setScrollLock', payload);
        },
        requestOnlineCourse({ commit }) {
            return axios
                .get(`${TEST_URL}/api/online-courses`)
                .then(response => {
                    console.log(response.data.data)
                    commit('setOnlineDate', response.data.data);
                })
                .catch(error => console.log(error));
        },
        requestIPInfo({ commit }) {
            return axios
                .get(`${TEST_URL}/api/define-city`)
                .then(response => {
                    commit('setCity', { city: response.data.data });
                })
                .catch(error => console.log(error));
        },
        updateOnline({ state, dispatch }) {
            if (state.onlineCourseData === null) {
                dispatch('requestOnlineCourse');
            }
        },
        updateCity({ state, dispatch }) {
            if (!state.cityId) {
                dispatch('requestIPInfo');
            }
        }
    }
})

export default store;