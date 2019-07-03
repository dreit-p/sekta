<template lang="pug">
div.main-layout
	app-header
	app-modal
	slot
	app-footer
</template>

<script>
export default {
	name: 'DefaultLayout',
	components: {
		AppHeader: () => import('@/components/header.vue'),
		AppFooter: () => import('@/components/footer.vue'),
		AppModal: () => import('@/components/modal.vue'),
	},
}
</script>

<style lang="postcss">
	.main-layout {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
</style>
