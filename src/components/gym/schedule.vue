<template lang="pug">
.time-selector
	.limit
		p.description Это небольшое описание. Например, текст про то, что есть несколько групп на выбор и для каждого свое время, а в субботу время общее для всех программ. А если это абонемент на 6 занятий, то на выбор любое время до 18:00 или после 20:00.

		.grid(v-if='windowWidth > mobileWidth')
			.day(v-for='name in daysNames') {{name}}
			template(v-for='(row, rowIndex) in schedules')
				button.tile(
					v-for='(tile, tileIndex) in row.tiles'
					v-if='tile.rowspan !== 0'
					:disabled='tile.practiceIDs.length < 1'
					:class='{available: tile.practiceIDs.length > 0, selected: tile.practiceIDs.includes(selectedPracticeID), hovered: tile.practiceIDs.includes(hoveredPracticeID)}'
					:style='{gridRow: tile.rowspan > 1 ? `${rowIndex+2} / ${rowIndex+2 + tile.rowspan}` : "auto", gridColumn: tileIndex+1 }'
					@click='selectTile(tile.practiceIDs); hoverTile(tile.practiceIDs);'

					@mouseenter='hoverTile(tile.practiceIDs)'
					@focus='hoverTile(tile.practiceIDs)'

					@mouseleave='leaveTile()'
					@blur='leaveTile()'

				) {{tile.title}}
		.mobile-grid(v-else)
			.empty-msg(v-if='mobileGroups.length == 0')
				b Нет доступного времени.
				p Выберите другое количество тренировок.
			.grid(
				v-for='(group) in mobileGroups'
				:style='{gridTemplateColumns: `repeat(${group.days.length}, 1fr [col-start])`}'
			)
				.day(v-for='(dayIdxs) in group.days') {{dayIdxs}}
				template(v-for='(row, rowIndex) in group.rows')
					.tile.available(
						v-for='(tile, tileIndex) in row.tiles'
						:class='{selected: ((tile.practiceIDs.length <= 1) ? tile.practiceIDs : group.practices).includes(selectedPracticeID) }'
						:style='{gridRow: tile.practiceIDs.length > 0 ? `${rowIndex+2} / ${rowIndex+2 + (tile.practiceIDs.length <= 1 ? 1 : group.practices.length) }` : "auto", gridColumn: tileIndex+1 }'
						@click='selectTile((tile.practiceIDs.length <= 1) ? tile.practiceIDs : group.practices)'
					) {{tile.time}}

</template>

