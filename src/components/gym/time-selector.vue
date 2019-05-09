<template lang="pug">
.time-selector
	.limit
		p.description Это небольшое описание. Например, текст про то, что есть несколько групп на выбор и для каждого свое время, а в субботу время общее для всех программ. А если это абонемент на 6 занятий, то на выбор любое время до 18:00 или после 20:00.

		.grid(v-if='windowWidth > mobileWidth')
			.day(v-for='name in daysNames') {{name}}
			button.tile(
				v-for='(tile, index) in schedule'
				:class='{hovered: hoveredIDs.includes(+tile.id), available: chackAvailability(index), checked: selectedIDs.includes(+tile.id)}'
				:disabled='!chackAvailability(index)'
				:style='{gridRow: tile.rowspan > 0 ? `${+tile.row+1} / ${+tile.row+1 + +tile.rowspan}` : "auto", gridColumn: tile.column }'
				@mouseenter='hoveredIDs = hoverableSiblings[+tile.id]'
				@focus='hoveredIDs = hoverableSiblings[+tile.id]'
				@mouseleave='hoveredIDs = []'
				@blut='hoveredIDs = []'
				@click='selectPlan(+tile.id)'
			) {{tile.text}}
		.mobile-grid
			.item(
				
			)
				.days
				.time

</template>

