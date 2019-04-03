<template lang="pug">
.gym-map
	.selectors
		a(href='#', @click.prevent='choseMap = !choseMap')
			span(v-if='!this.choseMap') Посмотреть на карте
			span(v-if='this.choseMap') Показать список
	.wrapper.limit
		.tiles(:class='{hidden: choseMap}')
			a.tile(
				href='#'
				v-for='(gym, index) in addresses'
				:class='{checked: gym.states.checked}'
				@click.prevent='gym.states.checked = !gym.states.checked;'
			)
				p.bold {{gym.firstLine}}
				p {{gym.secondLine}}
		.map(:class='{hidden: !isShowingMap}')
			.preloader
				webp-img(src='map-preloader.jpg')
			yandex-map(
				v-if='isShowingMap || mapCreated'
				:coords='defaultPosition'
				zoom='13'
				:clusterOptions='clusterOptions'
				:controls='["rulerControl"]'
				:placemarks='placemarks'
				style='width: 100%; height: 100%;'
				map-link='https://api-maps.yandex.ru/2.1/?apikey=32d7c971-fea9-41f9-ba2c-5c2aaade6810&lang=ru_RU'
				@map-was-initialized='initHandler'
			)

</template>

<script>
	import { yandexMap, ymapMarker } from 'vue-yandex-maps'
	export default {
		name: 'gym-map',
		components: {
			yandexMap, ymapMarker,
			WebpImg: () => import('@/components/webp-img.vue'),
		},
		computed: {
			isShowingMap () {
				return this.windowWidth >= 700 && this.mounted || this.choseMap
			},
			placemarks () {
				var marks = [];
				for (let i = 0; i < this.addresses.length; i++) {
					let address = this.addresses[i];
					var theOne = {
						coords: address.coords,
						properties: {
							firstLine: address.firstLine,
							secondLine: address.secondLine,
							hintContent: address.secondLine,
						},
						callbacks: {
							click: () => {
								address.states.checked = !address.states.checked;
							}
						},
						clusterName: 'gyms',
						options: {
							fillColor: this.marksColor(address),
							iconColor: this.marksColor(address),
						},
						markerType: 'placemark',
						icon: {layout: 'islands#darkBlueCircleDotIcon',iconContent: i},
						markerId: i
					}
					marks.push(theOne);
				}
				return marks;
			},
		},
		methods: {
			marksColor (address) {
				return address.states.checked ? '#0ab6a1' : '#000'
			},
			initHandler(map) {
				this.map = map;
				window.map = map;
				this.mapCreated = true;
				this.setCenterPosition(map);

				window.addEventListener('resize', ()=>{
					this.$nextTick(this.setCenterPosition(map));
				});
			},
			setCenterPosition (map) {
				let offsetLeft = this.windowWidth < 700 ? 10 : this.$el.querySelector('.tiles').offsetWidth + 10;
				map.margin.setDefaultMargin([0, 0, 0, offsetLeft]);
				map.setBounds(map.geoObjects.getBounds(), {
					zoomMargin: [10, 10, 10, offsetLeft]
				});
				this.defaultPosition = map.getCenter();
			}
		},
		created () {
		},
		watch: {
			isShowingMap () {
				if (!this.isShowingMap) {
					this.map.destroy();
					this.mapCreated = false;
				}
			}
		},
		mounted () {
			this.mounted = true;
			window.addEventListener('resize', ()=>{
				this.$nextTick(function () {
					this.windowWidth = window.innerWidth
				});
			});
		},
		data () {
			return {
				map: {},
				mapCreated: false,
				mounted: false,
				choseMap: false,
				clusterOptions: {
					gyms: {
						useMapMargin: true,
						zoomMargin: [40, 20, 10, 20],
						gridSize: 16,
						preset: 'islands#blackClusterIcons'
					},
				},
				defaultPosition: [55.746726, 37.5911983],
				windowWidth: window.innerWidth,
				addresses: [
					{
						firstLine: 'м. Кропоткинская',
						secondLine: 'Малый Власьевский переулок дом 12',
						video: 'https://www.youtube.com/embed/1L6AaH3rFlQ',
						coords: [55.746709, 37.593381],
						states: {
							checked: false
						}
					},{
						firstLine: 'м. Курская',
						secondLine: 'Нижний Cусальный переулок 5/4',
						video: 'https://www.youtube.com/embed/9lX1OAsN868',
						coords: [55.760201, 37.663889],
						states: {
							checked: false
						}
					},{
						firstLine: 'м. Сокол',
						secondLine: 'Ул. Балтийская 9',
						video: 'https://www.youtube.com/embed/b1BKJF2V5NE',
						coords: [55.809176, 37.512955],
						states: {
							checked: false
						}
					},{
						firstLine: 'м. Бауманская',
						secondLine: '(Старокирочный переулок,2 )',
						video: 'https://www.youtube.com/embed/Qb_QlMs5TfU',
						coords: [55.768522, 37.680490],
						states: {
							checked: false
						}
					},
				],
			}
		}
	}
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
				opacity: .8;
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
		.map {
			position: absolute;
			top: 0;
			bottom: 0;
			margin: auto;
			width: calc(100% - 15px*2);
			overflow: hidden;
			transform: translateX(0);
			opacity: 1;
			transition: opacity .3s;
			&.hidden {
				opacity: .01;
				user-select: none;
				pointer-events: none;
			}
		}
		.tiles {
			position: relative;
			z-index: 1;
			min-height: 400px;
			display: inline-flex;
			flex-direction: column;
			align-items: stretch;
			text-align: left;
			@media (max-width: 700px) {
				display: inline-flex;
				margin: auto;
				opacity: 1;
				transition: opacity .3s;
				&.hidden {
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
			transition: box-shadow .3s, background-color .3s, color .3s;
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
					transition-duration: .1s, .3s, .3s;
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
	}
</style>
