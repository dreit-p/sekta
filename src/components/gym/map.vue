<template lang="pug">
.gym-map
	.selectors
		a(href='#', @click.prevent='isChoseMap = !isChoseMap')
			span(v-if='!this.isChoseMap') Посмотреть на карте
			span(v-if='this.isChoseMap') Показать список
	.wrapper.limit
		.tiles(:class='{hidden: isChoseMap}')
			a.tile(
				href='#'
				v-for='gym in gyms'
				:class='{checked: selectedGym === gym}'
				@click.prevent='selectGym(gym); clickHandler()'
			)
				p.bold {{gym.name}}
				p(v-if='gym.address') {{gym.address}}
		.map(:class='{hidden: !isShowingMap}')
			.preloader
				webp-img(src='map-preloader.jpg')
			yandex-map(
				v-if='isShowingMap || mapCreated'
				:coords='defaultPosition'
				zoom='13'
				ymap-class='ymap'
				:clusterOptions='clusterOptions'
				:controls='["rulerControl"]'
				:placemarks='placemarks'
				style='width: 100%; height: 100%;'
				map-link='https://api-maps.yandex.ru/2.1/?apikey=32d7c971-fea9-41f9-ba2c-5c2aaade6810&lang=ru_RU'
				@map-was-initialized='initHandler'
			)
	.limit(v-if='selectedGym')
		.additional-info(v-if="selectedGym.description || selectedGym.video_url")
			.links
				span Не знаете как пройти в зал?&ensp;
				a(href='#', v-if='selectedGym.video_url', @click.prevent='showVideoModal = !showVideoModal') Посмотрите видео
				span(v-if='selectedGym.video_url && selectedGym.description')  или
				a(href='#', v-if='selectedGym.description', @click.prevent='showDescriptionText = !showDescriptionText') Прочитайте описание
			.description-text(v-if='showDescriptionText && selectedGym.description') {{selectedGym.description}}
	transition(v-if='selectedGym', name='fade')
		video-modal(v-if='selectedGym.video_url && showVideoModal', :iframe-link='selectedGym.video_url', @close='showVideoModal = false')
			p.bold {{selectedGym.name}}
			p selectedGym.secondLine


</template>

<script>
import { yandexMap, ymapMarker } from "vue-yandex-maps";
export default {
	name: "GymMap",
	components: {
		yandexMap,
		ymapMarker,
		WebpImg: () => import("@/components/webp-img.vue"),
		VideoModal: () => import("@/components/gym/video-modal.vue")
	},
	model: {
		event: "change"
	},
	props: {
		value: {
			type: Number,
			default: 0
		},
		gyms: {
			type: Array,
			default: () => []
		},
	},
	data() {
		return {
			map: {},
			mapCreated: false,
			mounted: false,
			isChoseMap: false,
			showVideoModal: false,
			showDescriptionText: false,
			selectedGym: null,
			clusterOptions: {
				gyms: {
					useMapMargin: true,
					zoomMargin: [40, 20, 10, 20],
					gridSize: 16,
					preset: "islands#blackClusterIcons"
				}
			},
			windowWidth: window.innerWidth,
			defaultPosition: [55.746726, 37.5911983]
		};
	},
	computed: {
		isShowingMap() {
			return (this.windowWidth >= 700 && this.mounted) || this.isChoseMap;
		},
		placemarks() {
			return this.gyms.map((gym, i) => {
				return {
					coords: [gym.geo_point_lat, gym.geo_point_lon],
					properties: {
						name: gym.name,
						secondLine: "gym.secondLine",
						hintContent: "gym.secondLine"
					},
					callbacks: {
						click: () => {
							this.selectGym(gym);
							this.clickHandler();
						}
					},
					clusterName: "gyms",
					options: {
						fillColor: this.marksColor(gym),
						iconColor: this.marksColor(gym)
					},
					markerType: "placemark",
					icon: { layout: "islands#darkBlueCircleDotIcon", iconContent: i },
					markerId: i
				};
			});
		}
	},
	watch: {
		isShowingMap() {
			if (!this.isShowingMap) {
				this.map.destroy();
				this.mapCreated = false;
			}
		},
		gyms() {
			this.selectGym(this.gyms[0]);
			if (this.map) {
				map.geoObjects.events.once('add', ()=>{
					this.setCenterPosition(this.map);
				})
			}
		},
	},
	created() {
		this.selectGym(this.gyms[0]);
	},
	mounted() {
		this.mounted = true;
		window.addEventListener("resize", () => {
			this.$nextTick(function() {
				this.windowWidth = window.innerWidth;
			});
		});
	},
	methods: {
		marksColor(gym) {
			return this.selectedGym === gym ? "#0ab6a1" : "#000";
		},
		selectGym(gym) {
			this.$emit("change", gym.id);
			this.selectedGym = gym;
		},
		initHandler(map) {
			this.map = map;
			window.map = map;
			this.mapCreated = true;
			this.setCenterPosition(map);

			window.addEventListener("resize", () => {
				this.$nextTick(this.setCenterPosition(map));
			});
		},
		setCenterPosition(map) {
			let offsetLeft =
				this.windowWidth < 700
					? 10
					: this.$el.querySelector(".tiles").offsetWidth + 10;
			map.margin.setDefaultMargin([0, 0, 0, offsetLeft]);
			if (this.gyms.length > 1) {
				map.setBounds(map.geoObjects.getBounds(), {
					zoomMargin: [10, 10, 10, offsetLeft],
				});
			} else {
				map.setBounds(map.geoObjects.getBounds(), {zoomMargin: 10});
				map.setCenter(map.getCenter(), 15, {useMapMargin: true})
			}
			this.defaultPosition = map.getCenter();
		},
		clickHandler() {
			this.$emit("click");
		}
	}
};
</script>

