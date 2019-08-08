<template lang="pug">
.practices
	.group.limit(v-for='currentGroup in groupedVisits')
		.group-title {{ {practice: 'Групповые занятия', ticket: 'Абонементы для выпусников'}[currentGroup.type] }}
		.tiles
			a.tile(
				href='#'
				v-for='visit in currentGroup.visits'
				:class='{checked: selectedVisit == visit}'
				@click.prevent='selectVisit(visit); clickHandler()'
			)
				.description
					.desc-title {{visit.name}}
					.desc-caption {{visit.description}}
			.tile.fake
			.tile.fake
</template>

<script>
export default {
	name: "Practices",
	model: {
		event: "change"
	},
	props: {
		visits: {
			type: Array,
			default: () => []
		}
	},
	watch: {
		visits() {
			this.selectFirstVisit();
		}
	},
	mounted() {
		this.selectFirstVisit();
	},
	computed: {
		groupedVisits() {
			let groups = [];

			this.visits.forEach(function(practice) {
				let type = practice.is_ticket ? "ticket" : "practice";

				let currentType = groups.find(t => t.type === type);
				if (!currentType) {
					currentType = {
						type: type,
						visits: []
					};
					groups.push(currentType);
				}
				currentType.visits.push(practice);
			});

			return groups;
		}
	},
	methods: {
		selectVisit(visit) {
			this.$emit("change", visit);
			this.selectedVisit = visit;
		},
		selectFirstVisit() {
			this.selectVisit(this.groupedVisits[0].visits[0]);
		},
		clickHandler() {
			this.$emit("click");
		}
	},
	data() {
		return {
			selectedVisit: null
		};
	}
};
</script>

<style lang="postcss">
.practices {
	.group {
		overflow: visible;
		margin-bottom: 40px;
		@media (max-width: 500px) {
			margin-bottom: 10px;
		}
		.group-title {
			font-size: 18px;
			margin-bottom: 5px;
			font-style: italic;
		}
	}
	.tiles {
		margin: * -7px;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}
	.tile {
		background-color: #e6e6e6;
		position: relative;
		max-width: 320px;
		width: calc(100% / 3 - 7px * 2);
		border-radius: 1px;
		overflow: hidden;
		display: inline-block;
		margin: 7px;
		box-shadow: 0px 0px 0px 0 rgba(0, 0, 0, 0);
		transition: box-shadow 0.3s;
		text-decoration: none;
		transition: background-color 0.2s, box-shadow 0.2s;
		box-shadow: inset 0 0 0 0 var(--accent_color);
		&:hover {
			box-shadow: inset 0 0 0 3px var(--accent_color);
		}
		&.checked {
			background-color: var(--accent_color);
			color: white;
		}
		@media (max-width: 768px) {
			width: calc(100% / 2 - 7px * 2);
		}
		@media (max-width: 500px) {
			width: calc(100% / 2 - 5px * 2) !important;
			margin: 5px;
		}
		&.fake {
			height: 0;
			min-height: 0;
			padding: 0;
			margin: 0 *;
		}
		.description {
			padding: 25px;
			.desc-title {
				font-size: 16px;
				letter-spacing: 0.0125rem;
			}
			.desc-caption {
				font-size: 16px;
				font-weight: bold;
			}
			@media (max-width: 500px) {
				padding: 20px;
				.desc-title {
					font-size: 13px;
				}
				.desc-caption {
					font-size: 13px;
					letter-spacing: 0.00625rem;
					font-weight: bold;
				}
			}
		}
	}
}
</style>
