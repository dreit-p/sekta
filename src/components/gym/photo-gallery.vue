<template lang="pug">
section.photo-gallery
	.limit
		.photos
			.tile(
				v-for='(photo, index) in photos'
				:style='{width: photo.width*photosHeight/photo.height + "px", flexGrow: photo.width*photosHeight/photo.height}'
			)
				.padding(
					:style='{paddingBottom: photo.height/photo.width*100 + "%"}'
				)
				webp-img(:src='photo.file' alt='')
</template>

<script>
export default {
	name: 'PhotoGallery',
	props: {
		photos: {
			type: Array,
			default: ()=>[]
		},
	},
	components: {
		WebpImg: () => import('@/components/webp-img.vue'),
	},
	created () {
	},
	computed: {
	},
	methods: {
	},
	data () {
		return {
			photosHeight: 200,
		}
	}
}
</script>

<style lang="postcss">
.photo-gallery {
	.photos {
		display: flex;
		margin: -6px -11px;
		.tile {
			margin: 11px;
			position: relative;
		}
		.padding {
			display: none;
		}
		picture {
			width: 100%;
		}
	}
	@media (min-width: 425px) {
		.photos {
			flex-wrap: wrap;
			&:after {
				content: '';
				flex-grow: 99999999;
			}
			.tile {
				background-color: gray;
			}
			.padding {
				display: block;
			}
			picture {
				position: absolute;
				top: 0;
				width: 100%;
				vertical-align: bottom;
			}
		}
	}
	@media (max-width: 425px) {
		.limit {
			padding: 0;
		}
		.photos {
			overflow-x: auto;
			scroll-snap-type: mandatory;
			scroll-snap-points-x: repeat(100%);
			scroll-snap-type: x mandatory;
			margin: 0;
			.padding {
				display: none;
			}
			.tile {
				margin: 11px 0;
				padding: 0 11px;
				background-color: transparent;
				height: 200px;
				max-width: calc(100vw - var(--col-space)*3);
				overflow: hidden;
				flex: 0 0 100% !important;
				scroll-snap-align: center;
				&:first-child {
					padding-left: var(--col-space);
				}
				&:last-child {
					padding-right: var(--col-space);
				}
				picture {
					background-color: gray;
					height: auto;
					width: auto;
					img {
						height: 100%;
						width: 100%;
						object-fit: cover;
					}
				}
			}
		}
	}
}
</style>
