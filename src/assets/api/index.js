import axios from 'axios'

const TEST_URL = `http://api.sektaschool.ru.dev.immelman.ru`;

function setToken(token) {
	axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
}

export default {
	getResults() {
		return axios.get(TEST_URL + '/api/content/results')
	},
	getProduct(tag) {
		return axios.get(TEST_URL + `/api/products/${tag}`)
	},
	getFoxCities(text) {
		return axios.get(TEST_URL + `/api/delivery/fox-express/cities?text=${text}`)
	},
	getFoxPrice(to) {
		return axios.get(TEST_URL + `/api/delivery/fox-express/calc-delivery?to=${to}`)
	},
	reqDiscountedPrice(priceId, code) {
		return axios.get(TEST_URL + `/api/prices/${priceId}/calc-with-promocode/${code}`)
	},
	makeProguctOrder(data, token) {
		setToken(token)
		return axios.post(TEST_URL + `/api/personal/product-orders`, data)
	},
	makeProguctPayment(data, token) {
		setToken(token)
		return axios.post(TEST_URL + `/api/personal/product-orders/${data.order_id}/payments`, data)
	}
}
