<template lang="pug">
.time-selector
	.limit
		p.description Это небольшое описание. Например, текст про то, что есть несколько групп на выбор и для каждого свое время, а в субботу время общее для всех программ. А если это абонемент на 6 занятий, то на выбор любое время до 18:00 или после 20:00.

		.grid
			.day ПН
			.day ВТ
			.day СР
			.day ЧТ
			.day ПТ
			.day СБ
			.tile(
				v-for='(tile, index) in schedule'
				:class='{odd: tile.column % 2}'
				:style='{gridRow: tile.rowspan > 0 ? `${+tile.row+1} / ${+tile.row+1 + +tile.rowspan}` : auto, gridColumn: tile.column }'
			) {{tile.text}}

</template>

<script>
	export default {
		name: 'time-selector',
		model: {
			event: 'change'
		},
		props: {
			value: {
				type: Number,
				default: 0
			},
			schedule: {
				type: Array,
				default: ()=>[]
			},
		},
		created () {
			this.selectPlan(this.value);
		},
		computed: {
			table () {
				let tableData = [];
				this.schedule.forEach(function(elem) {
					if (!tableData[+elem.row-1]) tableData[+elem.row-1] = []
					tableData[+elem.row-1].push(elem);
				});
				return tableData;
			}
		},
		methods: {
			selectPlan(id) {
				this.$emit('change', parseInt(id));
				this.selectedID = id;
			},
		},
		data () {
			return {
				selectedID: null,
			}
		}
	}
</script>

<style lang="postcss">
.time-selector {
	.description {
		margin: 5px *;
		font-size: 15px;
		line-height: 1.47;
		letter-spacing: 0.0125rem;
	}
	table {
		width: 100%;
		table-layout: fixed;
		.cell {
			padding: 5px;
		}
		.tile {
			padding: 28px 10px 30px;
			background-color: #d1d1d1;
			text-align: center;
			font-size: 30px;
			font-family: var(--font-second);
			letter-spacing: 0.01875rem;
		}
	}
	.grid {
		display: grid;
		grid-template-columns: repeat(6, 1fr [col-start]);
		grid-gap: 10px;
		margin: 10px *;
		.day,
		.tile {
			padding: 28px 10px 30px;
			background-color: #e6e6e6;
			text-align: center;
			font-size: 30px;
			font-family: var(--font-second);
			letter-spacing: 0.01875rem;
			border-radius: 5px;
			align-items: center;
			display: grid;
		}
		.day {
			padding: 15px 10px;
			background-color: transparent;
		}
		.tile {
			transition: box-shadow .3s, background-color .3s, color .3s;
			cursor: pointer;
			user-select: none;
			&.spanned {
				grid-row-end: end;
			}
			&:hover,
			&.hover {
				transition-duration: .1s;
				box-shadow: inset 0 0 0 2px var(--accent_color);
			}
			&.odd {
				background-color: #d1d1d1;
			}
			&.checked {
				background-color: var(--accent_color);
				color: white;
			}
		}
	}
}
</style>
