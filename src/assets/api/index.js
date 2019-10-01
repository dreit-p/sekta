import axios from 'axios'
import store from '../../store'

const URL = process.env.VUE_APP_BACKEND_URL;

const axiosWithAuth = () => {
	axios.defaults.headers.common = { 'Authorization': `Bearer ${store.getters.authToken}` }
	return axios;
}

export default {
	getResults() {
		return axios.get(URL + `/api/content/results`)
	},

	auth: {
		onlyLogin(email, password) {
			return axios.post(URL + `/api/auth/login`, { email, password })
		},
		logout() {
			return axiosWithAuth().post(URL + `/api/auth/logout`)
		},
		register(data) {
			return axios.post(URL + `/api/register`, data)
		}
	},

	personal: {
		getDetails() {
			return axiosWithAuth().get(URL + `/api/personal/details`)
		},
		updateDetails(data) {
			return axiosWithAuth().post(URL + `/api/personal/details`, data)
		},
		getStatistics(data) {
			return axios.get(URL + `/api/personal/education-statistics`, data)
		},

		//Email
		requestVerifyEmail() {
			return axiosWithAuth().post(URL + `/api/personal/request-verify-email`)
		},
		verifyEmail(token) {
			return axiosWithAuth().post(URL + `/api/personal/verify-email/${token}`)
		},

		//Password
		requestPasswordRecovery(email) {
			return axios.post(URL + `/api/password-recovery/request`, { email })
		},
		resetPassword(token, password, password_confirmation) {
			return axios.post(URL + `/api/password-recovery/reset`, { token, password, password_confirmation })
		},
	},

	online: {
		getCourses() {
			return axios.get(URL + `/api/online-courses`)
		},
		createOrder(data) {
			return axiosWithAuth().post(URL + `/api/personal/online-orders`, data)
		},
		createPayment(orderId, data) {
			return axiosWithAuth().post(URL + `/api/personal/online-orders/${orderId}/payments`, data)
		},
		getOrders() {
			return axiosWithAuth().get(URL + `/api/personal/online-orders`)
		},
		getLastOrder(courseId) {
			return axiosWithAuth().get(URL + `/api/personal/online-orders/last-for-course/${courseId}`)
		},
	},

	gym: {
		getCoursesByCity(cityId) {
			return axios.get(URL + `/api/cities/${cityId}/gym-courses`)
		},
		getGymsByCityAndCourse(cityId, courseId) {
			return axios.get(URL + `/api/cities/${cityId}/gym-courses/${courseId}/gyms`)
		},
		getVisitsWithPracticesByGymAndCourse(gymId, courseId) {
			return axios.get(URL + `/api/gyms/${gymId}/gym-courses/${courseId}/visits-with-practices`)
		},
		createOrder(data) {
			return axiosWithAuth().post(URL + `/api/personal/gym-orders`, data)
		},
		createPayment(orderId, data) {
			return axiosWithAuth().post(URL + `/api/personal/gym-orders/${orderId}/payments`, data)
		},
		getOrders() {
			return axiosWithAuth().get(URL + `/api/personal/gym-orders`)
		},
	},

	certs: {
		getCertificates() {
			return axios.get(URL + `/api/certificates`);
		},
		createOrder(data) {
			return axiosWithAuth().post(URL + `/api/personal/certificate-orders`, data)
		},
		createPayment(orderId, data) {
			return axiosWithAuth().post(URL + `/api/personal/certificate-orders/${orderId}/payments`, data)
		},
		getOrders() {
			return axiosWithAuth().get(URL + `/api/personal/certificate-orders`)
		},
	},

	product: {
		getProduct(tag) {
			return axios.get(URL + `/api/products?filter_by_tag=${tag}`)
		},
		createOrder(data) {
			return axiosWithAuth().post(URL + `/api/personal/product-orders`, data)
		},
		createPayment(orderId, data) {
			return axiosWithAuth().post(URL + `/api/personal/product-orders/${orderId}/payments`, data)
		},
		getOrders() {
			return axiosWithAuth().get(URL + `/api/personal/product-orders`)
		},
	},

	defineCity() {
		return axios.get(URL + `/api/define-city`)
	},

	getPriceWithPromocode(price_id, promocode) {
		return axios.get(URL + `/api/prices/${price_id}/calc-with-promocode/${promocode}`)
	},

	getFoxCities(text) {
		return axios.get(URL + `/api/delivery/fox-express/cities?text=${text}`)
	},
	getFoxPrice(to) {
		return axios.get(URL + `/api/delivery/fox-express/calc-delivery?to=${to}`)
	},
}
