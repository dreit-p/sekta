<template lang="pug">
.time-selector
	.limit
		.description
			p Чтобы записаться на курс #sekta в зале, в таблице ниже вам нужно выбрать группу — конкретные дни недели и время, в которые вы будете заниматься. Например: понедельник, среда и пятница в 18:00.
			p Чтобы выбрать конкретное расписание нажмите на удобные дни, вся группа загорится зеленым.
			p Если в ячейке несколько вариантов времени для одного дня - значит, в этот день вы можете выбирать, в какое время посещать тренировки.

		.grid(v-if='windowWidth > mobileWidth')
			.day(v-for='name in daysNames') {{name}}
			template(v-for='(row, rowIndex) in schedules')
				button.tile(
					v-for='(tile, tileIndex) in row.tiles'
					v-if='tile.rowspan !== 0'
					:disabled='tile.practiceIDs.length < 1'
					:class='{available: tile.practiceIDs.length > 0, selected: tile.practiceIDs.includes(selectedPracticeID), hovered: tile.practiceIDs.includes(hoveredPracticeID)}'
					:style='{gridRow: tile.rowspan > 1 ? `${rowIndex+2} / ${rowIndex+2 + tile.rowspan}` : "auto", gridColumn: tileIndex+1 }'
					@click='selectTile(tile.practiceIDs); hoverTile(tile.practiceIDs); clickHandler()'

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
						@click='selectTile((tile.practiceIDs.length <= 1) ? tile.practiceIDs : group.practices); clickHandler()'
					) {{tile.time}}

</template>

<script>

// Author: https://gomakethings.com/check-if-two-arrays-or-objects-are-equal-with-javascript/
function compareNestedArrs(value, other) {
	var type = Object.prototype.toString.call(value);
	if (type !== Object.prototype.toString.call(other)) return false;
	if (['[object Array]', '[object Object]'].indexOf(type) < 0) return false;

	var valueLen = type === '[object Array]' ? value.length : Object.keys(value).length;
	var otherLen = type === '[object Array]' ? other.length : Object.keys(other).length;
	if (valueLen !== otherLen) return false;

	var compare = function (item1, item2) {

		var itemType = Object.prototype.toString.call(item1);

		if (['[object Array]', '[object Object]'].indexOf(itemType) >= 0) {
			if (!compareNestedArrs(item1, item2)) return false;
		}

		else {

			if (itemType !== Object.prototype.toString.call(item2)) return false;

			if (itemType === '[object Function]') {
				if (item1.toString() !== item2.toString()) return false;
			} else {
				if (item1 !== item2) return false;
			}

		}
	};

	if (type === '[object Array]') {
		for (var i = 0; i < valueLen; i++) {
			if (compare(value[i], other[i]) === false) return false;
		}
	} else {
		for (var key in value) {
			if (value.hasOwnProperty(key)) {
				if (compare(value[key], other[key]) === false) return false;
			}
		}
	}

	return true;
};

