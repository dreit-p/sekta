var moment = require('moment');
moment.locale('ru');

export function formatDateDayMonth(date) {
	let newDate = moment(date).format("DD MMMM")
	return newDate
}

export function formatDate(date) {
	let newDate = moment(date).format("L")
	return newDate
}