<script>
export default {
	name: 'Schedule',
	model: {
		event: 'change'
	},
	props: {
		value: {
			type: Number,
			default: ()=> null
		},
		practices: {
			type: Array,
			default: () => []
		},
	},
	mounted () {
		this.selectFirstTile();
	},
	data () {
		return {
			selectedPracticeID: null,
			hoveredPracticeID: null,
			mobileWidth: 650,
			windowWidth: 0,
			daysNames: ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'],
		}
	},
	computed: {
		schedules() {
			let schedules = [];

			let findOrPushRow = (time) => {
				let row = schedules.find(s => s.time === time);
				if (! row) {
					row = {
						time: time,
						tiles: this.daysNames.map((weekDay, index) => ({practiceIDs: [], weekDay: index, title: time, rowspan: 1})),
					};

					let timeToInt = (t) => { let d = t.split(':'); return +d[0] * 60 + +d[1]; };

					let index = schedules.findIndex(s => timeToInt(s.time) > timeToInt(time));
					if (index === -1) {
						schedules.push(row);
					} else {
						schedules.splice(index, 0, row);
					}
				}

				return row;
			}

			this.practices.forEach(practice => {
				practice.schedules.forEach(practiceSchedule => {
					let times = practiceSchedule.time.split(' ');

					// Add first time
					let row = findOrPushRow(times[0]);

					let tile = row.tiles.find(t => t.weekDay === +practiceSchedule.week_day - 1);
					tile.practiceIDs.push(+practice.id);
					tile.rowspan = times.length; // fixme
					tile.title = practiceSchedule.time;

					// Add othres times
					times.slice(1).forEach(time => {
						let row2 = findOrPushRow(time);

						let tile2 = row2.tiles.find(t => t.weekDay === +practiceSchedule.week_day - 1);
						tile2.rowspan = 0;
						tile2.title = null;
					});

				});
			});

			return schedules;
		},
		mobileGroups() {
			let groups = [];

			let timeObj = {};
			this.practices.forEach(practice => {

				practice.schedules.forEach(practiceSchedule => {

					if (timeObj.hasOwnProperty(practiceSchedule.time)) {
						let uniqTime = timeObj[practiceSchedule.time];
						if (!uniqTime.practiceIDs.find(id => id === +practice.id)) {
							uniqTime.practiceIDs.push(+practice.id);
						}
						if (!uniqTime.days.find(dayId => dayId === practiceSchedule.week_day)) {
							uniqTime.days.push(practiceSchedule.week_day);
						}
					} else {
						timeObj[practiceSchedule.time] = {
							practiceIDs: [+practice.id],
							days: [practiceSchedule.week_day]
						}
					}
				});
			});

			let rows = {};
			for (let time in timeObj) {
				if (timeObj.hasOwnProperty(time)) {
					timeObj[time].practiceIDs.forEach((id)=>{
						if (!rows.hasOwnProperty(id)) {
							rows[id] = {
								days: [],
								key: [],
								tiles: [],
							}
						}

						let sameDayIdx = rows[id].tiles.findIndex(tile=>compareArrs(tile.days,timeObj[time].days));
						if (sameDayIdx === -1) {
							let index = rows[id].tiles.findIndex(tile => {
								return tile.days[0] > timeObj[time].days[0]
							});

							let tileData = {
									time: time,
									days: timeObj[time].days,
									practiceIDs: timeObj[time].practiceIDs,
								}

							if (index === -1) {
								rows[id].days.push(timeObj[time].days);
								rows[id].tiles.push(tileData);
							} else {
								rows[id].days.splice(index, 0, timeObj[time].days);
								rows[id].tiles.splice(index, 0, tileData);
							}

							rows[id].key = [...rows[id].key,...timeObj[time].days];
						} else {
							let timeToInt = (t) => { let d = t.split(':'); return +d[0] * 60 + +d[1]; };

							if (timeToInt(rows[id].tiles[sameDayIdx].time) < timeToInt(time)) {
								rows[id].tiles[sameDayIdx].time += ', ' + time;
							} else {
								rows[id].tiles[sameDayIdx].time = time + ', ' + rows[id].tiles[sameDayIdx].time;
							}
						}
					});
				}
			}


			function addSorted(targetArr, element, comparingFn) {
				let index = targetArr.findIndex(dayTime => comparingFn(dayTime));
				if (index === -1) {
					targetArr.push(element);
				} else {
					targetArr.splice(index, 0, element);
				}
			}

			function compareArrs(arr1, arr2) {
				return arr1.length === arr2.length && arr1.sort().every((value, index)=>{ return value === arr2.sort()[index]});
			}

			let getHumanisedDays = (daysArr)=>{
				let keyName = "";
				let currentIndex = 0;

				for (var timeIdx = daysArr.length - 1; timeIdx > currentIndex; timeIdx--) {
					let consecutiveDays = [];
					let conDaysIdx = 0;
					daysArr.reduce((prev, current)=>{
						if (prev+1 === current) {
							consecutiveDays[conDaysIdx]
								? consecutiveDays[conDaysIdx].push(current)
								: consecutiveDays[conDaysIdx] = currentIndex === 0 ? [prev, current] : [current]
							currentIndex++;
						} else {
							consecutiveDays[conDaysIdx] = currentIndex === 0 ? [prev, current] : [current]
							conDaysIdx++;
						}
						return current;
					});
					for (var i = 0; i < consecutiveDays.length; i++) {
						if (consecutiveDays[i].length > 2) {
							keyName = keyName + this.daysNames[-1+ consecutiveDays[i][0]] +"-"+ this.daysNames[-1+ consecutiveDays[i][consecutiveDays[i].length-1]] + (i+1 < consecutiveDays.length ? ", " : "");
						} else {
							for (var j = 0; j < consecutiveDays[i].length; j++) {
								keyName = keyName + this.daysNames[-1+ consecutiveDays[i][j]] + (j+1 < consecutiveDays[i].length ? ", " : "");
							}
						}
					}
				}

				if (daysArr.length <=1) {
					keyName = this.daysNames[daysArr[0]-1]
				}
				return keyName;
			}

			for (let practiceId in rows) {
				if (rows.hasOwnProperty(+practiceId)) {
					let row = rows[+practiceId];
					if (!groups.find(group => compareArrs(group.key, row.key))) {

						groups.push({
							days: row.days.map(daysRow => getHumanisedDays(daysRow)),
							key: row.key,
							practices: [+practiceId],
							rows: [{tiles: row.tiles}],
						});
					} else {
						let groupIdx = groups.findIndex(group => compareArrs(group.key, row.key));

						let tiles = row.tiles.filter((tile)=>{
							return +tile.practiceIDs[0] === +practiceId
						});

						groups[groupIdx].practices.push(+practiceId);
						groups[groupIdx].rows.push({tiles: tiles});
					}
				}
			}







			return groups;
		},
	},
	watch: {
		selectedPracticeID () {
			this.$emit('change', this.selectedPracticeID);
		},
		practices () {
			this.selectFirstTile();
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
		selectFirstTile() {
			let tile = this.schedules[0].tiles.find(tile => tile.practiceIDs.length > 0);
			this.selectTile(tile.practiceIDs);
		},
		selectTile(practiceIDs) {
			this.selectedPracticeID = this.getNextTile(practiceIDs);
		},
		hoverTile(practiceIDs) {
			this.hoveredPracticeID =  this.getNextTile(practiceIDs);
		},
		leaveTile() {
			this.hoveredPracticeID = null;
		},
		getNextTile(practiceIDs) {
			let seletedIndex = practiceIDs.indexOf(this.selectedPracticeID);
			let nextIndex = (seletedIndex + 1) % (practiceIDs.length);

			return +practiceIDs[nextIndex];
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
