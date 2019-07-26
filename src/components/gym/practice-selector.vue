<template lang="pug">
.time-selector
	.limit
		p.description Это небольшое описание. Например, текст про то, что есть несколько групп на выбор и для каждого свое время, а в субботу время общее для всех программ. А если это абонемент на 6 занятий, то на выбор любое время до 18:00 или после 20:00.

		//.grid(v-if='windowWidth > mobileWidth')
			.day(v-for='name in daysNames') {{name}}
			button.tile(
				v-for='(tile, index) in schedules'
				:class='{hovered: hoveredIDs.includes(+tile.id), available: chackAvailability(index), selected: selectedIDs.includes(+tile.id)}'
				:disabled='!chackAvailability(index)'
				:style='{gridRow: tile.rowspan > 0 ? `${+tile.row+1} / ${+tile.row+1 + +tile.rowspan}` : "auto", gridColumn: tile.column }'
				@mouseenter='hoveredIDs = hoverableSiblings[+tile.id]'
				@focus='hoveredIDs = hoverableSiblings[+tile.id]'
				@mouseleave='hoveredIDs = []'
				@blur='hoveredIDs = []'
				@click='selectTilesById(+tile.id)'
			) {{tile.text}}
		//.mobile-grid(v-if='windowWidth <= mobileWidth')
			.empty-msg(v-if='minimizedGroups.length == 0') 
				b Нет доступного времени.
				p Выберите другое количество тренировок.
			.grid(
				v-for='(group) in minimizedGroups'
				:style='{gridTemplateColumns: `repeat(${group.width}, 1fr [col-start])`}'
			)
				.day(v-for='(dayTitle) in group.daysTitles') {{dayTitle}}
				template(v-for='(row, rowIndex) in group.rows')
					.tile.available(
						v-for='(tile, tileIndex) in row'
						:class='{selected: isContainsArray(selectedIDs, tile.siblingsIds)}'
						:style='{gridRow: tile.rowspan > 0 && group.rows.length >= tile.rowspan ? `${+tile.row+1} / ${+tile.row+1 + +tile.rowspan}` : "auto", gridColumn: tileIndex+1 }'
						@click='selectTiles(tile.siblingsIds)'
					) {{tile.text}}

</template>