<style lang="postcss">
.gym-map {
	padding: 15px *;
	@media (max-width: 700px) {
		text-align: center;
	}
	.preloader {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		left: 0;
		right: 0;
		margin: auto;
		height: 100%;
		img {
			height: 100%;
			width: 100%;
			filter: blur(10px);
			opacity: 0.8;
		}
	}
	.selectors {
		position: relative;
		z-index: 1;
		font-size: 13px;
		color: var(--accent_color);
		font-weight: bold;
		font-style: italic;
		letter-spacing: 0.1px;
		margin: -15px var(--col-space) 15px;
		text-align: right;
		@media (min-width: 700px) {
			display: none;
		}
	}
	.video-link {
		color: black;
	}
	.map {
		position: absolute;
		top: 0;
		bottom: 0;
		margin: auto;
		width: calc(100% - 15px * 2);
		overflow: hidden;
		transform: translateX(0);
		opacity: 1;
		transition: opacity 0.3s;
		&.hidden {
			opacity: 0.01;
			user-select: none;
			pointer-events: none;
		}
		@media (max-width: 700px) {
			position: relative;
			&.hidden {
				position: absolute;
			}
		}
	}
	.ymap {
		width: 100%;
		min-height: 390px;
	}
	.tiles {
		position: relative;
		z-index: 1;
		margin: -1px;
		min-height: 390px;
		display: inline-flex;
		flex-direction: column;
		align-items: stretch;
		text-align: left;
		@media (max-width: 700px) {
			display: inline-flex;
			margin: auto;
			min-height: 0;
			opacity: 1;
			transition: opacity 0.3s;
			&.hidden {
				position: absolute;
				opacity: 0;
				visibility: hidden;
			}
		}
	}
	.tile {
		padding: 25px 30px;
		background-color: #e6e6e6;
		display: inline-block;
		margin: 2px * 3px;
		box-shadow: inset 0 0 0 0 var(--accent_color);
		transition: box-shadow 0.3s, background-color 0.3s, color 0.3s;
		cursor: pointer;
		text-decoration: none;
		&:first-child {
			margin-top: 0;
		}
		&:last-child {
			margin-bottom: 0;
		}
		&.checked {
			background-color: var(--accent_color);
			color: white;
		}
		@media (min-width: 500px) {
			&:hover {
				transition-duration: 0.1s, 0.3s, 0.3s;
				box-shadow: inset 0 0 0 3px var(--accent_color);
			}
		}
		@media (max-width: 425px) {
			padding: 25px 15px;
		}
		p {
			margin: 0;
			padding: 0;
			font-family: var(--font-second);
			letter-spacing: 0.2px;
			&.bold {
				font-size: 22px;
				font-weight: bold;
			}
		}
	}
	.additional-info {
		.links {
			margin: 12px auto;
			> * {
				font-size: 18px;
				font-style: italic;
				@media (max-width: 700px) {
					display: block;
				}
			}
			a {
				font-weight: bold;
				color: var(--accent_color);
			}
		}
		.description-text {
			font-size: 15px;
			margin: 10px *;
			line-height: 1.47;
			text-align: left;
		}
	}
	.map *[class*="map-bg"] {
		background: none;
	}
}
</style>
