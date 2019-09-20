import format from 'date-fns/format'
import { ru } from 'date-fns/locale'

const addLocale = (date, formatStr) => {
	return format(date, formatStr, {
		locale: ru
	})
}

export function formatDateDayMonth(date) {
	let newDate = addLocale(new Date(date), 'dd MMMM')
	return newDate
}

export function formatDate(date) {
	let newDate = addLocale(new Date(date), "dd/MM/y")
	return newDate
}