<script>
export default {
	name: 'PracticeSelector',
	model: {
		event: 'change'
	},
	props: {
		value: {
			type: Number,
			default: ()=> -1
		},
		schedules: {
			type: Array,
			default: ()=>[]
		},
		practices: {
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
			daysNames: ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'],
		}
	},
	computed: {
		availableTimes () {
			let availableTimes = {};
			let availableWeeks = [];

			this.schedules.forEach((time)=>{
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
		minimizedGroups () {

			var prevDayArray = [];

			var allRows = {}

			for (let dayId in this.hoverableSiblings) {
				if (this.hoverableSiblings.hasOwnProperty(dayId)) {
					let daySiblings = this.hoverableSiblings[dayId].slice().sort((a,b)=>a-b);
					if (!this.isArrEquals(prevDayArray, daySiblings)) { // Define one row

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
					group.width = 0;

					// allRows[rowKey] contains rows array

					for (let rowIndex = 0; rowIndex < allRows[rowKey].length; rowIndex++) { // row content
						for (let tileTextKey in allRows[rowKey][rowIndex]) {
							if (allRows[rowKey][rowIndex].hasOwnProperty(tileTextKey)) {

								if (!group.rows[rowIndex]) {group.rows[rowIndex] = []}

								let tilesIds = allRows[rowKey][rowIndex][tileTextKey];

								let columnTitle = '';
								let rowspan = 0;
								let tileStartPosition = +this.availableTimes[ tilesIds[0] ].row;
								for (var timeIdIdx = 0; timeIdIdx < tilesIds.length; timeIdIdx++) {
									columnTitle = columnTitle.concat(
										this.daysNames[ this.availableTimes[ tilesIds[timeIdIdx] ].column -1 ],
										timeIdIdx === tilesIds.length-1 ? '' : ', '
									);

									rowspan = Math.max(rowspan, +this.availableTimes[ tilesIds[timeIdIdx] ].rowspan);

									tileStartPosition = Math.min(tileStartPosition, +this.availableTimes[ tilesIds[timeIdIdx] ].row)
								}
								if (!group.daysTitles.includes(columnTitle)) {group.daysTitles.push(columnTitle)}

								let siblingsIds;

								if (rowspan > 1) {
									siblingsIds = [];
									for (var tileRowIndex = 0; tileRowIndex < rowspan; tileRowIndex++) {
										let times = allRows[rowKey][tileRowIndex];

										for (let timeKey in times) {
											if (times.hasOwnProperty(timeKey)) {
												if (!siblingsIds[tileRowIndex]) {siblingsIds[tileRowIndex] = []}

												for (var siblingsIdxOfArr = 0; siblingsIdxOfArr < times[timeKey].length; siblingsIdxOfArr++) {
													siblingsIds[tileRowIndex].push(times[timeKey][siblingsIdxOfArr])
												}

											}
										}

									}
								} else {
									siblingsIds = [this.hoverableSiblings[ tilesIds[0] ]];
								}

								if (tileStartPosition >= rowIndex+1) {
									group.rows[rowIndex].push({
										text: tileTextKey,
										daysNameNums: tilesIds,
										row: rowIndex+1,
										rowspan: rowspan,
										siblingsIds: siblingsIds,
									});
								}

							}

						}
						let lastRow = group.rows[rowIndex]
						group.width = Math.max(group.width, lastRow.length);
					}
					results.push(group);

				}
			}

			return results;
		},
	},
	watch: {
		certificateTimes: function () {
			this.resetTableStates();
		},
		bracketing: function () {
			this.resetTableStates();
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

			return this.certificateTimes.includes(+this.schedules[index].id) && checkRow(this.schedules[index].row)
		},
		isArrEquals (arr1, arr2) {
			return arr1.length === arr2.length && arr1.slice().sort((a,b)=>a-b).every((val, i)=>{ return val === arr2.slice().sort((a,b)=>a-b)[i]});
		},
		isContainsArray (mainArr, desiredArr) {
			if (mainArr.length == 0 || desiredArr.length == 0) return false
			let copyMainArr = [...mainArr];
			let copyDesiredArr = [...desiredArr];

			for (var i = 0; i < copyDesiredArr.length; i++) {
				if (this.isArrEquals(copyDesiredArr[i], copyMainArr)) {
					return true;
				}
			}
			return false;

		},
		tilesInRow(number) {
			if (number == undefined) return false

			let row = [];

			this.schedules.forEach(function(elem) {
				if (+elem.row == +number || +elem.row+ +elem.rowspan >= +number && +elem.row <= +number) {
					row[+elem.column-1] = elem;
				}
			});
			return row
		},
		idsInRow(number) {
			if (number == undefined) return false

			let IDs = [];

			this.schedules.forEach(function(elem) {
				if (+elem.row == +number || +elem.row+ +elem.rowspan >= +number && +elem.row <= +number) {
					IDs[+elem.column-1] = +elem.id;
				}
			});
			return IDs
		},
		selectTilesById(id) {
			this.$emit('change', this.hoveredIDs);
			if (this.hoveredIDs.length == 0) {
				this.hoveredIDs = this.hoverableSiblings[id];
			}
			this.selectedIDs = this.hoveredIDs;
		},
		selectTiles(idsArrs) {
			const setState = data => {
				this.$emit('change', data);
				this.hoveredIDs = data;
				this.selectedIDs = data;
			}

			if (idsArrs.length > 1 && this.selectedIDs.length > 0) {
				for (var i = 0; i < idsArrs.length; i++) {
					if (this.isArrEquals(idsArrs[i], this.selectedIDs)) {
						return setState( i < idsArrs.length-1 ? idsArrs[i+1] : idsArrs[0] );
					}
				}
			}
			return setState(idsArrs[0]);
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
	.empty-msg {
		margin: 30px 0;
		text-align: center;
		b {
			font-size: 30px;
			font-weight: bold;
		}
		font-size: 16px;
	}
	.mobile-grid {
		max-width: 420px;
		margin: auto;
	}
	.grid {
		display: grid;
		grid-template-columns: repeat(6, 1fr [col-start]);
		grid-gap: 10px;
		margin: 10px *;
		@media (max-width: 650px) {
			grid-gap: 15px;
		}
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
			margin-top: 10px;
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
			&.selected.hovered {
				box-shadow: inset 0 0 0 3px color(var(--accent_color) shade(10%));
				background-color: color(var(--accent_color) blend(#e6e6e6 30%)) !important;
			}
			&.selected {
				background-color: var(--accent_color) !important;
				color: white !important;
			}
		}
	}
}
</style>