export default {
	name: "Schedule",
	model: {
		event: "change"
	},
	props: {
		value: {
			type: Number,
			default: () => null
		},
		practices: {
			type: Array,
			default: () => []
		}
	},
	mounted() {
		this.selectFirstTile();
	},
	data() {
		return {
			selectedPracticeID: null,
			hoveredPracticeID: null,
			mobileWidth: 650,
			windowWidth: 0,
			daysNames: ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"]
		};
	},
	computed: {
		schedules() {
			let schedules = [];

			let findOrPushRow = time => {
				let row = schedules.find(s => s.time === time);
				if (!row) {
					row = {
						time: time,
						tiles: this.daysNames.map((weekDay, index) => ({
							practiceIDs: [],
							weekDay: index,
							title: time,
							rowspan: 1
						}))
					};

					let timeToInt = t => {
						let d = t.split(":");
						return +d[0] * 60 + +d[1];
					};

					let index = schedules.findIndex(
						s => timeToInt(s.time) > timeToInt(time)
					);
					if (index === -1) {
						schedules.push(row);
					} else {
						schedules.splice(index, 0, row);
					}
				}

				return row;
			};

			this.practices.forEach(practice => {
				practice.schedules.forEach(practiceSchedule => {
					let times = practiceSchedule.time.split(" ");

					// Add first time
					let row = findOrPushRow(times[0]);

					let tile = row.tiles.find(
						t => t.weekDay === +practiceSchedule.week_day - 1
					);
					tile.practiceIDs.push(+practice.id);
					tile.rowspan = times.length; // fixme
					tile.title = practiceSchedule.time;

					// Add othres times
					times.slice(1).forEach(time => {
						let row2 = findOrPushRow(time);

						let tile2 = row2.tiles.find(
							t => t.weekDay === +practiceSchedule.week_day - 1
						);
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
						if (
							!uniqTime.practiceIDs.find(
								id => id === +practice.id
							)
						) {
							uniqTime.practiceIDs.push(+practice.id);
						}
						if (
							!uniqTime.days.find(
								dayId => dayId === practiceSchedule.week_day
							)
						) {
							let index = uniqTime.days.findIndex(
								week_day => week_day > practiceSchedule.week_day
							);
							if (index === -1) {
								uniqTime.days.push(practiceSchedule.week_day);
							} else {
								uniqTime.days.splice(index, 0, practiceSchedule.week_day);
							}
						}
					} else {
						timeObj[practiceSchedule.time] = {
							practiceIDs: [+practice.id],
							days: [practiceSchedule.week_day]
						};
					}
				});
			});

			let rows = {};
			for (let time in timeObj) {
				if (timeObj.hasOwnProperty(time)) {
					timeObj[time].practiceIDs.forEach(id => {
						if (!rows.hasOwnProperty(id)) {
							rows[id] = {
								days: [],
								key: [],
								tiles: []
							};
						}

						let sameDayIdx = rows[id].tiles.findIndex(tile =>
							compareArrs(tile.days, timeObj[time].days)
						);
						if (sameDayIdx === -1) {
							let index = rows[id].tiles.findIndex(tile => {
								return tile.days[0] > timeObj[time].days[0];
							});

							let tileData = {
								time: time,
								days: timeObj[time].days,
								practiceIDs: timeObj[time].practiceIDs
							};

							if (index === -1) {
								rows[id].days.push(timeObj[time].days);
								rows[id].tiles.push(tileData);
							} else {
								rows[id].days.splice(
									index,
									0,
									timeObj[time].days
								);
								rows[id].tiles.splice(index, 0, tileData);
							}

							// rows[id].key = [
							// 	...rows[id].key,
							// 	...timeObj[time].days
							// ];
						} else {
							let timeToInt = t => {
								let d = t.split(":");
								return +d[0] * 60 + +d[1];
							};

							if (
								timeToInt(rows[id].tiles[sameDayIdx].time) <
								timeToInt(time)
							) {
								rows[id].tiles[sameDayIdx].time += ", " + time;
							} else {
								rows[id].tiles[sameDayIdx].time =
									time +
									", " +
									rows[id].tiles[sameDayIdx].time;
							}
						}
					});
				}
			}

			function addSorted(targetArr, element, comparingFn) {
				let index = targetArr.findIndex(dayTime =>
					comparingFn(dayTime)
				);
				if (index === -1) {
					targetArr.push(element);
				} else {
					targetArr.splice(index, 0, element);
				}
			}

			function compareArrs(arr1, arr2) {
				return (
					arr1.length === arr2.length &&
					arr1.sort().every((value, index) => {
						return value === arr2.sort()[index];
					})
				);
			}

			let getHumanisedDays = daysArr => {
				let keyName = "";
				let currentPairIndex = 0;

				for (
					var timeIdx = daysArr.length - 1;
					timeIdx > currentPairIndex;
					timeIdx--
				) {
					let consecutiveDays = [];
					let conDaysIdx = 0;
					daysArr.reduce((prev, current) => {
						if (prev + 1 === current) {
							consecutiveDays[conDaysIdx]
								? consecutiveDays[conDaysIdx].push(current)
								: (consecutiveDays[conDaysIdx] =
										currentPairIndex === 0
											? [prev, current]
											: [current]);
						} else {
							consecutiveDays[conDaysIdx] =
								currentPairIndex === 0
									? [prev, current]
									: [current];
							conDaysIdx++;
						}
						currentPairIndex++;
						return current;
					});
					for (var i = 0; i < consecutiveDays.length; i++) {
						if (i > 0) {
							keyName += ", ";
						}
						if (consecutiveDays[i].length > 2) {
							keyName =
								keyName +
								this.daysNames[-1 + consecutiveDays[i][0]] +
								"-" +
								this.daysNames[
									-1 +
										consecutiveDays[i][
											consecutiveDays[i].length - 1
										]
								] +
								(i + 1 < consecutiveDays.length ? ", " : "");
						} else {
							for (
								var j = 0;
								j < consecutiveDays[i].length;
								j++
							) {
								keyName =
									keyName +
									this.daysNames[-1 + consecutiveDays[i][j]] +
									(j + 1 < consecutiveDays[i].length
										? ", "
										: "");
							}
						}
					}
				}

				if (daysArr.length <= 1) {
					keyName = this.daysNames[daysArr[0] - 1];
				}
				return keyName;
			};


			for (let practiceId in rows) {
				if (rows.hasOwnProperty(+practiceId)) {
					let row = rows[+practiceId];
					if (
						!groups.find(group => compareNestedArrs(group.daysIDs, row.days))
					) {
						groups.push({
							days: row.days.map(daysRow =>
								getHumanisedDays(daysRow)
							),
							daysIDs: row.days,
							practices: [+practiceId],
							rows: [{ tiles: row.tiles }]
						});
					} else {
						let groupIdx = groups.findIndex(group =>
							compareNestedArrs(group.daysIDs, row.days)
						);

						let tiles = row.tiles.filter(tile => {
							return +tile.practiceIDs[0] === +practiceId;
						});

						groups[groupIdx].practices.push(+practiceId);
						groups[groupIdx].rows.push({ tiles: tiles });
					}
				}
			}

			return groups;
		}
	},
	watch: {
		selectedPracticeID() {
			this.$emit("change", this.selectedPracticeID);
		},
		practices() {
			this.selectFirstTile();
		}
	},
	created() {
		this.windowWidth = window.innerWidth;
		this.$nextTick(() => {
			window.addEventListener("resize", () => {
				this.windowWidth = window.innerWidth;
			});
		});
	},
	methods: {
		selectFirstTile() {
			let tile = this.schedules[0].tiles.find(
				tile => tile.practiceIDs.length > 0
			);
			this.selectTile(tile.practiceIDs);
		},
		selectTile(practiceIDs) {
			this.selectedPracticeID = this.getNextTile(practiceIDs);
		},
		hoverTile(practiceIDs) {
			this.hoveredPracticeID = this.getNextTile(practiceIDs);
		},
		leaveTile() {
			this.hoveredPracticeID = null;
		},
		getNextTile(practiceIDs) {
			let seletedIndex = practiceIDs.indexOf(this.selectedPracticeID);
			let nextIndex = (seletedIndex + 1) % practiceIDs.length;

			return +practiceIDs[nextIndex];
		},
		clickHandler() {
			this.$emit("click");
		}
	}
};
</script>

<style lang="postcss">
.time-selector {
	.limit {
		max-width: calc((var(--col-width) + var(--col-space)) * 4.3);
	.description {
		margin: 5px *;
		font-size: 15px;
		line-height: 1.47;
	}
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
			padding: 18px 10px 20px;
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
			transition: box-shadow 0.3s, background-color 0.3s, color 0.3s;
			cursor: pointer;
			user-select: none;
			opacity: 0.3;
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
				transition-duration: 0.1s;
				box-shadow: inset 0 0 0 3px var(--accent_color);
			}
			&.selected.hovered {
				box-shadow: inset 0 0 0 3px
					color(var(--accent_color) shade(10%));
				background-color: color(
					var(--accent_color) blend(#e6e6e6 30%)
				) !important;
			}
			&.selected {
				background-color: var(--accent_color) !important;
				color: white !important;
			}
		}
	}
}
</style>
