<template lang="pug">
.courses
	.group.limit(v-for='(group, index) in groups')
		.group-title {{group.name}}
		.tiles
			a.tile(
				href='#'
				v-for='(course, index) in group.elements'
				:class='{checked: selectedCourse === course, disabled: course.is_disabled}'
				@click.prevent='selectCourse(course); emitClick()'
			)
				.image(:style="{ backgroundImage: `url(' ${publicPath}${course.image} ')`}")
					.caption {{course.name}}
				.description
					.desc-title {{course.name}}
					.desc-text {{course.description}}
			.tile.fake
			.tile.fake
</template>

<script>
export default {
	name: 'Courses',
	model: {
		event: 'change'
	},
	props: {
		value: {
			type: Number,
			default: 0
		},
		courses: {
			type: Array,
			default: ()=>[]
		},
	},
	data () {
		return {
			selectedCourse: null,
			publicPath: ''
		}
	},
	watch: {
		courses() {
			this.selectCourse(this.groups[0].elements[0]);
		},
	},
	computed: {
		groups () {
			let groups = {};

			this.courses.forEach(function(elem) {
				let groupName = '';
				if (elem.is_for_all) {
					groupName = 'Программы для всех'
				} else {
					groupName = 'Программы для выпускников'
				}
				if (!groups[groupName]) groups[groupName] = []
				groups[groupName].push(elem);
			});

			let results = [];
			Object.keys(groups).forEach((groupKey)=>{
				let obj = {
					name: groupKey,
					elements: groups[groupKey]
				};
				if (groups[groupKey][0].is_for_all) {
					results.unshift(obj)
				} else {
					results.push(obj)
				}
			});

			return results;
		},
	},
	created () {
		this.selectCourse(this.groups[0].elements[0]);
	},
	methods: {
		selectCourse(course) {
			this.$emit('change', course.id);
			this.selectedCourse = course;
		},
		emitClick() {
			this.$emit('click');
		},
	},
}
</script>

<style lang="postcss">
	.courses {
		.group {
			overflow: visible;
			margin-bottom: 50px;
			.group-title {
				font-size: 18px;
				font-style: italic;
			}
			@media (max-width: 500px) {
				.group-title {
					display: none;
				}
				margin-bottom: 0;
			}
		}
		.tiles {
			margin: * -15px;
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
		}
		.tile {
			position: relative;
			max-width: 300px;
			width: calc(100% /3 - 16px*2);
			border-radius: 5px;
			overflow: hidden;
			display: inline-block;
			min-height: 188px;
			margin: 16px;
			box-shadow: 0px 0px 0px 0 rgba(0, 0, 0, 0);
			transition: box-shadow .3s;
			text-decoration: none;
			@media (max-width: 768px) {
				width: calc(100% /2 - 16px*2);
			}
			@media (max-width: 500px) {
				width: calc(100% /1 - 16px*2) !important;
				height: auto;
				max-height: none;
				box-shadow: none !important;
			}
			&.fake {
				height: 0;
				min-height: 0;
				padding: 0;
				margin: 0 *;
			}
			&.disabled {
				pointer-events: none;
				box-shadow: none;
				.image {
					opacity: 0.4;
				}
				.description {
					pointer-events: none;
					background-color: rgba(220, 220, 220, .8);
				}
				.desc-title {
					color: rgba(0,0,0,.7);
				}
				.desc-text {
					color: rgba(0,0,0,.6);
				}
				.image:after {
					background: linear-gradient(to top, color(gray a(.67)), transparent);
				}
			}
			@media (min-width: 499px) {
				&.checked {
					box-shadow: 0px 10px 20px 0 rgba(0, 0, 0, 0.35);
				}
				&.checked,
				&.disabled {
					transition-duration: .2s;
					.image .caption {
						display: none;
					}
				}
			}
			.image {
				background-color: #e6e6e6;
				height: 100%;
				width: 100%;
				transition: background-position .1s, width .1s, box-shadow .2s;
				box-shadow: inset 0 0 0 0 var(--accent_color);
				background-position: 65% center;
				background-size: cover;
				background-repeat: no-repeat;
				position: absolute;
				top: 0;
				right: 0;
				border-radius: 5px;
				overflow: hidden;
				@media (max-width: 500px) {
					position: relative;
					background-color: transparent;
					height: calc(62vw);
					max-height: 188px;
				}
				&:after {
					content: "";
					display: block;
					position: absolute;
					bottom: -1px;
					left: -1px;
					right: -1px;
					margin: auto;
					z-index: 0;
					height: 75px;
					background: linear-gradient(to top, color(var(--accent_color) a(.67)), transparent);
				}
				.caption {
					z-index: 1;
					position: absolute;
					bottom: 0;
					left: 0;
					right: 0;
					margin: auto;
					text-align: center;
					padding: 10px;
					font-size: 15px;
					font-family: var(--font-second);
					font-weight: bold;
					line-height: .9;
					color: white;
				}
			}
			@media (min-width: 500px) {
				&:hover {
					.image {
						box-shadow: inset 0 0 0 3px var(--accent_color);
					}
				}
			}
			.description {
				position: relative;
				z-index: 1;
				opacity: 0;
				transition: opacity .3s;
				pointer-events: none;
				min-height: 101%;
				width: 101%;
				margin: -1%;
				padding: 1%;
				background-color: color(var(--accent_color) a(.8));
				display: flex;
				color: white;
				flex-direction: column;
				justify-content: center;
				text-align: center;
				.desc-title {
					font-family: var(--font-second);
					font-size: 19px;
					font-weight: bold;
					line-height: .8;
					margin: 20px 10px;
					margin-bottom: 0;
					@media (max-width: 500px) {
						line-height: 1.33;
						margin: * 1px;
					}
				}
				.desc-text {
					font-size: 13px;
					line-height: 1.1;
					margin: 10px;
					flex-grow: 1;
					display: flex;
					align-items: center;
					overflow: hidden;
					@media (max-width: 500px) {
						line-height: 1.8;
						margin: 10px 1px;
					}
				}
				@media (max-width: 500px) {
					position: static;
					pointer-events: auto;
					display: block;
					opacity: 1;
					color: black;
					text-align: left;
					min-height: 0;
					background-color: transparent !important;
				}
			}
			&.checked .description,
			&.disabled .description {
				transition-duration: .2s;
				opacity: 1;
			}
		}
	}
</style>
