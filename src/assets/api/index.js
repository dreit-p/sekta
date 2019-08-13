import axios from 'axios'

const URL = `http://api.sektaschool.ru.dev.immelman.ru`;

function setToken(token) {
	axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
}

export default {
	getResults() {
		return axios.get(URL + '/api/content/results')
	},
	//Product
	getProducts(token) {
		setToken(token)
		return axios.get(URL + `/api/personal/product-orders`)
	},
	getProduct(tag) {
		return axios.get(URL + `/api/products?filter_by_tag=${tag}`)
	},
	getFoxCities(text) {
		return axios.get(URL + `/api/delivery/fox-express/cities?text=${text}`)
	},
	getFoxPrice(to) {
		return axios.get(URL + `/api/delivery/fox-express/calc-delivery?to=${to}`)
	},
	reqDiscountedPrice(priceId, code) {
		return axios.get(URL + `/api/prices/${priceId}/calc-with-promocode/${code}`)
	},
	makeProguctOrder(data, token) {
		setToken(token)
		return axios.post(URL + `/api/personal/product-orders`, data)
	},
	makeProguctPayment(data, token) {
		setToken(token)
		return axios.post(URL + `/api/personal/product-orders/${data.order_id}/payments`, data)
	},
	//Orders
	getOnlineOrders(token) {
		setToken(token)
		return axios.get(URL + `/api/personal/online-orders`)
	},
	getGymOrders(token) {
		setToken(token)
		return axios.get(URL + `/api/personal/gym-orders`)
	},
	//Certificate
	getCertificates(token) {
		setToken(token)
		return axios.get(URL + `/api/personal/certificate-orders`)
	},
	//Email
	requestVerifyEmail() {
		return axios.post(URL + '/api/personal/request-verify-email')
	},
	verifyEmail(token) {
		return axios.post(URL + `/api/personal/verify-email/${token}`)
	},
}
