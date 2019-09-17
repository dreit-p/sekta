<template lang="pug">
div.main-layout
	app-header
	app-modal
	slot
	app-footer
	cookie-notification
</template>

<script>
export default {
	name: 'DefaultLayout',
	metaInfo: {
		// if no subcomponents specify a metaInfo.title, this title will be used
		title: 'Default Layout',
		// all titles will be injected into this template
		titleTemplate: '%s'
	},
	components: {
		AppHeader: () => import('@/components/header.vue'),
		AppFooter: () => import('@/components/footer.vue'),
		AppModal: () => import('@/components/modal.vue'),
		CookieNotification: () => import('@/components/cookie.vue'),
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
