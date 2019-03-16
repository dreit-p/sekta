<template lang="pug">
a.green-btn(@click="$emit('click', $event)")
	slot
</template>

<script>
	export default {
		name: 'green-btn'
	}
</script>

<style lang="postcss">
	.green-btn {
		font: 400 15px/1 var(--font-main);
		display: inline-block;
		padding: 12px 20px 13px;
		border: none;
		border-radius: 3px;
		color: white;
		text-align: center;
		max-width: 300px;
		margin: 25px 35px;
		background-color: var(--accent_color);
		transition: color .3s, background-color .3s;
		@media (max-width: 1024px) {
			margin: * auto;
			width: 100%;
		}
		&:not(:disabled) {
			cursor: pointer;
		}
		&:hover {
			background: #078675;
			transition-duration: .1s, .1s;
			color: white;
		}
	}
</style>