<script>
	export default {
		name: 'TimeSelector',
		model: {
			event: 'change'
		},
		props: {
			value: {
				type: Array,
				default: ()=>[]
			},
			schedule: {
				type: Array,
				default: ()=>[]
			},
			bracketing: {
				type: Number,
				default: 1
			},
			certificateTimes: {
				type: Array,
				default: ()=>[]
			},
		},
		data () {
			return {
				hoveredIDs: [],
				selectedIDs: [],
				mobileWidth: 650,
				windowWidth: 0,
				minimizedGroups: [],
				daysNames: ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'],
			}
		},
		computed: {
			availableTimes () {
				let availableTimes = {};
				let availableWeeks = [];

				this.schedule.forEach((time)=>{
						if (this.certificateTimes.includes(+time.id)) {
							if (availableWeeks[+time.row -1] == undefined) {availableWeeks.push([])}
							availableWeeks[+time.row -1].push({[time.id]: time});
						}
				});
				availableWeeks.forEach((week)=>{
					if (week.length >= this.bracketing) {
						week.forEach((time) =>{
							Object.assign(availableTimes, time);
						});
					}
				});
				return availableTimes;
			},
			hoverableSiblings () {
				let timesConnections = {};
				for (let id in this.availableTimes) {
					if (this.availableTimes.hasOwnProperty(id)) {
						timesConnections[id] = this.getHoveredTiles(id);
					}
				}
				return timesConnections;
			},
		},
		watch: {
			certificateTimes: function () {
				this.resetTableStates();
			},
			bracketing: function () {
				this.resetTableStates();
			},
			windowWidth(newWidth) {
				if (newWidth <= this.mobileWidth && this.minimizedGroups.length == 0) {
					this.minimizedGroups = this.getMinimizedGroups();
				}
			},
		},
		created () {
			this.windowWidth = window.innerWidth
			this.$nextTick(() => {
				window.addEventListener('resize', () => {
					this.windowWidth = window.innerWidth
				});
			});
		},
		methods: {
			resetTableStates () {
				this.hoveredIDs = [];
				this.selectedIDs = [];
			},
			getHoveredTiles(id) {

				let tile = this.availableTimes[id];

				let availableRowTimes = this.getAvailableRowTimes(tile.available_days, +tile.row);

				let startOffset = this.idsInRow(+tile.row).indexOf(+tile.id) - availableRowTimes.indexOf(+tile.id);

				if (availableRowTimes.length >= this.bracketing && availableRowTimes.includes(+tile.id)) {
					let StartPos = Math.min(  Math.max(0, tile.column-1 - startOffset), availableRowTimes.length - this.bracketing );
					let FinishPos = Math.max(  Math.min(availableRowTimes.length, tile.column-1 + this.bracketing - startOffset), 0 + this.bracketing  );

					return availableRowTimes.slice(
							StartPos,
							FinishPos
						)
				}

			},
			getAvailableRowTimes(array, row) {
				let availableRowTimes = [];

				let ids = this.idsInRow(+row);

				for (var i = 0; i < ids.length; i++) {
					if (array.includes(ids[i]) && this.certificateTimes.includes(ids[i])) {
						availableRowTimes.push(ids[i]);
					}
				}
				return availableRowTimes;
			},
			chackAvailability (index) {

				let checkRow = (row)=>{

					let availableSiblings = [];

					let ids = this.idsInRow(row);

					for (let i = 0; i < ids.length; i++) {
						if (this.certificateTimes.includes(ids[i])) {
							availableSiblings.push(ids[i]);
						}
					}

					return availableSiblings.length >= this.bracketing

				};

				return this.certificateTimes.includes(+this.schedule[index].id) && checkRow(this.schedule[index].row)
			},
			getMinimizedGroups () {


				const isArrEquals = (arr1, arr2)=>{
					return arr1.length === arr2.length && arr1.sort((a,b)=>a-b).every((val, i)=>{ return val === arr2.sort((a,b)=>a-b)[i]});
				}

				var prevDayArray = [];

				var allRows = {}

				for (let dayId in this.hoverableSiblings) {
					if (this.hoverableSiblings.hasOwnProperty(dayId)) {
						let daySiblings = this.hoverableSiblings[dayId].sort((a,b)=>a-b);
						if (!isArrEquals(prevDayArray, daySiblings)) { // Define one row

							prevDayArray = daySiblings;

							/* Define row times */
							var columnNames = [];
							var allTimes = {};
							for (let i = 0; i < daySiblings.length; i++) {
								let time = this.availableTimes[daySiblings[i]]
								columnNames.push(+time.column -1);
								if (!allTimes[time.text]) {allTimes[time.text] = []}
								allTimes[time.text].push(+time.id)
							}

							columnNames = columnNames.sort((a,b)=>a-b);

							if (!allRows[columnNames]) { allRows[columnNames] = []}
							allRows[columnNames].push(allTimes);

						}
					}
				}

				var results = [];

				for (let rowKey in allRows) {
					if (allRows.hasOwnProperty(rowKey)) {
						let group = {};

						if (!group.rows) {group.rows = []}
						if (!group.daysTitles) {group.daysTitles = []}
						group.rows = [];

						// allRows[rowKey] contains rows array

						for (let rowIndex = 0; rowIndex < allRows[rowKey].length; rowIndex++) { // row content
							for (let tileTextKey in allRows[rowKey][rowIndex]) {
								if (allRows[rowKey][rowIndex].hasOwnProperty(tileTextKey)) {

									if (!group.rows[rowIndex]) {group.rows[rowIndex] = []}

									let tilesIds = allRows[rowKey][rowIndex][tileTextKey];

									let columnTitle = '';
									let tileStartPosition = +this.availableTimes[ tilesIds[0] ].row;
									for (var timeIdIdx = 0; timeIdIdx < tilesIds.length; timeIdIdx++) {
										columnTitle = columnTitle.concat(
											this.daysNames[ this.availableTimes[ tilesIds[timeIdIdx] ].column -1 ],
											timeIdIdx === tilesIds.length-1 ? '' : '/'
										);

										tileStartPosition = Math.min(tileStartPosition, +this.availableTimes[ tilesIds[timeIdIdx] ].row)
									}
									if (!group.daysTitles.includes(columnTitle)) {group.daysTitles.push(columnTitle)}

									if (tileStartPosition >= rowIndex+1) {
										group.rows[rowIndex].push({
											text: tileTextKey,
											daysNameNums: tilesIds,
											row: rowIndex+1,
											siblingsIds: this.hoverableSiblings[ tilesIds[0] ]
										});
									}

								}

							}
						}
						results.push(group);

					}
				}

				return results;

				// this.minimizedGroups = [
				// 	{ // group
				// 		daysTitles: ['пн/вт', 'сб'],
				// 		rows: [
				// 			[ // row
				// 				{
				// 					daysNameNums: [0, 1],
				// 					text: '8:30'
				// 				},
				// 				{
				// 					daysNameNums: [5],
				// 					text: '8:30 10:30'
				// 				},
				// 			],
				// 			[ // row
				// 				{
				// 					daysNameNums: [0, 1],
				// 					text: '8:30'
				// 				},
				// 				{
				// 					daysNameNums: [5],
				// 					text: '8:30 10:30'
				// 				},
				// 			],
				// 		],

				// 	},
				// ];
			},
			getDataById () {},
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
			selectPlan(id) {
				this.$emit('change', this.hoveredIDs);
				if (this.hoveredIDs.length == 0) {
					this.hoveredIDs = this.hoverableSiblings[id];
				}
				this.selectedIDs = this.hoveredIDs;
			},
		},
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
			border: none;
			&.available {
				opacity: 1;
				pointer-events: auto;
			}
			&.spanned {
				grid-row-end: end;
			}
			&.hovered {
				transition-duration: .1s;
				box-shadow: inset 0 0 0 3px var(--accent_color);
			}
			&.checked.hovered {
				box-shadow: inset 0 0 0 3px color(var(--accent_color) shade(10%));
				background-color: color(var(--accent_color) blend(#e6e6e6 30%)) !important;
			}
			&.checked {
				background-color: var(--accent_color) !important;
				color: white !important;
			}
		}
	}
}
</style>
