<template lang="pug">
    .result-card(@click="clickHandler")
        .result-card__content
            img.result-card__img(:src="result.image")
            .result-card__overlay
                .result-card__title {{result.name}}
</template>

<script>
export default {
	name: 'ResultCard',
	props: {
		result: Object,
	},
	methods: {
		clickHandler() {
			this.$emit('clickHandler', this.result)
		}
	}
}
</script>

<style lang="postcss" scoped>
.result-card {
    padding: 2.5px;
    width: 20%;
    cursor: pointer;
    &:hover {
        .result-card__overlay {
            opacity: 1;
        }
    }

    &__content {
        position: relative;
        height: 192px;
        border-radius: 3px;
        overflow: hidden;
    }

    &__img {
        max-height: 192px;
    }

    &__overlay {
        position: absolute;
        width: 100%;
        height: 100%;
        padding: 12px 15px;
        background: #0ab69f;
        color: #fff;
        top: 0;
        left: 0;
        opacity: 0;
        transition: all .3s;
    }
    &__title {
        margin-bottom: 10px;
        font-size: 22px;
        font-family: 'Uni Sans', 'Tahoma' ,'Verdana', serif;
        font-weight: 700;
        line-height: 28px;
        letter-spacing: .25px;
    }
}
</style>


