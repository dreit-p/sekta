<template lang="pug">
.time-selector
	.limit
		p.description Это небольшое описание. Например, текст про то, что есть несколько групп на выбор и для каждого свое время, а в субботу время общее для всех программ. А если это абонемент на 6 занятий, то на выбор любое время до 18:00 или после 20:00.

		.grid
			.day(v-for='name in daysNames') {{name}}
			.tile(
				v-for='(tile, index) in schedule'
				:class='{odd: tile.column % 2, hovered: hoveredIDs.includes(+tile.id), available: chackAvailability(index)}'
				:style='{gridRow: tile.rowspan > 0 ? `${+tile.row+1} / ${+tile.row+1 + +tile.rowspan}` : "auto", gridColumn: tile.column }'
				@mouseenter='hoverTiles(index)'
				@mouseleave='hoveredIDs = []'
				@click='checkTile(tile)'
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
			bracketing: {
				type: Number,
				default: 1
			},
			certificateDays: {
				type: Array,
				default: ()=>[]
			},
		},
		created () {
			this.selectPlan(this.value);
		},
		computed: {
		},
		methods: {
			hoverTiles(index) {

				let tile = this.schedule[index];

				let availableRowDays = this.getAvailableRowDays(tile.available_days, +tile.row);

				let startOffset = this.idsInRow(+tile.row).indexOf(+tile.id) - availableRowDays.indexOf(+tile.id);

				if (availableRowDays.length >= this.bracketing && availableRowDays.includes(+tile.id)) {
					let StartPos = Math.min(  Math.max(0, tile.column-1 - startOffset), availableRowDays.length - this.bracketing );
					let FinishPos = Math.max(  Math.min(availableRowDays.length, tile.column-1 + this.bracketing - startOffset), 0 + this.bracketing  );

					this.hoveredIDs = availableRowDays.slice(
							StartPos,
							FinishPos
						)
				}

			},
			getAvailableRowDays (array, row) {
				let availableRowDays = [];

				let ids = this.idsInRow(+row);

				for (var i = 0; i < ids.length; i++) {
					if (array.includes(ids[i]) && this.certificateDays.includes(ids[i])) {
						availableRowDays.push(ids[i]);
					}
				}
				return availableRowDays;
			},
			chackAvailability (index) {

				let checkRow = (row)=>{

					let availableSiblings = [];

					let ids = this.idsInRow(row);

					for (let i = 0; i < ids.length; i++) {
						if (this.certificateDays.includes(ids[i])) {
							availableSiblings.push(ids[i]);
						}
					}

					return availableSiblings.length >= this.bracketing

				};

				return this.certificateDays.includes(+this.schedule[index].id) && checkRow(this.schedule[index].row)
			},
			tilesInRow(number) {
				if (number == undefined) return false

				let row = [];

				this.schedule.forEach(function(elem) {
					if (+elem.row == +number || +elem.row+ +elem.rowspan >= +number && +elem.row <= +number) {
						row[+elem.column-1] = elem;
					}
				});
				return row
			},
			idsInRow(number) {
				if (number == undefined) return false

				let IDs = [];

				this.schedule.forEach(function(elem) {
					if (+elem.row == +number || +elem.row+ +elem.rowspan >= +number && +elem.row <= +number) {
						IDs[+elem.column-1] = +elem.id;
					}
				});
				return IDs
			},
			checkTile (tile) {
				console.log(tile.id);
				console.log(this.hoveredIDs);
				console.log(this.hoveredIDs.includes(+tile.id));
			},
			selectPlan(id) {
				this.$emit('change', parseInt(id));
				this.selectedID = id;
			},
		},
		data () {
			return {
				hoveredIDs: [],
				selectedIDs: [],
				daysNames: ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'],
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
			opacity: .3;
			pointer-events: none;
			&.available {
				opacity: 1;
				pointer-events: auto;
			}
			&.spanned {
				grid-row-end: end;
			}
			&.hovered {
				transition-duration: .1s;
				box-shadow: inset 0 0 0 5px var(--accent_color);
			}
			&.available.odd {
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
